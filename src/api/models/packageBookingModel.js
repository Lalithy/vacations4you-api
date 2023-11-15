const mongoose = require("mongoose");

const packageBookingSchema = mongoose.Schema(
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
        duration: {
          type: String,
          required: true,
        },
        number_of_participants: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
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

const PackageBooking = mongoose.model("PackageBooking", packageBookingSchema);
module.exports = PackageBooking;
