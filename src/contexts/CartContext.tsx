import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, FoodItem } from '../data/foodData';

interface CartState {
  items: CartItem[];
  total: number;
  tax: number;
  deliveryFee: number;
  finalTotal: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: FoodItem; customizations?: any } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const TAX_RATE = 0.08; // 8% tax
const DELIVERY_FEE = 4.99;

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];
  let subtotal: number;
  let tax: number;
  let finalTotal: number;

  switch (action.type) {
    case 'ADD_ITEM':
      const { item, customizations } = action.payload;
      let customPrice = item.price;
      
      // Calculate custom price based on selected options
      if (customizations?.selectedSize) {
        const sizeUpcharge = customizations.selectedSize.match(/\+\$(\d+)/);
        if (sizeUpcharge) {
          customPrice += parseFloat(sizeUpcharge[1]);
        }
      }
      
      if (customizations?.selectedToppings) {
        customizations.selectedToppings.forEach((topping: string) => {
          const toppingUpcharge = topping.match(/\+\$(\d+)/);
          if (toppingUpcharge) {
            customPrice += parseFloat(toppingUpcharge[1]);
          }
        });
      }

      const existingItemIndex = state.items.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.selectedSize === customizations?.selectedSize &&
        cartItem.selectedSpiceLevel === customizations?.selectedSpiceLevel &&
        JSON.stringify(cartItem.selectedToppings) === JSON.stringify(customizations?.selectedToppings)
      );

      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
      } else {
        const newCartItem: CartItem = {
          ...item,
          quantity: 1,
          selectedSize: customizations?.selectedSize,
          selectedSpiceLevel: customizations?.selectedSpiceLevel,
          selectedToppings: customizations?.selectedToppings,
          customPrice
        };
        newItems = [...state.items, newCartItem];
      }
      break;

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      break;

    case 'CLEAR_CART':
      newItems = [];
      break;

    default:
      return state;
  }

  subtotal = newItems.reduce((sum, item) => sum + (item.customPrice * item.quantity), 0);
  tax = subtotal * TAX_RATE;
  finalTotal = subtotal + tax + (newItems.length > 0 ? DELIVERY_FEE : 0);

  return {
    items: newItems,
    total: subtotal,
    tax,
    deliveryFee: newItems.length > 0 ? DELIVERY_FEE : 0,
    finalTotal
  };
};

const initialState: CartState = {
  items: [],
  total: 0,
  tax: 0,
  deliveryFee: 0,
  finalTotal: 0
};

interface CartContextType {
  state: CartState;
  addToCart: (item: FoodItem, customizations?: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: FoodItem, customizations?: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, customizations } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};