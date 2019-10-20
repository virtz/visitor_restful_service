const date = require('date-and-time');
const moment = require('moment');

module.exports = function time(){
    var now = new Date;
    var now2 = moment(now).format('MMMM Do YYYY, h:mm:ss a');
    return now2
};
