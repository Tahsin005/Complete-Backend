const { uploadToCloudinary } = require('../helpers/cloudinary.helpers.js');
const Image = require('../models/image.models.js');
const fs = require("fs");

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

        //delete the file from local stroage
        // fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
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

const fetchImages = async (req, res) => {
    try {
        const images = await Image.find({});

        if (images) {
            return res.status(200).json({
                success: true,
                message: 'Images fetched successfully',
                data: images
            });
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch images'
        });
    }
};

module.exports = {
    uploadImage,
    fetchImages
};