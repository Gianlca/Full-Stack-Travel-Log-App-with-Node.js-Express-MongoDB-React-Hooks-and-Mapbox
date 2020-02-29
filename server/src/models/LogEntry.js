const mongoose = require('mongoose');

const {Schema} = mongoose;

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};
const longEntry = new Schema ({
    title: requiredString,
    description: String,
    comments: String,
    image: String,
    ranting: { 
        type: Number, 
        min : 0, 
        max: 10,
        default:0
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180
    },
    visitAtDate: {
        type:Date,
        required:true
    }
}, {
    timestamps: true,
})

const LongEntry = mongoose.model('LogEntry', longEntry)

module.exports = LongEntry;
