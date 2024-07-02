const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new errorHandler("please login in to access the resource", 401));
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;
    // res.json(id, token);
    next();
});