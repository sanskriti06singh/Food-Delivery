import React, { useState } from 'react';
import { Star, Plus, Flame } from 'lucide-react';
import { FoodItem } from '../data/foodData';
import { useCart } from '../contexts/CartContext';
import CustomizationModal from './CustomizationModal';

interface FoodCardProps {
  item: FoodItem;
  showAddButton?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, showAddButton = true }) => {
  const { addToCart } = useCart();
  const [showCustomization, setShowCustomization] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (customizations?: any) => {
    addToCart(item, customizations);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickAdd = () => {
    if (item.customizations && Object.keys(item.customizations).length > 0) {
      setShowCustomization(true);
    } else {
      handleAddToCart();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.isPopular && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Popular
            </div>
          )}
          {item.isVegetarian && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Veg
            </div>
          )}
          {item.spiceLevel && (
            <div className="absolute bottom-3 right-3 flex items-center bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              <Flame className="w-3 h-3 mr-1" />
              {item.spiceLevel}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
              {item.name}
            </h3>
            <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{item.rating}</span>
              <span className="text-xs text-gray-500">({Math.floor(Math.random() * 200) + 50} reviews)</span>
            </div>

            {showAddButton && (
              <button
                onClick={handleQuickAdd}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}
                disabled={isAdded}
              >
                <Plus className={`w-4 h-4 ${isAdded ? 'hidden' : ''}`} />
                <span>{isAdded ? 'Added!' : 'Add'}</span>
              </button>
            )}
          </div>

          {item.customizations && Object.keys(item.customizations).length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">Customizable</span>
            </div>
          )}
        </div>
      </div>

      {showCustomization && (
        <CustomizationModal
          item={item}
          onClose={() => setShowCustomization(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default FoodCard;