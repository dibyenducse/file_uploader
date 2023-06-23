const express = require('express')
const multer = require('multer')


//file upload folder

const UPLOADS_FOLDER = './uploads/'

//prepare the final multer upload object
var upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(new Error("Only .jpeg and .pdf file format allowed!"))
        }
    }
})

const app = express();


app.post('/', upload.fields([
    { name: "avatar", maxcount: 3 },
    { name: "gallery", maxcount: 2 },
]), (req, res) => {
    res.send('hello world')
})

app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("there was an upload error")
        } else{res.status(500).send(err.message)}
        
    } else {
        res.send("success")
    }
})

app.listen(3000, () => {
    console.log('app is listening at port 3000')
})

