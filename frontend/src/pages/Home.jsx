const Home = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to DreamHome</h1>
          <h2 className="text-2xl text-gray-600 mb-8">Property Management System</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Use the navigation menu to manage properties, branches, staff, owners, clients, viewings, and leases.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Properties</h3>
            <p className="text-gray-600">Manage all property listings, including addresses, rent prices, and ownership details.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Clients</h3>
            <p className="text-gray-600">View and manage client information, preferences, and contact details.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Leases</h3>
            <p className="text-gray-600">Track all lease agreements, including start/end dates and monthly rent amounts.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;