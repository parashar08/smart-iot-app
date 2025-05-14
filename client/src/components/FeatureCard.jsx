const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-72 hover:shadow-xl transition">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default FeatureCard;