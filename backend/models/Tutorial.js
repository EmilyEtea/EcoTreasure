const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Home Decor', 'Fashion', 'Garden', 'Furniture', 'Kitchen', 'Tech', 'Kids', 'Office', 'Other']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  materials: [
    {
      name: {
        type: String,
        required: [true, 'Material name is required']
      },
      quantity: {
        type: String,
        required: [true, 'Quantity is required']
      }
    }
  ],
  steps: [
    {
      instruction: {
        type: String,
        required: [true, 'Step instruction is required']
      },
      imageUrl: {
        type: String,
        default: ''
      }
    }
  ],
  imageUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    required: [true, 'Creator name is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  timeRequired: {
    type: String,
    default: '30-60 minutes'
  },
  toolsRequired: {
    type: String,
    default: ''
  },
  environmentalImpact: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tutorial', TutorialSchema);