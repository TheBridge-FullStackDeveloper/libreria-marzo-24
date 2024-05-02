const { Genre } = require("../models/index");

const GenreController = {
    async create(req,res){
        try {
            const genre = await Genre.create(req.body)
            res.status(201).send({msg:"Género creado con éxito",genre})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
};

module.exports = GenreController;
