import Collaboration from './collaboration.model.js';
import fs from 'fs';
import path from 'path';

// @desc    Create new collaboration
// @route   POST /api/v1/collaboration
// @access  Private (Admin)
export const createCollaboration = async (req, res) => {
  try {
    const { academicYear, title, description, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const collaboration = await Collaboration.create({
      academicYear,
      title,
      description,
      date,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      data: collaboration,
    });
  } catch (error) {
    console.error('Error creating collaboration:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all collaborations
// @route   GET /api/v1/collaboration
// @access  Public
export const getCollaborations = async (req, res) => {
  try {
    const collaborations = await Collaboration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: collaborations,
    });
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update collaboration
// @route   PUT /api/v1/collaboration/:id
// @access  Private
export const updateCollaboration = async (req, res) => {
  try {
    let collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    const { academicYear, title, description, date } = req.body;

    let imagePath = collaboration.image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    collaboration = await Collaboration.findByIdAndUpdate(req.params.id, {
      academicYear,
      title,
      description,
      date,
      image: imagePath
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: collaboration
    });
  } catch (error) {
    console.error('Error updating collaboration:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete collaboration
// @route   DELETE /api/v1/collaboration/:id
// @access  Private
export const deleteCollaboration = async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);

    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }

    await collaboration.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting collaboration:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
