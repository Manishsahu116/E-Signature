import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaKeyboard, FaPencilAlt } from 'react-icons/fa'; // Import icons from react-icons

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Create and Draw Your Signature Online for Free
      </h1>

      {/* Description Text */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl">
        Create your digital signature easily using our online signature pad. Compatible with all devices including iPhone, iPad, Android phones, tablets, and computers.
      </p>

      {/* Icons for Signature Generator and Draw Signature */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <Link to="/signature-generator"> 
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <FaKeyboard className="text-slate-600 hover:text-blue-700 text-6xl mb-2" /> 
            <p className="text-gray-500 mt-2">Type your signature with ease.</p> 
          </div>
        </Link>
        <Link to="/signature-draw">
          <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <FaPencilAlt className="text-slate-600 hover:text-blue-700 text-6xl mb-2" /> 
            <p className="text-gray-500 mt-2">Draw your signature freely.</p> 
          </div>          
        </Link>
      </div>
    </div>
  );
};

export default Home;
