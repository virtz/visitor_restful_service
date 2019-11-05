const express = require('express');
const config = require('config')
const winston = require('winston')
const mongoose = require('mongoose');
const visitors = require('./routes/visitors');
const users = require('./routes/users');
const auth = require('./routes/auth');
const signout = require('./routes/signout');
const userstatus = require('./routes/userStatus');
const visitorstatus = require('./routes/visitorStatus');
const app = express();


require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/prod')(app);


app.use(express.json());
app.use('/api/visitors', visitors);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/signout', signout);
app.use('/api/userstatus', userstatus);
app.use('/api/visitorstatus', visitorstatus);

const port = process.env.PORT || 5000;
app.listen(port, () => winston.info(`Listening on port ${port}`));