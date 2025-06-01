const { uploadToCloudinary } = require('../helpers/cloudinary.helpers.js');
const Image = require('../models/image.models.js');
const cloudinary = require('../config/cloudinary.config.js');
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if (images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images,
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

const deleteImage = async (req, res) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: `You are not authorized to delete this image because you haven't uploaded it`,
            });
        }

        await cloudinary.uploader.destroy(image.publicId);

        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
};

module.exports = {
    uploadImage,
    fetchImages,
    deleteImage
};