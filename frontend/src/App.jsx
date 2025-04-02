import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Branches from './pages/Branches';
import Staff from './pages/Staff';
import Owners from './pages/Owners';
import Clients from './pages/Clients';
import Viewings from './pages/Viewings';
import Leases from './pages/Leases';
import StaffPortal from './pages/staff-portal';
import Customerportal from './pages/customerportal';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/about';

function App() {
  return (
    <Router>
      {/* Flex column, full viewport height */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        {/* Main content grows to fill space */}
        <main className="flex flex-col min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/viewings" element={<Viewings />} />
            <Route path="/leases" element={<Leases />} />
            <Route path="/staff-portal" element={<StaffPortal />} />
            <Route path="/customer-portal" element={<Customerportal />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Optional footer at the bottom */}
        <footer className="bg-gray-800 text-white text-center py-4">
          © {new Date().getFullYear()} DreamHome. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
