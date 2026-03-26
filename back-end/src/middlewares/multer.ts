import multer from "multer";
import path from "node:path";
//To Do:
//poner una carpeta temporal para guardar archivos ahi en lo que se obtienen datos para hacer el guardado despues del procesamiento y asi no importa el orden de los atributos en el body
    //actualmente si en el body se pone primero el file antes que los atributos multer no lo detecta y estos datos quedan undefined
//talves valga la pena pensar en un mejor formato para el nombre de los archivos

const storage = multer.diskStorage({
    //modify destination for file
    destination: (req, file, cb) => {
        if (req.body.type === 'image'){
            cb(null, 'files/images' );
        }
        else if (req.body.type === 'logo'){
            cb(null, 'files/logos');
        }
        else{
            cb(null, 'files/documents');
        }
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

