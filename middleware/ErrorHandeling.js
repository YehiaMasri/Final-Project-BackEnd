

// export const errorHandeler = 
function errorHandeler  (err, req, res, next){
    const errMessage = err.message || "Somthing went wrong";
    const errStatus = err.status || 500;
    return res.status(errStatus).json({
        success:false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
}

export default errorHandeler