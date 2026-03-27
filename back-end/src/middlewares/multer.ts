import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    //modify destination for file
    destination: (req, file, cb) => {
        cb(null, 'files/temp' );
    },
    //modify updated filenames
    filename: (req, file, cb) => {
        if (req.body.type === 'image'){
            const ext = path.extname(file.originalname);
            cb(null, `img-${req.body.position}-${req.body.companyId}${ext}`);
        }
        else if(req.body.type === 'logo'){
            const ext = path.extname(file.originalname);
            cb(null, `logo-${req.body.position}-${req.body.companyId}${ext}`);
        }
        else{
            const ext = path.extname(file.originalname);
            cb(null, `document-${req.body.position}-${req.body.companyId}${ext}`);  
        }
    },
});

export const upload = multer({
    storage: storage,
    limits: {fileSize: 1000*1000*1000 /*max filesize in bytes */}
});

