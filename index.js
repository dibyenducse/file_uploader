const express = require('express')
const multer = require('multer')


//file upload folder

const UPLOADS_FOLDER = './uploads/'

//prepare the final multer upload object
var upload = multer({
    dest: UPLOADS_FOLDER
})

const app = express();


app.post('/', upload.fields([
    { name: "avatar", maxcount: 3 },
    { name: "gallery", maxcount: 2 },
]), (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log('app is listening at port 3000')
})

