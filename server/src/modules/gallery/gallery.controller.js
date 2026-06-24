import Gallery from './gallery.model.js';

// @desc    Upload new gallery event
// @route   POST /api/v1/gallery
// @access  Private
export const createGallery = async (req, res, next) => {
  try {
    const { academicYear, event, title, description, date, location } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image.' });
    }

    // Map files to URLs (assuming server is running on localhost:5000)
    // Using a relative path for the frontend to access via proxy
    const images = req.files.map(file => file.filename);

    const gallery = await Gallery.create({
      academicYear,
      event,
      title,
      description,
      date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      location: location || 'Jiitech',
      images,
    });

    res.status(201).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all galleries
// @route   GET /api/v1/gallery
// @access  Public
export const getGalleries = async (req, res, next) => {
  try {
    const galleries = await Gallery.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery
// @route   PUT /api/v1/gallery/:id
// @access  Private
export const updateGallery = async (req, res, next) => {
  try {
    let gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery not found' });
    }

    const { academicYear, event, title, description, date, location, retainedImages } = req.body;

    let updatedImages = gallery.images;
    
    if (retainedImages) {
      try {
        updatedImages = JSON.parse(retainedImages);
      } catch (e) {
        if (Array.isArray(retainedImages)) {
          updatedImages = retainedImages;
        } else {
          updatedImages = [retainedImages];
        }
      }
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      updatedImages = [...updatedImages, ...newImages];
    }

    gallery = await Gallery.findByIdAndUpdate(req.params.id, {
      academicYear,
      event,
      title,
      description,
      date,
      location,
      images: updatedImages
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: gallery
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery
// @route   DELETE /api/v1/gallery/:id
// @access  Private
export const deleteGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery not found' });
    }

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
