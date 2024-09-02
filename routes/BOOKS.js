const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Import the Book model

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get available quantity of a book
router.get('/:id/available', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({ availableQuantity: book.availableQuantity });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
