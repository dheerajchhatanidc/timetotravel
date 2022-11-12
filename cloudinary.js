const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv=require('dotenv');
const multer=require('multer')

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.v2.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Images',
      format: async (req, file) => {
        "jpg", "png","jpeg";
    }, 
    public_id: (req, file) => {
       
        return (
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
      
    },
  });
const upload  = multer({ storage });
module.exports=upload
