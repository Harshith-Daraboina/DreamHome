import React from 'react';
import { FiUsers, FiHome, FiAward, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Real Estate Company</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting people with their dream homes since 2010. We pride ourselves on integrity, professionalism, and exceptional service.
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-16 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img 
              className="h-full w-full object-cover" 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
              alt="Our office" 
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010 by John and Sarah Smith, our company began as a small local agency with big dreams. 
              What started as a two-person operation has grown into one of the region's most trusted real estate firms.
            </p>
            <p className="text-gray-600 mb-6">
              Over the past decade, we've helped over 5,000 families find their perfect homes and assisted hundreds 
              of investors in building their property portfolios.
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                <FiUsers className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">5,000+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Mission & Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-indigo-600 mb-4">
              <FiHome className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Find Your Perfect Home</h3>
            <p className="text-gray-600">
              We go beyond transactions to understand your unique needs and help you find a place you'll love.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-indigo-600 mb-4">
              <FiAward className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Expert Guidance</h3>
            <p className="text-gray-600">
              Our experienced agents provide market insights and negotiation expertise to get you the best deal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-indigo-600 mb-4">
              <FiUsers className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Client-First Approach</h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority. We're committed to transparency and open communication.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'John Smith', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Sarah Johnson', role: 'Managing Director', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Michael Chen', role: 'Senior Agent', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
            { name: 'Emily Wilson', role: 'Marketing Director', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
          ].map((person, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <img className="w-full h-48 object-cover" src={person.img} alt={person.name} />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                <p className="text-gray-600">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16 bg-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "The team made our home buying experience seamless. Their attention to detail and market knowledge was impressive.",
              name: "David & Rachel Miller",
              role: "Homeowners"
            },
            {
              quote: "As an investor, I appreciate their honest advice and negotiation skills that helped me build my portfolio.",
              name: "Robert Chang",
              role: "Real Estate Investor"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-medium text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiMapPin className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600">123 Main Street, Suite 400</p>
                  <p className="text-gray-600">San Francisco, CA 94105</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiPhone className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiMail className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600">info@realestateexample.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <iframe 
              title="Office Location"
              className="w-full h-full min-h-64"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.538962143593!2d-122.399472684683!3d37.78625797975946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f10f5a3a9%3A0x3e9ae4902b3cc81e!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;