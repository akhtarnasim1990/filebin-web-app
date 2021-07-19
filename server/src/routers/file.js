const express = require('express');
const router = new express.Router();
const File = require('../models/file');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../files-uploaded')
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20000000
    }
}).single('uploadFile');

router.post('/upload', (req, res) => {

    try {
        upload(req, res, (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log(req.file.originalname)
                console.log(req.file.filename)
                const new_file = new File()
                new_file.file_name = req.file.originalname
                new_file.URL_key = `localhost:5000/download/${req.file.filename}`
                new_file.save().then(() => {
                    console.log(new_file)
                }).catch((error) => {
                    console.log('Error', error)
                })
                res.status(200).send(req.file)
                console.log(req.file)
            }
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/download/:file(*)', (req, res) => {
    let file = req.params.file;
    let fileLocation = path.join('./files-uploaded', file);
    console.log(fileLocation);
    res.download(fileLocation, file, (error) => {
        if (error) {
            console.log(error)
        } else {
            fs.unlink(fileLocation, (error) => {
                try {
                    if (error) {
                        throw new Error("File have been downloaded!")
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    });
});

module.exports = router
