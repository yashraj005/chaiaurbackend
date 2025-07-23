const asyncHandler = (requsetHandler) => {
    (req , res  , next) => {
        Promise.resolve(requsetHandler(req , res , next)).catch((err) => next(err))
    }
}









export {asyncHandler}

//  this is for promises
// const asyncHandler = (fn) =>  async(err , res , req , next) => {
//     try {
//         await fn(res , req , next)
//     } catch (error) {
//         res.send(error.code || 500).json({
//             success : false , 
//             message : err.message
//         })
//     }
// }

