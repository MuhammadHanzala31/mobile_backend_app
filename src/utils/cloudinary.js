import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



cloudinary.config({ 
    cloud_name: 'dvcfuwk8i', 
    api_key: '587272127413595', 
    api_secret: 'Yef0-L8w3z1EXtO_idb_JWsCOjQ'
  });


 const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error.message)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


  export {uploadOnCloudinary}