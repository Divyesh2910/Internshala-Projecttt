const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema({
    employee: {type: mongoose.Schema.Types.ObjectId, ref: "employee"},
    profile: String,
    skill: String,
    internshiptype: {type: String, enum: ["In office", "Remote"]},
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status: {
            type:String,
            enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"]},
        amount: Number,
    },
    perks: String,
    assesments: String,
},{timestamps: true});

const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;