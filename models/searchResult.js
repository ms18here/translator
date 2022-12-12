const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Calcutta");
//Schema of USER
const SearchResultSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    },
},
{ timestamps: true })

module.exports = mongoose.model('SearchResult', SearchResultSchema);