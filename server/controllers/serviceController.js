const Service = require('../models/Service');

// controllers/serviceController.js
// Show only approved services for users/home page
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ approved: true })
      .populate('providerId');
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ message: 'Failed to load services' });
  }
};


exports.getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user.id });
    res.json(services); // includes rejected ones so provider knows
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your services' });
  }
};


exports.createService = async (req, res) => {
  const newService = await Service.create({ ...req.body, providerId: req.user.id });
  res.status(201).json(newService);
};
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
