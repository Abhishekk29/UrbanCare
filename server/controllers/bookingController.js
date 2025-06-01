const Booking = require('../models/Booking');

exports.bookService = async (req, res) => {
  const booking = await Booking.create({ ...req.body, userId: req.user.id });
  res.status(201).json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('serviceId');
  res.json(bookings);
};

exports.getProviderAppointments = async (req, res) => {
  try {
    // 1. Get all services owned by this provider
    const providerServices = await Service.find({ providerId: req.user.id });

    const serviceIds = providerServices.map(s => s._id);

    // 2. Get bookings for those services
    const bookings = await Booking.find({
      serviceId: { $in: serviceIds }
    }).populate('serviceId').populate('userId');

    res.json(bookings);
  } catch (err) {
    console.error('Error getting provider appointments:', err);
    res.status(500).json({ message: 'Error loading appointments' });
  }
};