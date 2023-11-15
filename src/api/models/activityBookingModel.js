const mongoose = require("mongoose");

const activityBookingSchema = mongoose.Schema(
  {
    user_id: {
      type: Object,
      required: true,
    },
    customer_first_name: {
      type: String,
      required: true,
    },
    customer_last_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
    },
    customer_phone_no: {
      type: String,
      required: true,
    },
    number_of_participants: {
      type: Number,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    name_on_card: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    
    number_of_booking: [
      {
        title: {
          type: String,
          required: true,
        },
        destination: {
          type: String,
          required: true,
        },
        activity_type: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ActivityBooking = mongoose.model(
  "ActivityBooking",
  activityBookingSchema
);
module.exports = ActivityBooking;
