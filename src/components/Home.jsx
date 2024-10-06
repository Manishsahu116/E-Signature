import { Link } from 'react-router-dom';// Import Link from react-router-dom

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Create and Draw Your Signature Online for Free
      </h1>

      {/* Description Text */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
        Create your digital signature easily using our online signature pad. Compatible with all devices including iPhone, iPad, Android phones, tablets, and computers.
      </p>

      {/* Buttons for Signature Generator and Draw Signature */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link to="/signature-generator"> {/* Use Link for navigation */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Generate Your Own Signature
          </button>
        </Link>
        <Link to="/signature-draw">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg">
            Draw Your Own Signature
          </button>          
          </Link>
      </div>
    </div>
  );
};

export default Home;

