import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { foodItems, cuisineCategories } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', ...cuisineCategories.map(cat => cat.name)];
  const cuisines = ['All', ...Array.from(new Set(foodItems.map(item => item.cuisine)))];

  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesCuisine = selectedCuisine === 'All' || item.cuisine === selectedCuisine;
      
      let matchesPrice = true;
      if (priceRange === 'Under $15') matchesPrice = item.price < 15;
      else if (priceRange === '$15-$25') matchesPrice = item.price >= 15 && item.price <= 25;
      else if (priceRange === 'Over $25') matchesPrice = item.price > 25;

      return matchesSearch && matchesCategory && matchesCuisine && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedCuisine, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedCuisine('All');
    setPriceRange('All');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600">Discover delicious dishes from around the world</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for dishes, cuisines, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg mb-4"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>

          {/* Filters */}
          <div className={`grid md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Cuisine Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="All">All Prices</option>
                <option value="Under $15">Under $15</option>
                <option value="$15-$25">$15 - $25</option>
                <option value="Over $25">Over $25</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;