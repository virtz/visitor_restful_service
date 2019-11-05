const moment = require('moment');
const mongoose = require('mongoose');
const dateTime = require('date-and-time');
const Joi = require('joi');

function timeIn(){
const now = new Date;
// return dateTime.format(now,'YYYY/MM/DD HH:mm');
var now2 = moment(now).add(1,"hours").format('MMMM Do YYYY, h:mm a');
return now2;

}

 const visitorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
    },
    address:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 255,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    purpose:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 255,
    },
   
    timeIn:{
        type:String,
        required:true,
        default:timeIn(),
    },
    timeOut:{
        type:String,
    },
     who:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    },
    status:{
        type:String,
        default:"Neutral"
    }
});

visitorSchema.statics.lookup = function(visitorId,visitorName){
    return  this.findOne({
      'visitor._id':visitorId,
      'visitor.name':visitorName,
    });
}
visitorSchema.methods.return = function(){
    this.timeOut= new Date.UTC
    var now2 = moment(this.timeOut).format('MMMM Do YYYY, h:mm a');
    return now2
}
const Visitor = mongoose.model('Visitor',visitorSchema);

function validateVisitor(visitor){
    const schema = {
        name:Joi.string().min(5).max(255).required(),
        address:Joi.string().min(5).max(255).required(),
        phone:Joi.string().min(5).max(255).required(),
        purpose:Joi.string().min(5).max(255).required(),
        timeIn:Joi.date().min(5).max(255),
        who:Joi.string().min(5).max(255).required(),
        status:Joi.string()
    }
    return Joi.validate(visitor,schema);
}
exports.Visitor = Visitor;
exports.validate = validateVisitor;
