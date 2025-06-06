const Product = require("../models/product.models.js");

const insertSampleProducts = async (req, res) => {
    try {
        const sampleProducts = [
        {
            name: "Laptop",
            category: "Electronics",
            price: 999,
            inStock: true,
            tags: ["computer", "tech"],
        },
        {
            name: "Smartphone",
            category: "Electronics",
            price: 699,
            inStock: true,
            tags: ["mobile", "tech"],
        },
        {
            name: "Headphones",
            category: "Electronics",
            price: 199,
            inStock: false,
            tags: ["audio", "tech"],
        },
        {
            name: "Running Shoes",
            category: "Sports",
            price: 89,
            inStock: true,
            tags: ["footwear", "running"],
        },
        {
            name: "Novel",
            category: "Books",
            price: 15,
            inStock: true,
            tags: ["fiction", "bestseller"],
        },
        ];
        const result = await Product.insertMany(sampleProducts);
        res.status(201).json({
            succes: true,
            data: `Inserted ${result.length} sample products`,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getProductAnalysis = async (req, res) => {
    try {
        const result = await Product.aggregate([
            // {
            //     $match: {
            //         category: "Electronics",
            //     },
            // },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$price",
                    },
                    averagePrice: {
                        $avg: "$price",
                    },
                    maxPrice: {
                        $max: "$price",
                    },
                    minPrice: {
                        $min: "$price",
                    },
                    totalProducts: {
                        $sum: 1,
                    },
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxPrice: 1,
                    minPrice: 1,
                    totalProducts: 1,
                    priceRange: {
                        $subtract: ["$maxPrice", "$minPrice"]
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}


const getProductStats = async (req, res) => {
    try {
        // get all the products that are in stock and the price is greater than 100
        const result = await Product.aggregate([
            // {
            //     $match: {
            //         inStock: true,
            //         price: {
            //             $gt: 100
            //         }
            //     }
            // },
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ])


        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}


module.exports = {
    insertSampleProducts,
    getProductStats,
    getProductAnalysis
};