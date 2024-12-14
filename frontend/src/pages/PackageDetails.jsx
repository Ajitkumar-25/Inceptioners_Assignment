import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPackageDetails } from "../services/api";
import BookingForm from "../components/BookingForm";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackageDetails = async () => {
      try {
        const { data } = await fetchPackageDetails(id);
        setPackageData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching package details", err);
      }
    };

    getPackageDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-lg text-gray-500">Loading package details...</div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">Package not found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
              {packageData.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {packageData.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-lg font-medium text-gray-700">
            <p>
              <span className="text-green-600 font-bold">Price:</span> $
              {packageData.price}
            </p>
            <p>
              <span className="text-blue-600 font-bold">Available Dates:</span>{" "}
              {packageData.availableDates.join(", ")}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book this Package
            </h2>
            <p className="text-gray-600 mb-4">
              Fill out the form below to confirm your booking.
            </p>
            <BookingForm
              packageId={packageData._id}
              onSuccess={() => alert("Booking successful!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
