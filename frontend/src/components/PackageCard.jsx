import { useNavigate } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-md shadow-md">
      <img
        src={packageData.image}
        alt={packageData.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{packageData.title}</h2>
      <p className="text-gray-600 line-clamp-3">{packageData.description}</p>
      <p className="mt-2 text-green-600 font-bold">${packageData.price}</p>
      <p className="text-blue-600">
        Available Dates: {packageData.availableDates.join(", ")}
      </p>
      <p className="mt-2 text-gray-600">
        Destination: {packageData.destination}
      </p>

      <button
        onClick={() => navigate(`/packages/${packageData._id}`)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        View Details
      </button>
    </div>
  );
};

export default PackageCard;
