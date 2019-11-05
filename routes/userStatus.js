const Joi = require('joi');
const { User } = require('../models/user');
const validator = require('../middleware/validate');
const moment = require('moment');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

Joi.ObjectId = require('joi-objectid')(Joi);

router.post('/', validator(validateStatus), async (req, res) => {
    let user = await User.find({ 'userId': req.body.userId, 'userName': req.body.username });

    if (!user) return res.status(404).send("User not found");

    user = await User.updateOne({ _id: req.body.userId }, { $set: { status: req.body.status } })

    return res.send(user);
});

function validateStatus(req) {
    const schema = {
        userId: Joi.ObjectId().required(),
        userName: Joi.string().required(),
        status:Joi.string()
    };

    return Joi.validate(req, schema);
}

module.exports = router;