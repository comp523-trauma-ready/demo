// connect to mongoose
let mongoose = require('mongoose');

// created a schema for the database
// format is like that of a json file
let studentSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    sid: {
        type: Number,
        required: true,
        unique: true
    },
    major: String,
    class: Number
});

// exporting student as a mongoose model
mongoose.model('Student', studentSchema);
