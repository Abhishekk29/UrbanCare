const User = require('../models/User');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
// Get all providers
exports.getAllProviders = async (req, res) => {
  const providers = await User.find({ role: 'provider' }).select('-password');
  res.json(providers);
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('userId').populate({
    path: 'serviceId',
    populate: { path: 'providerId' }
  });
  res.json(bookings);
};

// Get all services
exports.getAllServices = async (req, res) => {
  const services = await Service.find().populate('providerId', 'name email');
  res.json(services);
};



// Approve service
exports.approveService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    { approved: true, rejected: false }, // ✅ reset rejected
    { new: true }
  );
  res.json(service);
};


// Reject service
exports.rejectService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { approved: false, rejected: true }, // 👈 make sure to set this too
      { new: true }
    );
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service rejected', service });
  } catch (err) {
    console.error('Error rejecting service:', err);
    res.status(500).json({ message: 'Error rejecting service' });
  }
};

