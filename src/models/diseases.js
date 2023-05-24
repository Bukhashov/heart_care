const {Schema, model} = require('mongoose');

const diseses = new Schema({
    // Дәрінін аты :: Нурофен
    name:                   {type: String},
    // Аурудын туындауы
    problems:               {type: String},
    // Емдеу жолдары
    waysOfTreatment:        {type: String},
    // Жаттығу түрлері
    TypesOfExercise:        {type: String},
});

module.exports = model('diseses', diseses);