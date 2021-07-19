const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },

    URL_key: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    isDownloaded: {
        type: Boolean,
        default: false
    }
})

const File = mongoose.model('File', fileSchema)

module.exports = File
