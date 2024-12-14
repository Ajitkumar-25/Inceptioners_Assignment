import { useState } from "react";
import { bookPackage } from "../services/api";
import jsPDF from "jspdf";

const BookingForm = ({ packageId, price }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      formData.travelers < 1
    ) {
      setFeedback({
        message: "Please fill all required fields correctly.",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFeedback({
        message: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }

    if (formData.phone.length < 10 || isNaN(formData.phone)) {
      setFeedback({
        message: "Please enter a valid phone number.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const generateInvoice = () => {
    const totalAmount = price * formData.travelers;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Booking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 20, 40);
    doc.text(`Email: ${formData.email}`, 20, 50);
    doc.text(`Phone: ${formData.phone}`, 20, 60);
    doc.text(`Travelers: ${formData.travelers}`, 20, 70);
    doc.text(`Special Requests: ${formData.specialRequests || "None"}`, 20, 80);
    doc.text(`Package ID: ${packageId}`, 20, 90);
    doc.text(`Price per Traveler: $${price}`, 20, 100);
    doc.text(`Total Amount: $${totalAmount}`, 20, 110);

    doc.setFontSize(14);
    doc.text("Thank you for booking with us!", 20, 130);

    doc.save(`Invoice_${formData.name.replace(/\s+/g, "_")}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSubmit = { ...formData, packageId };
      await bookPackage(dataToSubmit);
      setFeedback({ message: "Booking successful!", type: "success" });

      generateInvoice();

      setFormData({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        specialRequests: "",
      });
    } catch (err) {
      setFeedback({
        message: "Error submitting booking. Please try again.",
        type: "error",
      });
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-md shadow-md mx-auto"
    >
      <h2 className="text-lg font-bold mb-4">Book Your Package</h2>

      {feedback.message && (
        <p
          className={`mb-4 text-sm ${
            feedback.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback.message}
        </p>
      )}

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="block w-full p-2 mb-4 border rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="block w-full p-2 mb-4 border rounded"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
        className="block w-full p-2 mb-4 border rounded"
      />

      <input
        type="number"
        placeholder="Number of Travelers"
        value={formData.travelers}
        onChange={(e) =>
          setFormData({ ...formData, travelers: Math.max(1, e.target.value) })
        }
        required
        className="block w-full p-2 mb-4 border rounded"
        min="1"
      />

      <textarea
        placeholder="Special Requests (Optional)"
        value={formData.specialRequests}
        onChange={(e) =>
          setFormData({ ...formData, specialRequests: e.target.value })
        }
        className="block w-full p-2 mb-4 border rounded"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
