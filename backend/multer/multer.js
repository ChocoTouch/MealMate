// Upload d'image
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, callback) =>{
		callback(null, 'Images')
	},
	filename: (req,file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

exports.upload = multer({
	storage: storage,
	limits: { fieldSize: 10 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|png|jpg|gif/
		const mimeType = fileTypes.test(file.mimetype)
		const extname = fileTypes.test(path.extname(file.originalname))
		if ( mimeType && extname) {
			return cb(null,true)
		}
		cb('Give proper files format to upload')
	}
})