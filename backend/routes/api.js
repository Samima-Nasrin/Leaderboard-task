const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

//all users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

//new user
router.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
})

//claim points
router.post('/claim', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const points = Math.floor(Math.random() * 100) + 1; 
    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({ userId, pointsClaimed: points });
    await history.save();

    res.json({ 
        pointsAwarded: points, 
        totalPoints: user.totalPoints 
    });
})

//leaderboard
router.get('/leaderboard', async (req, res) => {
    const users = await User.find().sort({ totalPoints : -1 });
    const rankedUsers = users.map((user, index) => ({
        rank : index + 1,
        name : user.name,
        totalPoints : user.totalPoints,
    }));
    res.json(rankedUsers);
})

//points history
router.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });
    res.json(history);
});

module.exports = router;
