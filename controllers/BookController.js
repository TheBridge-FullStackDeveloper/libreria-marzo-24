const { Book, Genre, GenreBook } = require("../models/index");

const BookController = {
  async create(req, res) {
    try {
      const book = await Book.create(req.body); //creamos libro
      book.addGenre(req.body.GenreId); //insertamos en la tabla intermedia (genreBooks)
      res.status(201).send({ msg: book.name + " creado con éxito", book });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async getAll(req,res){
    try {
        const books = await Book.findAll({
            include:[{ model: Genre,attributes:["name"], through: { attributes: [] } }]
        })
        res.send(books)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
  },
  async delete(req, res) {
    try {
        await Book.destroy({
            where: {
                id: req.params.id
            }
        })
        await GenreBook.destroy({
            where: {
                BookId: req.params.id
            }
        })
        res.send({ msg: 'El libro se ha eliminado con éxito'})
    }
     catch (error) {
        console.log(error)
    }
  },
  async update(req, res) {
    try {
      await Book.update(req.body,
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const book = await Book.findByPk(req.params.id)
      book.setGenres(req.body.GenreId);
      res.send("Libro actualizado con éxito");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "no ha sido posible actualizado el libro" });
    }
  },

};

module.exports = BookController;
