const path = require('path')
const upload = (req, res, next) => {

    if (req.files) {
    const filess = req.files.Profile_pic;
    const uploadPath = path.join(__dirname, "..", '/uploads/', filess.name);
    const fileName = '/uploads/' + filess.name;
    res.filepath = fileName
    /* mv used for moving file */
    filess.mv(uploadPath, function (err, res) {
        // console.log(res);
        if (err)
            return res.status(500).send(err);
        next()
    })
    }

   
}


module.exports = upload;