const Service = require('../models/Service');
const User = require('../models/User');
const Booking = require('../models/Booking');

exports.getAllServices = async (req, res) => {
  const services = await Service.find().populate('providerId', 'name email');
  res.json(services);
};

exports.updateServiceStatus = async (req, res) => {
  const { status } = req.body;
  await Service.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: `Service ${status}` });
};

exports.getAllProviders = async (req, res) => {
  const providers = await User.find({ role: 'provider' }, 'name email');
  res.json(providers);
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('userId', 'name email')
    .populate({
      path: 'serviceId',
      populate: { path: 'providerId', select: 'name' }
    });
  res.json(bookings);
};
