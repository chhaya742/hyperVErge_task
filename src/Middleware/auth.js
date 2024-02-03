
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

authentication = (req, res, next) => {

    const token = req.headers?.authorization?.split(' ')[1];
    if (req.headers?.authorization == undefined || token == undefined) {
        res.send({
            succses: 0,
            message: "you are not authorized for this action"
        })
    }
    else {
        jwt.verify(token, 'chhayabagwan', (err, tokendata) => {
            if (err) {
                console.log(err);
                res.send({ message: "authentication  erro" });
            }
            else if (tokendata == undefined) {
                res.send({ message: "authentication error" })
            }
            else {
                res.tokendata = tokendata
                next()
            }

        })
    }

}
module.exports = authentication