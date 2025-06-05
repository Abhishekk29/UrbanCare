const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Check if the logged-in provider owns the service
    const service = await Service.findById(booking.serviceId);

    if (service.providerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking ${status}` });
  } catch (err) {
    console.error('Failed to update booking status:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.bookService = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userId: req.user.id,
      status: 'pending',
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking failed:', err);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// ✅ Return bookings made by the logged-in user with service + provider name
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate({
      path: 'serviceId',
      populate: { path: 'providerId', select: 'name' },
    });

    res.json(bookings);
  } catch (err) {
    console.error('Error getting user bookings:', err);
    res.status(500).json({ message: 'Error loading bookings' });
  }
};

// ✅ Return bookings for services owned by the provider
exports.getProviderAppointments = async (req, res) => {
  try {
    // 1. Get all services owned by this provider
    const providerServices = await Service.find({ providerId: req.user.id });
    const serviceIds = providerServices.map(s => s._id);

    // 2. Get bookings for those services
    const bookings = await Booking.find({ serviceId: { $in: serviceIds } }).populate({
      path: 'serviceId',
      populate: { path: 'providerId', select: 'name' },
    }).populate({ path: 'userId', select: 'name email' });

    res.json(bookings);
  } catch (err) {
    console.error('Error getting provider appointments:', err);
    res.status(500).json({ message: 'Error loading appointments' });
  }
};
