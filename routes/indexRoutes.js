const express = require("express");
const router = express.Router();
const {
    homepage,
    currentUser,
    studentsignup, 
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
    deletestudent,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const Student = require("../models/studentModel");

// GET /
router.get("/", homepage );

// POST /student
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup );

// POST /student/signin
router.post("/student/signin", studentsignin );

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout );

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail );

// GET /student/forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink );

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ---------add internship--------
// POST /student/apply/:internshipid
router.post("/student/internship/:internshipid", isAuthenticated, applyinternship);


// --------add job------------
router.post("/student/job/:jobid", isAuthenticated, applyjob);


// GET /student/delete/:studentid
router.get("/student/delete/:studentid", isAuthenticated, deletestudent);


module.exports = router;