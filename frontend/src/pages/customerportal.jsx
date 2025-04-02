import React from 'react';
import { FaUser, FaUserTie, FaCalendarAlt, FaFileContract, FaHome, FaSearch } from 'react-icons/fa';

const CustomerPortal = () => {
  const features = [
    {
      title: "Client Registration",
      icon: <FaUser className="text-4xl mb-4 text-blue-600" />,
      description: "Register as a new client to access our services",
      path: "/clients"
    },
    {
      title: "Owner Registration",
      icon: <FaUserTie className="text-4xl mb-4 text-green-600" />,
      description: "List your property with us as an owner",
      path: "/owners"
    },
    {
      title: "Schedule Viewings",
      icon: <FaCalendarAlt className="text-4xl mb-4 text-purple-600" />,
      description: "Book appointments to view available properties",
      path: "/viewings"
    },
    {
      title: "Lease Management",
      icon: <FaFileContract className="text-4xl mb-4 text-yellow-600" />,
      description: "Manage your existing leases and agreements",
      path: "/leases"
    },
    {
      title: "Explore Properties",
      icon: <FaHome className="text-4xl mb-4 text-red-600" />,
      description: "Browse our extensive property listings",
      path: "/properties"
    },
    {
      title: "Advanced Search",
      icon: <FaSearch className="text-4xl mb-4 text-teal-600" />,
      description: "Find properties matching your specific criteria",
      path: "/search"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            DreamHome Customer Portal
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to find and manage your perfect property
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6 text-center">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a
                  href={feature.path}
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Access
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our customer support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition-colors duration-300 text-center"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors duration-300 text-center"
            >
              View FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;