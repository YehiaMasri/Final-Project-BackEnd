import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    seat_available: {
      type: Number,
      required: true,
    },
    is_available: {
      type: Boolean,
      required: true,
    },
    description:{
      type: String,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],

    bookings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        bookedAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Section",
  }
);

sectionSchema.pre(/^find/, function (next) {
  this.populate('bookings.user');
  next();
});


const sectionModel = model("Section", sectionSchema);
export default model("Section", sectionSchema);
