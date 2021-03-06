import express from 'express';
import multer from 'multer';
import path from 'path';
const  router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    __filename(req, file, cb) {
        cb(null, `${file.fieldName}-${Date.now()}${path.extname(file.originalName)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalName).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images Only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'),(req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;