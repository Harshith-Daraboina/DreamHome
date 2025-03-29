import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white text-2xl font-bold">
              DreamHome
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 transition duration-300">
              Home
            </Link>
            <Link to="/properties" className="text-white hover:text-blue-200 transition duration-300">
              Properties
            </Link>
            <Link to="/branches" className="text-white hover:text-blue-200 transition duration-300">
              Branches
            </Link>
            <Link to="/staff" className="text-white hover:text-blue-200 transition duration-300">
              Staff
            </Link>
            <Link to="/owners" className="text-white hover:text-blue-200 transition duration-300">
              Owners
            </Link>
            <Link to="/clients" className="text-white hover:text-blue-200 transition duration-300">
              Clients
            </Link>
            <Link to="/viewings" className="text-white hover:text-blue-200 transition duration-300">
              Viewings
            </Link>
            <Link to="/leases" className="text-white hover:text-blue-200 transition duration-300">
              Leases
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;