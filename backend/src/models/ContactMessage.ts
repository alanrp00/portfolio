import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    from: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    userAgent: { type: String },
    ip: { type: String },
    delivered: { type: Boolean, default: false }, // si el correo se envió ok
  },
  { timestamps: true }
);

export default (mongoose.models.ContactMessage as mongoose.Model<any>) ||
  mongoose.model("ContactMessage", ContactMessageSchema);
