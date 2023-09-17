const mongoose = require('mongoose');

const OPERATION_ID = 'OPERATION_ID'

const operationSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: OPERATION_ID
    },
    createCount: {
        type: Number,
        default: 0
    },
    updateCount: {
        type: Number,
        default: 0
    },
    deleteCount: {
        type: Number,
        default: 0
    }
});

operationSchema.methods.create = function () {
    this.createCount++;
}

operationSchema.methods.update = function () {
    this.updateCount++;
}

operationSchema.methods.delete = function () {
    this.deleteCount++;
}

module.exports = mongoose.model('Operation', operationSchema);