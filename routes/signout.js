const Joi = require('joi');
const { Visitor } = require('../models/visitor');
const validator = require('../middleware/validate');
const moment = require('moment');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

Joi.ObjectId = require('joi-objectid')(Joi);

router.post('/', [ validator(validateSignOut)], async (req, res) => {
    let visitor = await Visitor.find({'visitorId':req.body.visitorId,'visitorName':req.body.visitorName});

    if (!visitor) return res.status(404).send('Visitor not found.');

    if (visitor.timeOut) return res.status(400).send('Visitor already signed out.');


    var timeOut = time();
    visitor = await Visitor.update({ _id: req.body.visitorId},  {$set:{ timeOut: timeOut }}
    ,);
    return res.send(visitor);
    
});
function validateSignOut(req) {
    const schema = {
        visitorId: Joi.ObjectId().required(),
       visitorName: Joi.string().required(),
    };

    return Joi.validate(req, schema);
}
function time() {
    var now = new Date;
    var now2 = moment(now).add(1,'hours').format('MMMM Do YYYY, h:mm: a');
    return now2
}


module.exports = router;