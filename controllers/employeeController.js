const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Employee = require("../models/employeeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const errorHandler = require("../utils/errorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");
const path = require("path")
const imagekit = require("../utils/imageKit").initImageKit();


exports.homepage = catchAsyncErrors(async(req, res, next) =>{
    res.json({message:"Secure Employee Homepage!"});
});

exports.currentEmployee = catchAsyncErrors(async(req, res, next) => {
    const employee = await Employee.findById(req.id).exec();
    res.json({employee})
});

exports.employeesignup = catchAsyncErrors(async(req, res, next) =>{
    const employee = await new Employee(req.body).save();
    sendtoken(employee, 201, res);
});

exports.employeesignin = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findOne({email: req.body.email})
    .select("+password")
    .exec();

    if(!employee) return next(new errorHandler("Employee not found with this email address.", 404));

    const isMatch = employee.comparepassword(req.body.password);

    if(!isMatch) return next(new errorHandler("Wrong Credential", 500));

    sendtoken(employee, 200, res);
});

exports.employeesignout = catchAsyncErrors(async(req, res, next) =>{
    res.clearCookie("token");
    res.json({message : "Successfully Signout"});
});

exports.employeesendmail = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findOne({email: req.body.email}).exec()

    if(!employee){
        return next(
            new errorHandler("User not found with this email address.", 404)
        );
    }

    const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${employee._id}`;

    sendmail(req, res, next, url);
    employee.resetPasswordToken = "1";
    await employee.save();
    res.json({employee, url});
});

exports.employeeforgetlink = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findById(req.params.id).exec();

    if(!employee){
        return next(
            new errorHandler("User not found with this email address.", 404)
        );
    }
    if(employee.resetPasswordToken == "1"){
        employee.resetPasswordToken == "0";
        employee.password = req.body.password;
        await employee.save();
    }else{
        return next(
            new errorHandler("Invalid reset password link! please try again", 500)
        );
    }
    
    res.status(200).json({
        message:"password successfully changed."
    });
});

exports.employeeresetpassword = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findById(req.id).exec();

    employee.password = req.body.password;
    await employee.save();

    sendtoken(employee, 201, res);
});

exports.employeeupdate = catchAsyncErrors(async (req, res, next) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success : true,
        message : "employee updated successfully!",      
    });
});

exports.employeeavatar = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).exec();
    const file = req.files.organisationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if(employee.organisationlogo && employee.organisationlogo.fileId){
        await imagekit.deleteFile(employee.organisationlogo.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    employee.organisationlogo = {fileId, url};
    await employee.save();
    res.status(200).json({
        success: true,
        message: "Employee avatar successfully uploaded",
    });
});


//-------------internships---------
exports.createinternship = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findById(req.id).exec();
    const internship = await new Internship(req.body);
    internship.employee = employee._id; 
    employee.internships.push(internship._id);
    await internship.save();
    await employee.save();
    res.status(201).json({success:true, internship});
});

exports.readinternship = catchAsyncErrors(async(req, res, next) =>{
    const internships = await Employee.findById(req.id).populate("internships").exec();
    res.status(200).json({success: true, internships});
});

exports.readsingleinternship = catchAsyncErrors(async(req, res, next) =>{
    const internship = await Internship.findById(req.params.id).exec();
    res.status(200).json({success: true, internship});
});


// -------------jobs-----------
exports.createjob = catchAsyncErrors(async(req, res, next) =>{
    const employee = await Employee.findById(req.id).exec();
    const job = await new Job(req.body);
    job.employee = employee._id; 
    employee.jobs.push(job._id);
    await job.save();
    await employee.save();
    res.status(201).json({success:true, job});
});

exports.readjob = catchAsyncErrors(async(req, res, next) =>{
    const jobs = await Employee.findById(req.id).populate("jobs").exec();
    res.status(200).json({success: true, jobs});
});

exports.readsinglejob = catchAsyncErrors(async(req, res, next) =>{
    const job = await Job.findById(req.params.id).exec();
    res.status(200).json({success: true, job});
});