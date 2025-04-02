import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchProperties } from '../services/api';
import { 
  FiSearch, 
  FiHome,
  FiFacebook, 
  FiTwitter, 
  FiInstagram,
  FiChevronRight
} from 'react-icons/fi';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Handle suggestion click - redirect to property list with search query
  const handleSuggestionClick = (property) => {
    navigate(`/properties?search=${encodeURIComponent(property.Address)}`);
    setShowSuggestions(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchInput)}`);
    }
  };

  // Slider images
  const slides = [
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1610569244414-5e7453a447a8",
      alt: "Community Houses"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      alt: "Apartment Building"
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c",
      alt: "Modern Home Exterior"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      alt: "Luxury Interior"
    }
  ];

  // Featured projects
  const featuredProjects = [
    {
      id: 1,
      name: "Brigade Marvella",
      location: "Hyderabad",
      price: "₹99.71 L - 2.58 Cr",
      type: "2 & 4 BHK Apartments",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      amenities: ["Swimming Pool", "Gym", "Park"]
    },
    {
      id: 2,
      name: "Lumbini Elysee",
      location: "Financial District, Hyderabad",
      price: "₹2.26 - 4.54 Cr",
      type: "3 & 6 BHK",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      amenities: ["Club House", "Kids Play Area", "24/7 Security"]
    },
    {
      id: 3,
      name: "Prestige Lakeside",
      location: "Kalyani Nagar, Pune",
      price: "₹2.0 - 3.8 Cr", 
      type: "3 & 4 BHK",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      amenities: ["Landscaped Gardens", "Jogging Track", "Party Hall"]
    }
  ];

  // Auto-rotate slides with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  // Search functionality with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim().length > 1) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await searchProperties(searchInput);
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen max-h-[800px] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        
        {/* Sliding Image Carousel */}
        <div className="absolute inset-0 z-0 flex">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className="relative flex-shrink-0 w-full h-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                minWidth: '100%'
              }}
              aria-hidden={index !== currentSlide}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Find Better Places to Live, Work & Wonder
            </h1>
            
            {/* Search Bar with Suggestions */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto" role="search">
              <div className="bg-white rounded-lg shadow-xl p-1">
                <div className="flex flex-col md:flex-row">
                  <select 
                    className="p-3 border-r border-gray-200 rounded-l-lg text-gray-700 focus:outline-none"
                    aria-label="Select location"
                  >
                    <option>All India</option>
                    <option>Mumbai</option>
                    <option>Delhi/NCR</option>
                    <option>Bangalore</option>
                  </select>
                  
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" aria-hidden="true" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search by name, location, or type..." 
                      className="w-full pl-10 p-3 border-r border-gray-200 text-gray-700 focus:outline-none"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      aria-autocomplete="list"
                      aria-controls="search-suggestions"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="p-3 bg-blue-600 text-white rounded-r-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    aria-label="Search properties"
                  >
                    <FiSearch className="mr-2" aria-hidden="true" /> Search
                  </button>
                </div>
              </div>

              {/* Suggestions dropdown */}
              {showSuggestions && (
                <div 
                  id="search-suggestions"
                  className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-b-lg z-20 max-h-96 overflow-y-auto"
                  role="listbox"
                >
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      <div 
                        className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mx-auto"
                        aria-label="Loading"
                      ></div>
                    </div>
                  ) : suggestions.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      {searchInput ? 'No properties found' : 'Start typing to search'}
                    </div>
                  ) : (
                    <ul>
                      {suggestions.map((property) => (
                        <li 
                          key={property.PropertyID}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                          onClick={() => handleSuggestionClick(property)}
                          role="option"
                        >
                          <div className="font-medium flex items-center">
                            <FiHome className="mr-2 text-blue-500" aria-hidden="true" />
                            {property.Address}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {property.Type} | ₹{property.Rent}/month
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </form>

            {/* Property Type Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Apartments', 'Villas', 'Plots', 'Builder Floors'].map((type) => (
                <Link
                  key={type}
                  to={`/properties?type=${type.toLowerCase()}`}
                  className="px-5 py-2.5 bg-white/90 text-blue-800 rounded-full border border-white hover:bg-white hover:shadow-md transition-all font-medium"
                  aria-label={`Browse ${type}`}
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Portals Section */}
        <section className="py-16 bg-white" aria-labelledby="portals-heading">
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="portals-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Access Our Portals
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {/* Staff Portal Card */}
              <Link 
                to="/staff-portal"
                className="flex-1 max-w-md group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                aria-label="Staff Portal"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative h-full p-8 flex flex-col">
                  <div className="mb-6 p-3 bg-white/20 rounded-lg backdrop-blur-sm w-12 h-12 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Staff Portal</h3>
                  <p className="text-blue-100 mb-6 group-hover:text-white transition-colors duration-300">
                    Management tools and analytics
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-blue-200 group-hover:text-white transition-colors duration-300">
                      Restricted access
                    </span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <FiChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Customer Portal Card */}
              <Link 
                to="/customer-portal"
                className="flex-1 max-w-md group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                aria-label="Customer Portal"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative h-full p-8 flex flex-col">
                  <div className="mb-6 p-3 bg-white/20 rounded-lg backdrop-blur-sm w-12 h-12 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Customer Portal</h3>
                  <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300">
                    Property listings and services
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                      Open access
                    </span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <FiChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-12" aria-labelledby="featured-projects-heading">
          <h2 id="featured-projects-heading" className="text-2xl font-bold text-gray-800 mb-6">
            Handpicked Residential Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                aria-label={`${project.name} project`}
              >
                <img 
                  src={project.img} 
                  alt={`${project.name} in ${project.location}`} 
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.location}</p>
                  <p className="font-semibold text-blue-700">{project.price}</p>
                  <p className="text-sm text-gray-500">{project.type}</p>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/properties" 
            className="flex items-center space-x-2 group"
          >
            <div  align-text="center" className="text-blue-600 group-hover:text-blue-800 transition-colors duration-300 underline">
              
                View All Properties
              </div>
        
          </Link>
        </section>

        {/* Insights Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-12" aria-labelledby="insights-heading">
          <h2 id="insights-heading" className="text-2xl font-bold text-gray-800 mb-6">
            Insights & Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Home Buying Checklist",
                desc: "Essential steps for first-time home buyers",
                date: "May 10, 2025"
              },
              {
                title: "Q4 2024-25 Market Trends",
                desc: "Latest real estate price movements",
                date: "May 6, 2025"
              },
              {
                title: "Legal Guide",
                desc: "Property registration & documentation",
                date: "Apr 28, 2025"
              }
            ].map((insight, index) => (
              <div 
                key={index} 
                className="border-b pb-4 last:border-0 md:border-0"
                aria-label={insight.title}
              >
                <h3 className="font-bold text-lg mb-2 text-blue-700">{insight.title}</h3>
                <p className="text-gray-600 mb-2">{insight.desc}</p>
                <p className="text-sm text-gray-400">{insight.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 rounded-xl p-8 text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-2xl font-bold text-gray-800 mb-4">
            List Your Property With Us
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Reach thousands of potential buyers and tenants by listing your property on DreamHome
          </p>
          <Link 
            to="/owners" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-300"
            aria-label="List your property"
          >
            Add Property Now
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            {/* Popular Searches */}
            <div>
              <h4 className="text-lg font-bold mb-4">POPULAR SEARCHES</h4>
              <ul className="space-y-2">
                {['Flats in Mumbai', 'Flats in Bangalore', 'Flats in Pune', 
                  'Flats in Hyderabad', 'Flats in Delhi', 'Flats in Gurgaon'].map((item, index) => (
                  <li key={`search-${index}`}>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Localities */}
            <div>
              <h4 className="text-lg font-bold mb-4">POPULAR LOCALITIES</h4>
              <ul className="space-y-2">
                {['Andheri West, Mumbai', 'Whitefield, Bangalore', 'Hinjewadi, Pune',
                  'Gachibowli, Hyderabad', 'Dwarka, Delhi', 'Sohna Road, Gurgaon'].map((item, index) => (
                  <li key={`locality-${index}`}>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Projects */}
            <div>
              <h4 className="text-lg font-bold mb-4">TRENDING PROJECTS</h4>
              <ul className="space-y-2">
                {['Prestige City, Bangalore', 'Godrej Air, Gurgaon', 'Lodha Belmondo, Mumbai',
                  'Brigade Utopia, Chennai', 'Sobha City, Bangalore'].map((item, index) => (
                  <li key={`project-${index}`}>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-lg font-bold mb-4">ABOUT US</h4>
              <ul className="space-y-2">
                {['About DreamHome', 'Careers', 'Contact Us', 'Terms & Conditions', 
                  'Privacy Policy', 'Sitemap'].map((item, index) => (
                  <li key={`about-${index}`}>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h4 className="text-lg font-bold mb-4">DOWNLOAD APP</h4>
              <div className="space-y-4">
                <button 
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300 w-full justify-center"
                  aria-label="Download on App Store"
                >
                  <span>App Store</span>
                </button>
                <button 
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-300 w-full justify-center"
                  aria-label="Download on Google Play"
                >
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Link to="/" className="text-2xl font-bold text-white">DreamHome</Link>
                <span className="text-gray-400">© {new Date().getFullYear()} All Rights Reserved</span>
              </div>
              <div className="flex space-x-4">
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FiFacebook className="h-6 w-6" />
                </Link>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <FiTwitter className="h-6 w-6" />
                </Link>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FiInstagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Home.propTypes = {
  // Add any props you expect to receive here
  // Example:
  // user: PropTypes.object,
  // isLoading: PropTypes.bool
};

export default Home;