var express = require("express")
var router = express.Router()
const requestController = require("../controllers").request
/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" })
})
router.get("/:request_id(*)/request_list", requestController.index)
router.all("/:request_id(*)", requestController.create)
module.exports = router
