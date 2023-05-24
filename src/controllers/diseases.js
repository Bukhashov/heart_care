const modelDiseses = require('../models/diseases');

class Diseses {
    getAll =  async (req, res) => {

        const allDiseses = await modelDiseses.find({}, {_id: 1, name: 1, problems: 1});
        
        console.log(allDiseses)
        res.status(200).json(allDiseses);
    }
    getById = async (req, res) => {
        const {id} = req.params;

        const dises = await modelDiseses.findById(id);

        res.status(200).json(dises);
    }
}

module.exports = new Diseses;