import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // Trims whitespace around the name
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true, // Converts the email to lowercase
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\+?\d{10,15}$/, 'Please provide a valid phone number'] // Regex for validating phone number
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true, // Trims whitespace around the address
      maxlength: [255, 'Address cannot exceed 255 characters']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
