import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50">
      {/* Floating container with glass morphism effect */}
      <div className="max-w-7xl mx-auto px-4 py-3 mt-4 mx-4 rounded-xl shadow-2xl backdrop-blur-md bg-white/80 border border-white/20">
        <div className="flex justify-between items-center">
          {/* Logo with subtle shine effect */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              {/* Logo background circle */}
              {/* <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div> */}
              {/* Logo text */}
              <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                DreamHome
              </span>
            </div>
          </Link>

          {/* Main navigation - now with animated underline */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", name: "Home" },
              // { path: "/owners", name: "Owners" },
              // { path: "/clients", name: "Clients" },
              { path: "/viewings", name: "Viewings" },
              { path: "/leases", name: "Leases" },
              { path: "/about", name: "About" },
              { path: "/about", name: "Contact Us" },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className="relative px-1 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth buttons with floating effect */}
          <div className="flex items-center space-x-0 md:space-x-4">
            
            <Link 
              to="/properties" 
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:from-blue-600 hover:to-blue-700"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;