const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const claimHistorySchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    pointsClaimed : Number,
    claimedAt : {
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model('ClaimHistory' , claimHistorySchema);