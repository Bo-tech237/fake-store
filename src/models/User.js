import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        role: {
            type: String,
            default: 'User',
        },
        passwordResetToken: {
            token: { type: String },
            createdAt: { type: Date },
            resetAt: { type: Date, default: null },
        },
    },
    { timestamps: true }
);

export const User = models?.User || model('User', userSchema);
