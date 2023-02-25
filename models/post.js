const mongoose = require('mongoose');
const postPhotoBasePath = 'uploads/photoUpload'

const postSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    postPhoto: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', postSchema);
module.exports.postPhotoBasePath = postPhotoBasePath