import mongoose from "mongoose";

const notificationSettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  settings: {
    stagnantApplicationReminders: {
      type: Boolean,
      default: true
    },
    interviewReminders: {
      type: Boolean,
      default: false
    },
    applicationDeadlineAlerts: {
      type: Boolean,
      default: true
    },
    weeklyDigest: {
      type: Boolean,
      default: false
    },
    newJobMatches: {
      type: Boolean,
      default: true
    }
  },
  emailFrequency: {
    type: String,
    enum: ['immediate', 'daily', 'weekly'],
    default: 'daily'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
notificationSettingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const NotificationSettings = mongoose.models.NotificationSettings ||
  mongoose.model('NotificationSettings', notificationSettingsSchema);

export default NotificationSettings;