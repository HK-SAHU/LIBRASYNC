const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// Add a member
router.post('/', async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;