const mongoose = require("mongoose")

const packageSchema = mongoose.Schema(
    {
        destination: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        number_of_participants: {
            type: Number,
            required: true
        },
        category : {
            type: String,
            required: true
        },
        rating : {
            type: Number,
            required: true
        },
        price : {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
