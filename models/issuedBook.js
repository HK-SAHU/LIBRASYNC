const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true },
    returned: { type: Boolean, default: false },
    fine: { type: Number, default: 0 },
});

module.exports = mongoose.model('IssuedBook', issuedBookSchema);