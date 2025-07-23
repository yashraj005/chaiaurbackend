//  this is same of all codes 


import {v2 as cloudinary} from "cloudinary";

import fs from "fs";

cloudinary.config({
    cloud_name: process.env.cloudinary_name, 
        api_key: process.env.cloudinary_key, 
        api_secret: process.env.cloudinary_secret
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto"
        })
        console.log("File is uploaded");
        console.log(response.url);
        return response;        
    } catch (error) {
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

export {uploadOnCloudinary}