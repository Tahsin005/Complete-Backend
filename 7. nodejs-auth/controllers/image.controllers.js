const { uploadToCloudinary } = require('../helpers/cloudinary.helpers.js');
const Image = require('../models/image.models.js');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId,
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: "Imaged uploaded successfully",
            image: newlyUploadedImage,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to upload image'
        });
    }
};

module.exports = {
    uploadImage
};