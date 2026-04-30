// sophhh
import {useState} from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

interface Props {
    onFileSelect: (file: File) => void;
    width?: string;
    required?: boolean;
};

const FileUpload: React.FC<Props> = ({ onFileSelect, width = "w-full", required = false }) => {

    const [fileName, setFileName] = useState< string | null >(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return(
        <div className={width}>
            <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-clas-gris rounded-lg cursor-pointer hover:bg-clas-gris/20 transition"
            >
                <input 
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    required={required}
                    onChange={handleChange}
                />
                <div className="flex flex-col items-center gap-2">
                    <div>
                        <DocumentArrowUpIcon className="h-7 w-7 text-clas-gris"/>
                    </div>
                    <span className="text-clas-negro font-medium">
                        {fileName ? fileName : "Sube tu archivo"}
                    </span>
                    <span className="text-sm text-clas-negro">
                        Haz click para seleccionar
                    </span>
                </div>

            </label>
        </div>
    )
}   

export default FileUpload;