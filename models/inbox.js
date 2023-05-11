import mongoose from "mongoose";
const { Schema, model } = mongoose;

const inboxSchema = new Schema(
  {
    user_Fname: {
      type: String,
      trim: true,
    },
    user_Lname: { type: String, trim: true },
    user_email: { type: String, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  {
    collection: "Inbox",
  }
);

export default model("Inbox", inboxSchema);
