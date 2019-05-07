const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    body: { type: String, required: true },
    teaser: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    published: { type: Boolean, required: true, default: false },
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    // collection
    collection: 'feeds',
});

// update timestamps on save
BlogPostSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    if (this.isNew) this.createdAt = this.updatedAt;

});

// create and export our model
module.exports = BlogPostSchema;