import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Truck } from 'lucide-react';
import { cuisineCategories, foodItems } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Home: React.FC = () => {
  const popularItems = foodItems.filter(item => item.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Delicious Food
              <br />
              <span className="text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Order from your favorite restaurants and get fresh, hot meals delivered right to your doorstep
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-200">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Food</h3>
              <p className="text-gray-600">Fresh ingredients and top-rated restaurants</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders over $25</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cuisines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Browse by Cuisine</h2>
            <p className="text-xl text-gray-600">Discover amazing flavors from around the world</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cuisineCategories.map((cuisine) => (
              <Link
                key={cuisine.name}
                to={`/menu?category=${encodeURIComponent(cuisine.name)}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div 
                  className="text-4xl mb-4 w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${cuisine.color}20` }}
                >
                  {cuisine.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
                  {cuisine.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular This Week</h2>
            <p className="text-xl text-gray-600">Most loved dishes by our customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
            >
              View Full Menu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;