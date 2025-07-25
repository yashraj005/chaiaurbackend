import { JsonWebTokenError } from "jsonwebtoken";
import mongoose ,  {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema ({
    userName : {
        type :String ,
        required :true,
        unique : true,
        lowercase : true,
        trim :true,
        index : true
    },
    email :{
        type : String ,
        required : true,
        unique : true,
        lowercase : true,
        trim :true,
    },
    fullName :{
        type : String ,
        required : true,
        trim :true,
        index:true
    },
    avatar : {
        // url is also a type of string
        type :String , // cloudinary  url
        required : true        
    },
    coverImage : {
        type : String 
    },
    watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
    password : {
        type: String ,
        required :[true , 'Password is Required']
    },
    refreshToken : {
        type : String 
    }
},{
    timestamps:true
}
)



userSchema.pre("save"  ,async function (next){
    if (!this.isModified("password")) return next(); 
    this.password = bcrypt.hash(this.password , 4)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password . this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id:this._id,
            email: this.email,
            username:this.userName,
            fullname : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" ,userSchema);