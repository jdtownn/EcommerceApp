const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dplnrofbb',
    api_key: '956353571618786',
    api_secret: 'yCDz2zNixok9D9pd5CJqJareojo',

});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });

    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}