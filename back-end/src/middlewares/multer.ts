import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    //modify destination for file
    destination: (req, file, cb) => {
        cb(null, 'files/temp' );
    },
    //TO DO: filename should be done afterwards in services leave a random or default name here meanwhile
    filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Math.floor(Math.random()*100000000)}${ext}`);
    }
});

export const upload = multer({
    storage: storage,
    limits: {fileSize: 1000*1000*1000 /*max filesize in bytes */}
});

