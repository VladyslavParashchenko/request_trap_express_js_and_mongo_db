const Request = require("../models").Request
module.exports = {
    create(req, res){
        return Request
            .create(
                {
                    cookies: JSON.stringify(req.cookies),
                    headers: JSON.stringify(req.headers),
                    schema: req.protocol,
                    method: req.method,
                    params: req.method == "GET" ? req.params : req.body,
                    remote_ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
                    query: req.protocol + "://" + req.get("host") + req.originalUrl,
                    request_id: req.params.request_id
                })
            .then((request) => {
                res.render("request", {title: "Request was saved", request: JSON.stringify(request, null, 4)})
                console.log(JSON.stringify(request))
                req.io.emit("newRequest", {"request": JSON.stringify(request, null, 4)})
            }
            )
            .catch((error) => res.status(400).send(error))
    },

    index(req, res){
        return Request
            .findAll({where: {request_id: req.params.request_id }})
            .then((request) => { res.render("request_list", {title: "Requests list",requests: request})})
    }
}
