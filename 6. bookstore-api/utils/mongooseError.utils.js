function handleMongooseError(err, res) {
    if (err.name === "ValidationError") {
        const errorMessages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errorMessages,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
    });
}

module.exports = handleMongooseError;
