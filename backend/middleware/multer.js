const multer = require('multer');

const MIME_TYPES = { //On genère les possibles extensions d'images
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({ //On enregistre les fichiers
    destination: (req, file, callback) => { //Destination
        callback(null, 'images');
    },
    filename: (req, file, callback) => { //Nom du fichier
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; //Extension
        callback(null, name + Date.now() + '.' + extension);
    },
});

module.exports = multer({ storage : storage }).single('image');