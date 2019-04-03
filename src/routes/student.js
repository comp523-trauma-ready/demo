// reference express, mongoose, create a router and studentModel
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let studentModel = mongoose.model('Student');

// GET request for the page to add a student
// GET localhost:3000/student
router.get('/', (req, res) => {
    // rendering student/index in the views folder
    res.render('student/index', {
        viewTitle : "Add Student"
    });
});

// POST request, made upon clicking submit
// POST localhost:3000/student
router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

// Insert record if it does not currently exist
function insertRecord(req, res) {
    let model = new studentModel();
    model.name = req.body.name;
    model.sid = req.body.sid;
    model.email = req.body.email;
    model.major = req.body.major;
    model.class = req.body.class;
    model.save((err, doc) => {
        if(!err) {
            // redirecting to student/list in the views folder
            res.redirect('student/list');
        } else {
            if (err.name == 'ValidationError') {
                console.log(err.name);
                res.render('student/index', {
                    viewTitle: "Add Student",
                    student : req.body
                });
            } else {
                console.log(`Error during record insertion : ${err}`);
            }
        }
    });
}

// Update record if it does currently exist and we wish to update it
function updateRecord(req, res) {
    studentModel.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('student/list');
        } else {
            if (err.name == 'ValidationError') {
                res.render("student/index", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            } else {
                console.log(`Error during record update : ${err}`);
            }
        }
    });
}
// GET localhost:3000/student/list
router.get('/list', (req, res) => {
    studentModel.find((err, docs) => {
        if (!err) {
            res.render('student/list', {
                list: docs
            });
        } else {
            console.log(`Error in retrieving student list : ${err}`);
        }
    });
});

// Update student
router.get('/:id', (req, res) => {
    studentModel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('student/index', {
                viewTitle: 'Update Student',
                student: doc
            });
        }
    });
});

// Delete student
router.get('/delete/:id', (req, res) => {
    studentModel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        } else {
            console.log(`Error in student delete ${err}`);
        }
    });
});

// export the router
// can now import it to the server.js file
module.exports = router;