import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        description: {
            type: String,
            required: true,
        },
        price: { type: Number, required: true },
        images: [
            {
                public_id: { type: String },
                url: { type: String },
                filename: { type: String },
            },
        ],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        properties: { type: Object },
    },
    { timestamps: true }
);

export const Product = models.Product || model('Product', productSchema);
