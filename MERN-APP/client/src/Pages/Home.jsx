const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to MERN App</h1>
      <p className="text-lg mb-4">
        This is a basic MERN stack application with Tailwind CSS and MVC backend.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>React frontend with Tailwind CSS</li>
          <li>Express backend with MVC architecture</li>
          <li>MongoDB database</li>
          <li>CRUD operations for items</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;