const { reviews, getNextReviewId } = require('../data/mockData');

class ReviewController {
  // Get all reviews
  getAllReviews(req, res) {
    try {
      res.json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Create a new review
  createReview(req, res) {
    try {
      const { orderId, customerName, rating, comment } = req.body;

      if (!orderId || !rating) {
        return res.status(400).json({
          success: false,
          message: 'رقم الطلب والتقييم مطلوبان'
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'التقييم يجب أن يكون بين 1 و 5'
        });
      }

      const newReview = {
        id: getNextReviewId(),
        orderId: parseInt(orderId),
        customerName: customerName || 'مجهول',
        rating: parseInt(rating),
        comment: comment || '',
        createdAt: new Date()
      };

      reviews.push(newReview);

      res.status(201).json({
        success: true,
        message: 'شكراً لتقييمك',
        data: newReview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }
}

module.exports = new ReviewController();