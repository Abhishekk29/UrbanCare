const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  const services = await Service.find({ status: 'approved' }).populate('providerId', 'name');
  res.json(services);
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
