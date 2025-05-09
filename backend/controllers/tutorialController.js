const Tutorial = require('../models/Tutorial');

// @desc    Get all tutorials
// @route   GET /api/tutorials
// @access  Public
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tutorials.length, data: tutorials });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Get single tutorial
// @route   GET /api/tutorials/:id
// @access  Public
const getTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }
    
    res.status(200).json({ success: true, data: tutorial });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Create new tutorial
// @route   POST /api/tutorials
// @access  Public
const createTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json({ success: true, data: tutorial });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Update tutorial
// @route   PUT /api/tutorials/:id
// @access  Public
const updateTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }
    
    res.status(200).json({ success: true, data: tutorial });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// @desc    Delete tutorial
// @route   DELETE /api/tutorials/:id
// @access  Public
const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  }
  catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  getTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial
};