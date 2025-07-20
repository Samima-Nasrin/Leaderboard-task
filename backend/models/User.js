const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    totalPoints : {
        type : Number,
        default : 0
    },
});

module.exports = mongoose.model('User' , userSchema);