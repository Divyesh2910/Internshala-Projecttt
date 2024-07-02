const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema({
    firstname : {
        type : String,
        required : [true, "first name is required"],
        minLength : [3, "first name should have atleast 3 character long"]
    },
    lastname : {
        type : String,
        required : [true, "last name is required"],
        minLength : [3, "last name should have atleast 3 character long"]
    },
    contact : {
        type : String,
        required : [true, "contact is required"],
        minLength : [10, "contact should not have atleast 10 character long"],
        maxLength : [10, "contact should have atleast 10 character long"],
    },
    city : {
        type : String,
        required : [true, "city is required"],
        minLength : [3, "city name must be atleast 3 characters"],
    },
    gender : {
        type : String, enum : ["male", "female", "others"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Email is required"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"],
    },
    
    password : {
        type : String,
        select : false,
        maxLength : [15, "password should not exceed more than 15 characters"],
        minLength : [6, "password should have atleast 6 characters"],
        // match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Please enter valid password"],
    },
    resetPasswordToken : {
        type: String,
        default : "0",
    },
    avatar: {
        type: Object,
        default: {
            fileId: "",
            url: "https://images.unsplash.com/photo-1709532696583-b19c20ed2894?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    },
    resume: {
        education: [],
        jobs: [],
        internships: [],
        courses: [],
        projects: [],
        skills: [],
        accomplishments: [],
    },
    internships: [
        {type: mongoose.Schema.Types.ObjectId, ref: "internship"},
    ],
    jobs: [
        {type: mongoose.Schema.Types.ObjectId, ref: "job"},
    ],
},

{timestamps: true});

studentModel.pre("save", function(){
    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,})
}

const Student = mongoose.model("student", studentModel);

module.exports = Student;