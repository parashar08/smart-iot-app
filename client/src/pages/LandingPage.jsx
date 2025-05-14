import { FaLeaf, FaMobileAlt, FaCloudSun } from 'react-icons/fa';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 drop-shadow-sm mb-6">
          Smart Irrigation System
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
          A modern, AI-powered irrigation solution to monitor and automate watering based on soil and weather conditions. Save water. Grow smarter. 🌿
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
          <FeatureCard
            icon={<FaLeaf className="text-green-500 text-3xl" />}
            title="Eco-Friendly"
            desc="Conserves water by using smart scheduling and real-time soil data."
          />
          <FeatureCard
            icon={<FaCloudSun className="text-yellow-400 text-3xl" />}
            title="Weather Aware"
            desc="Adjusts watering based on live temperature and humidity data."
          />
          <FeatureCard
            icon={<FaMobileAlt className="text-blue-500 text-3xl" />}
            title="Remote Control"
            desc="Control your irrigation system anytime, anywhere via your phone."
          />
        </div>

        <div className="mt-12">
          <Link to="/auth">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
