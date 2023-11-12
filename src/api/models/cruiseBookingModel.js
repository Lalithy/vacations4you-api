const mongoose = require("mongoose");

const cruiseBookingSchema = mongoose.Schema(
  {
    user_id: {
      type: Number,
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
    meal_preference: {
      type: String,
      required: true,
    },
    number_of_participants: {
      type: Number,
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
        cruise_name: {
          type: String,
          required: true,
        },
        cabin: {
          type: String,
          required: true,
        },
        deck: {
          type: String,
          required: true,
        },
        departure: {
          type: String,
          required: true,
        },
        arrival: {
          type: String,
          required: true,
        },
        departure_date: {
          type: String,
          required: true,
        },
        arrival_date: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        cruise_provider: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CruiseBooking = mongoose.model("CruiseBooking", cruiseBookingSchema);
module.exports = CruiseBooking;
