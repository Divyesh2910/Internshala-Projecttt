const express = require("express");
const router = express.Router();
const {
    homepage,
    currentEmployee,
    employeesignup, 
    employeesignin,
    employeesignout,
    employeesendmail,
    employeeforgetlink,
    employeeresetpassword,
    employeeupdate,
    employeeavatar,

    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/", homepage );

// POST /employee
router.post("/current", isAuthenticated, currentEmployee);

// POST /employee/signup
router.post("/signup", employeesignup );

// POST /employee/signin
router.post("/signin", employeesignin );

// GET /employee/signout
router.get("/signout", isAuthenticated, employeesignout );

// POST /employee/send-mail
router.post("/send-mail", employeesendmail );

// GET /employee/forget-link/:employeeid
router.get("/forget-link/:id", employeeforgetlink );

// POST /employee/reset-password/:employeeid
router.post("/reset-password/:id", isAuthenticated, employeeresetpassword);

// POST /employee/update/:employeeid
router.post("/update/:id", isAuthenticated, employeeupdate);

// POST /employee/avatar/:employeeid
router.post("/avatar/:id", isAuthenticated, employeeavatar);


// -----------internship-----------

//POST /employee/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

//POST /employee/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

//POST /employee/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

// -----------job-----------

//POST /employee/job/create
router.post("/job/create", isAuthenticated, createjob);

//POST /employee/job/read
router.post("/job/read", isAuthenticated, readjob);

//POST /employee/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

module.exports = router;