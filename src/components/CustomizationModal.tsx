import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { FoodItem } from '../data/foodData';

interface CustomizationModalProps {
  item: FoodItem;
  onClose: () => void;
  onAddToCart: (customizations: any) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>(item.spiceLevel || '');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const calculatePrice = () => {
    let price = item.price;
    
    if (selectedSize) {
      const sizeUpcharge = selectedSize.match(/\+\$(\d+)/);
      if (sizeUpcharge) {
        price += parseFloat(sizeUpcharge[1]);
      }
    }
    
    selectedToppings.forEach(topping => {
      const toppingUpcharge = topping.match(/\+\$(\d+)/);
      if (toppingUpcharge) {
        price += parseFloat(toppingUpcharge[1]);
      }
    });
    
    return price * quantity;
  };

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleAddToCart = () => {
    const customizations = {
      selectedSize,
      selectedSpiceLevel,
      selectedToppings,
      quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      onAddToCart(customizations);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Customize Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {/* Item Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>

          {/* Size Selection */}
          {item.customizations?.sizes && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Choose Size</h4>
              <div className="space-y-2">
                {item.customizations.sizes.map(size => (
                  <label key={size} className="flex items-center">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="mr-3 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {item.customizations?.spiceLevels && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Spice Level</h4>
              <div className="space-y-2">
                {item.customizations.spiceLevels.map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="spiceLevel"
                      value={level}
                      checked={selectedSpiceLevel === level}
                      onChange={(e) => setSelectedSpiceLevel(e.target.value)}
                      className="mr-3 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {item.customizations?.extraToppings && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Extra Toppings</h4>
              <div className="space-y-2">
                {item.customizations.extraToppings.map(topping => (
                  <label key={topping} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(topping)}
                      onChange={() => handleToppingToggle(topping)}
                      className="mr-3 text-orange-500 focus:ring-orange-500 rounded"
                    />
                    <span className="text-gray-700">{topping}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">Quantity</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              >
                -
              </button>
              <span className="text-lg font-medium text-gray-800 min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add to Cart - ${calculatePrice().toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;