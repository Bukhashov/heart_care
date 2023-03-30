const {Schema, model} = require('mongoose');

const med = new Schema({
    lastname:   {type: String},
    firstnaem:  {type: String},
    email:      {type: String},
    password:   {type: String},
});

module.exports = model('medes', med);