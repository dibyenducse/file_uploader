const express = require('express')
const multer = require('multer')
const path = require("path")


//file upload folder

const UPLOADS_FOLDER = './uploads/'


//define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase().split(" ")
            .join("-") + "-" + Date.now()
        
        cb(null, fileName + fileExt)
    },
})

//prepare the final multer upload object
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === "avatar") {
            if (file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(new Error("Only .jpeg file format allowed!"))
            } 
        } else if (file.fieldname === "gallary") {
            if (file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only .pdf file format allowed!"))
            } 
        } else {
            cb(new Error("There was an unknown error"))
        }
        
    }
})

const app = express();


app.post('/', upload.fields([
    { name: "avatar", maxcount: 3 },
    { name: "gallary", maxcount: 2 },
]), (req, res) => {
    console.log(req.files)
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

