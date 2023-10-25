const mongoose = require("mongoose")

const activitySchema = mongoose.Schema(
    {
        destination: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        activity_type: {
            type: String,
            required: true
        },
        rating : {
            type: String,
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

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
