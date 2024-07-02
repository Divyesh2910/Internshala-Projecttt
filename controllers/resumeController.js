const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const errorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require('uuid');

// ----------------------------EDUCATION----------------------------

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const resume = await Student.findById(req.id).exec();
    res.json({message: "secure resume page!", resume});
});

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message: "Education Added!"});
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        (i) => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex], 
        ...req.body,
    };
    await student.save();
    res.json({message: "Education Updated!"});
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter(
        (i) => i.id !== req.params.eduid
    );
    student.resume.education = filterededu;
    await student.save();
    res.json({message: "Education deleted!"});
});

// -------------------------------JOBS------------------------------

exports.job = catchAsyncErrors(async (req, res, next) => {
    const job = await Student.findById(req.id).exec();
    res.json({message : "secure job page!", job});
});

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message : "job added!"});
});

exports.editjob = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex(
        (i) => i.id === req.params.jobid
    );
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex], ...req.body,
    };
    await student.save();
    res.json({message: "job updated!"});
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.jobs.filter(
        (i) => i.id !== req.params.jobid                  
    );
    student.resume.jobs = filteredjob;
    await student.save();
    res.json({message: "Job Deleted"});
});

// -------------------------------INTERNSHIP------------------------

exports.internship = catchAsyncErrors(async (req, res, next) => {
    const job = await Student.findById(req.id).exec();
    res.json({message : "secure internship page!", job});
});

exports.addinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message : "internship added!"});
});

exports.editinternship = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.internships.findIndex(
        (i) => i.id === req.params.jobid
    );
    student.resume.internships[jobIndex] = {
        ...student.resume.internships[jobIndex], ...req.body,
    };
    await student.save();
    res.json({message: "internship updated!"});
});

exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.internships.filter(
        (i) => i.id !== req.params.jobid                  
    );
    student.resume.internships = filteredjob;
    await student.save();
    res.json({message: "internship Deleted"});
});

// -------------------------Courses---------------------------------

exports.course = catchAsyncErrors(async (req, res, next) => {
    const course = await Student.findById(req.id).exec();
    res.json({message : "secure course page!", course});
});

exports.addcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message : "course added!"});
});

exports.editcourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.courses.findIndex(
        (i) => i.id === req.params.courseid
    );
    student.resume.courses[courseIndex] = {
        ...student.resume.courses[courseIndex], ...req.body,
    };
    await student.save();
    res.json({message: "course updated!"});
});

exports.deletecourse = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredcourse = student.resume.courses.filter(
        (i) => i.id !== req.params.courseid
    );
    student.resume.courses = filteredcourse;
    await student.save();
    res.json({message: "course deleted!"});
});

// -------------------------------PROJECT--------------------------

exports.project = catchAsyncErrors(async (req, res, next) => {
    const project = await Student.findById(req.id).exec();
    res.json({message: "project secure!", project})
});

exports.addproject = catchAsyncErrors(async(req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message: "project added!"});
});

exports.editproject = catchAsyncErrors(async(req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectindex = student.resume.projects.findIndex(
        (i) => i.id === req.params.projectid
    );
    student.resume.projects[projectindex] ={
        ...student.resume.projects[projectindex], ...req.body,
    };
    await student.save();
    res.json({message: "project updated!"});
});

exports.deleteproject = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredproject = student.resume.projects.filter(
        (i) => i.id !== req.params.projectid
    );
    student.resume.projects = filteredproject;
    await student.save();
    res.json({message: "project deleted!"});
});

// ---------------------------SKILLS-------------------------------

exports.skill = catchAsyncErrors(async (req, res, next) => {
    const skill = await Student.findById(req.id).exec();
    res.json({message : "secure skill page!", skill});
});

exports.addskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message : "skill added!"});
});

exports.editskill = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex(
        (i) => i.id === req.params.skillid
    );
    student.resume.skills[skillIndex] = {
        ...student.resume.skills[skillIndex], ...req.body,
    };
    await student.save();
    res.json({message: "skill updated!"});
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredskill = student.resume.skills.filter(
        (i) => i.id !== req.params.skillid                  
    );
    student.resume.skills = filteredskill;
    await student.save();
    res.json({message: "skill Deleted"});
});

// ------------------------------Accomplishments--------------------

exports.accomplishment = catchAsyncErrors(async (req, res, next) => {
    const accomplishment = await Student.findById(req.id).exec();
    res.json({message : "secure accomplishment page!", accomplishment});
});

exports.addaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4()});
    await student.save();
    res.json({message : "accomplishment added!"});
});

exports.editaccomplishment = catchAsyncErrors(async (req, res, next) =>{
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.findIndex(
        (i) => i.id === req.params.accomplishmentid
    );
    student.resume.accomplishments[accomplishmentIndex] = {
        ...student.resume.accomplishments[accomplishmentIndex], ...req.body,
    };
    await student.save();
    res.json({message: "accomplishment updated!"});
});

exports.deleteaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishment = student.resume.accomplishments.filter(
        (i) => i.id !== req.params.accomplishmentid                  
    );
    student.resume.accomplishments = filteredaccomplishment;
    await student.save();
    res.json({message: "accomplishment Deleted"});
});

