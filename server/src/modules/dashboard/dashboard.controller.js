import Gallery from '../gallery/gallery.model.js';
import Collaboration from '../collaboration/collaboration.model.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const galleryCount = await Gallery.countDocuments();
    const collaborationCount = await Collaboration.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalGallery: galleryCount,
        totalCollaborations: collaborationCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
