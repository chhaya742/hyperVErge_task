const yup = require("yup");

let schema = yup.object().shape({
    Name: yup.string().required(),
    Password: yup.string().required(),
    Email: yup.string().required().email(),
    Phone: yup.string().required()
});


// check validity
const isValid = (req, res, next) => {
    schema
    .validate(req.body)
        .then((valid) => {
            next();
        }).catch((err)=>{
            console.log(err.errors);
            res.send(err.errors)
        })
}

module.exports=isValid