const Booking = require("../models/Booking");
const Package = require("../models/Package");


exports.createBooking = async (req, res) => {
  try {
    const { packageId, travelers, name, email, phone, specialRequests } =
      req.body;
    const selectedPackage = await Package.findById(packageId);

    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const totalPrice = selectedPackage.price * travelers;

    const booking = new Booking({
      name,
      email,
      phone,
      travelers,
      specialRequests,
      package: packageId,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("package");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("package");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};
