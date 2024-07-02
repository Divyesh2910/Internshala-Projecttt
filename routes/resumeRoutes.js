const express = require("express");
const router = express.Router();
const {resume,
    addeducation,
    editeducation,
    deleteeducation,
    job,
    addjob,
    editjob,
    deletejob,
    internship,
    addinternship,
    editinternship,
    deleteinternship,
    course,
    addcourse,
    editcourse,
    deletecourse,
    project,
    addproject,
    editproject,
    deleteproject,
    skill,
    addskill,
    editskill,
    deleteskill,
    accomplishment,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

//------------------EDUCATION----------------------------------

// GET /
router.get("/", isAuthenticated, resume);

// POST
router.post("/add-edu", isAuthenticated, addeducation);

// POST
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// POST
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

// ---------------------------JOBS----------------------------------


// GET /
router.get("/", isAuthenticated, job);

// POST
router.post("/add-job", isAuthenticated, addjob);

// POST
router.post("/edit-job/:jobid", isAuthenticated, editjob);

// POST
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

// ----------------------------INTERNSHIP---------------------------

// GET /
router.get("/", isAuthenticated, internship);

// POST
router.post("/add-internship", isAuthenticated, addinternship);

// POST
router.post("/edit-internship/:jobid", isAuthenticated, editinternship);

// POST
router.post("/delete-internship/:jobid",isAuthenticated, deleteinternship);

// ------------------------------COURSES----------------------------

// GET /
router.get("/", isAuthenticated, course);

// POST
router.post("/add-course", isAuthenticated, addcourse);

// POST
router.post("/edit-course/:courseid", isAuthenticated, editcourse);

// POST
router.post("/delete-course/:courseid", isAuthenticated, deletecourse);

// ----------------------------PROJECT------------------------------

//GET /
router.get("/", isAuthenticated, project);

// POST
router.post("/add-project", isAuthenticated, addproject);

// POST
router.post("/edit-project/:projectid", isAuthenticated, editproject);

// POST
router.post("/delete-project/:projectid", isAuthenticated, deleteproject);

// --------------------------SKILLS---------------------------------

// GET /
router.get("/", isAuthenticated, skill);

// POST
router.post("/add-skill", isAuthenticated, addskill);

// POST
router.post("/edit-skill/:skillid", isAuthenticated, editskill);

// POST
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);

// -----------------------Accomplishments---------------------------

// GET /
router.get("/", isAuthenticated, accomplishment);

// POST
router.post("/add-accomplishment", isAuthenticated, addaccomplishment);

// POST
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment);

// POST
router.post("/delete-accomplishment/:accomplishmentid",
isAuthenticated, deleteaccomplishment);

module.exports = router;