import { useState, useEffect } from "react";
import {
  fetchPackages,
  deletePackage,
  addPackage,
  getBookings,
  updatePackage,
} from "../services/api";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    dates: "",
    image: "",
  });

  const [editingPackageId, setEditingPackageId] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  const fetchPackagesData = async () => {
    const { data } = await fetchPackages();
    setPackages(data);
  };
  const fetchBookingsData = async () => {
    try {
      const { data } = await getBookings();
      setBookings(data);
    } catch (err) {
      alert("Error fetching bookings");
    }
  };

  useEffect(() => {
    fetchPackagesData();
    fetchBookingsData();
  }, []);

  const handleAddPackage = async () => {
    try {
      await addPackage(newPackage);
      fetchPackagesData();
      setNewPackage({
        title: "",
        description: "",
        price: "",
        dates: "",
        image: "",
      });
      alert("Package added successfully!");
    } catch (err) {
      alert("Error adding package");
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await deletePackage(id);
      fetchPackagesData();
    } catch (err) {
      alert("Error deleting package");
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackageId(pkg._id);
    setEditingPackage({ ...pkg });
  };

  const handleSaveUpdate = async () => {
    try {
      await updatePackage(editingPackageId, editingPackage);
      setEditingPackageId(null);
      setEditingPackage(null);
      fetchPackagesData();
      alert("Package updated successfully!");
    } catch (err) {
      alert("Error updating package");
    }
  };

  const handleCancelEdit = () => {
    setEditingPackageId(null);
    setEditingPackage(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Admin Dashboard
      </h1>
      <div className="bg-slate-50 p-6 rounded-lg  mb-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Add New Package</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            value={newPackage.title}
            onChange={(e) =>
              setNewPackage({ ...newPackage, title: e.target.value })
            }
            className="p-3 border rounded-md shadow-sm"
          />
          <input
            type="number"
            placeholder="Price"
            value={newPackage.price}
            onChange={(e) =>
              setNewPackage({ ...newPackage, price: e.target.value })
            }
            className="p-3 border rounded-md shadow-sm"
          />
          <input
            type="text"
            placeholder="Available Dates"
            value={newPackage.dates}
            onChange={(e) =>
              setNewPackage({ ...newPackage, dates: e.target.value })
            }
            className="p-3 border rounded-md shadow-sm"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPackage.image}
            onChange={(e) =>
              setNewPackage({ ...newPackage, image: e.target.value })
            }
            className="p-3 border rounded-md shadow-sm"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newPackage.description}
          onChange={(e) =>
            setNewPackage({ ...newPackage, description: e.target.value })
          }
          className="w-full p-3 mt-4 border rounded-md shadow-sm"
        />
        <button
          onClick={handleAddPackage}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Add Package
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Existing Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
              {editingPackageId === pkg._id ? (
                <>
                  <input
                    type="text"
                    value={editingPackage.title}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        title: e.target.value,
                      })
                    }
                    className="p-2 border rounded w-full mb-2"
                  />
                  <textarea
                    value={editingPackage.description}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        description: e.target.value,
                      })
                    }
                    className="p-2 border rounded w-full mb-2"
                  />
                  <input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        price: e.target.value,
                      })
                    }
                    className="p-2 border rounded w-full mb-2"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={handleSaveUpdate}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-gray-700 mb-2">{pkg.description}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${pkg.price}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Available Dates: {pkg.availableDates.join(", ")}
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditPackage(pkg)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit size={24} />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">All Bookings</h2>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-left text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-gray-600">Phone</th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Travelers
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Special Requests
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="px-6 py-3">{booking.name}</td>
                    <td className="px-6 py-3">{booking.email}</td>
                    <td className="px-6 py-3">{booking.phone}</td>
                    <td className="px-6 py-3">{booking.travelers}</td>
                    <td className="px-6 py-3">
                      {booking.specialRequests || "None"}
                    </td>
                    <td className="px-6 py-3">${booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
