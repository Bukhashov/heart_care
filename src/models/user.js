const {Schema, model} = require('mongoose');

const user = new Schema({
    lastname:   {type: String},
    firstnaem:  {type: String},
    email:      {type: String},
    password:   {type: String},
});

module.exports = model('users', user);