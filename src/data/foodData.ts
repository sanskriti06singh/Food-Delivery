export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  cuisine: string;
  rating: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  customizations?: {
    extraToppings?: string[];
    sizes?: string[];
    spiceLevels?: string[];
  };
  isVegetarian?: boolean;
  isPopular?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
  selectedSize?: string;
  selectedSpiceLevel?: string;
  selectedToppings?: string[];
  customPrice: number;
}

export const foodItems: FoodItem[] = [
  // Street Food
  {
    id: 'sf1',
    name: 'Classic Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, basil leaves, and olive oil on crispy crust',
    price: 14.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    category: 'Street Food',
    cuisine: 'Italian',
    rating: 4.5,
    isVegetarian: true,
    isPopular: true,
    customizations: {
      sizes: ['Small (+$0)', 'Medium (+$3)', 'Large (+$6)'],
      extraToppings: ['Extra Cheese (+$2)', 'Pepperoni (+$3)', 'Mushrooms (+$2)', 'Bell Peppers (+$2)']
    }
  },
  {
    id: 'sf2',
    name: 'Chicken Shawarma Wrap',
    description: 'Marinated chicken, garlic sauce, vegetables wrapped in fresh pita bread',
    price: 12.99,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    category: 'Street Food',
    cuisine: 'Middle Eastern',
    rating: 4.7,
    spiceLevel: 'Medium',
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
      extraToppings: ['Extra Sauce (+$1)', 'Pickles (+$1)', 'Extra Meat (+$4)']
    }
  },
  {
    id: 'sf3',
    name: 'Fish & Chips',
    description: 'Beer-battered cod with crispy fries and tartar sauce',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1397648/pexels-photo-1397648.jpeg',
    category: 'Street Food',
    cuisine: 'British',
    rating: 4.3,
    customizations: {
      extraToppings: ['Extra Tartar Sauce (+$1)', 'Mushy Peas (+$2)', 'Curry Sauce (+$2)']
    }
  },
  
  // Fast Food
  {
    id: 'ff1',
    name: 'Gourmet Cheeseburger',
    description: 'Premium beef patty, aged cheddar, lettuce, tomato, special sauce',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    category: 'Fast Food',
    cuisine: 'American',
    rating: 4.6,
    isPopular: true,
    customizations: {
      sizes: ['Regular (+$0)', 'Large (+$3)'],
      extraToppings: ['Bacon (+$3)', 'Extra Cheese (+$2)', 'Avocado (+$2)', 'Onion Rings (+$2)']
    }
  },
  {
    id: 'ff2',
    name: 'Buffalo Chicken Wings',
    description: '8 pieces of crispy wings tossed in spicy buffalo sauce',
    price: 13.99,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg',
    category: 'Fast Food',
    cuisine: 'American',
    rating: 4.4,
    spiceLevel: 'Hot',
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
      extraToppings: ['Ranch Dip (+$1)', 'Blue Cheese Dip (+$1)', 'Celery Sticks (+$1)']
    }
  },
  {
    id: 'ff3',
    name: 'Crispy Chicken Tacos',
    description: '3 soft shell tacos with crispy chicken, salsa, and fresh toppings',
    price: 11.99,
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg',
    category: 'Fast Food',
    cuisine: 'Mexican',
    rating: 4.5,
    spiceLevel: 'Medium',
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Hot'],
      extraToppings: ['Guacamole (+$2)', 'Sour Cream (+$1)', 'Extra Salsa (+$1)']
    }
  },

  // Fine Dining
  {
    id: 'fd1',
    name: 'Grilled Salmon Fillet',
    description: 'Atlantic salmon with herb butter, roasted vegetables, and quinoa',
    price: 24.99,
    image: 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg',
    category: 'Fine Dining',
    cuisine: 'Contemporary',
    rating: 4.8,
    isPopular: true,
    customizations: {
      extraToppings: ['Lemon Butter Sauce (+$3)', 'Roasted Asparagus (+$4)', 'Wild Rice (+$3)']
    }
  },
  {
    id: 'fd2',
    name: 'Beef Tenderloin Steak',
    description: 'Premium cut with truffle mashed potatoes and seasonal vegetables',
    price: 32.99,
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg',
    category: 'Fine Dining',
    cuisine: 'American',
    rating: 4.9,
    customizations: {
      extraToppings: ['Mushroom Sauce (+$4)', 'Grilled Shrimp (+$8)', 'Caesar Salad (+$5)']
    }
  },
  {
    id: 'fd3',
    name: 'Lobster Risotto',
    description: 'Creamy arborio rice with fresh lobster meat and parmesan',
    price: 28.99,
    image: 'https://images.pexels.com/photos/8992462/pexels-photo-8992462.jpeg',
    category: 'Fine Dining',
    cuisine: 'Italian',
    rating: 4.7,
    customizations: {
      extraToppings: ['Extra Lobster (+$10)', 'White Wine Reduction (+$3)', 'Fresh Herbs (+$2)']
    }
  },

  // Asian
  {
    id: 'as1',
    name: 'Chicken Pad Thai',
    description: 'Stir-fried rice noodles with chicken, peanuts, and tamarind sauce',
    price: 13.99,
    image: 'https://images.pexels.com/photos/5792329/pexels-photo-5792329.jpeg',
    category: 'Asian',
    cuisine: 'Thai',
    rating: 4.6,
    spiceLevel: 'Medium',
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
      extraToppings: ['Extra Peanuts (+$1)', 'Shrimp (+$4)', 'Vegetables (+$2)']
    }
  },
  {
    id: 'as2',
    name: 'Sushi Combo Platter',
    description: '12 pieces of assorted fresh sushi with wasabi and ginger',
    price: 19.99,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    category: 'Asian',
    cuisine: 'Japanese',
    rating: 4.8,
    isPopular: true,
    customizations: {
      extraToppings: ['Extra Wasabi (+$1)', 'Soy Sauce (+$0)', 'Miso Soup (+$3)']
    }
  }
];

export const cuisineCategories = [
  { name: 'Street Food', icon: '🍕', color: '#FF6B35' },
  { name: 'Fast Food', icon: '🍔', color: '#4ECDC4' },
  { name: 'Fine Dining', icon: '🍽️', color: '#45B7D1' },
  { name: 'Asian', icon: '🍜', color: '#96CEB4' }
];