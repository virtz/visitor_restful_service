const Joi = require('joi');
const { Visitor } = require('../models/visitor');
const validator = require('../middleware/validate');
const moment = require('moment');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

Joi.ObjectId = require('joi-objectid')(Joi);


router.post('/',validator(validateStatus), async (req, res) => {
    let visitor = await Visitor.find({ 'visitorId': req.body.userId, 'visitorName': req.body.username });

    if (!visitor) return res.status(404).send("Visitor not found");

    visitor = await Visitor.updateOne({ _id: req.body.visitorId }, { $set: { status: req.body.status } })

    return res.send(visitor);
});
function validateStatus(req) {
    const schema = {
        visitorId: Joi.ObjectId().required(),
       visitorName: Joi.string().required(),
       status:Joi.string()
    };

    return Joi.validate(req, schema);
}

module.exports = router;