const express = require("express")
const BookController = require("../controllers/BookController")
const router = express.Router()

router.post("/",BookController.create)
router.get("/",BookController.getAll)
router.delete("/id/:id",BookController.delete)
router.put("/id/:id",BookController.update)

module.exports = router