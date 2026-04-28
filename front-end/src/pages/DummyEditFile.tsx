
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { createFileModule } from "../api/fileModuleAPI";

interface FileCompoundInput{
    file: File, // <- Actual file
    type: 'logo' | 'document' | 'product' | 'image', 
    position: number, // <- any number
    companyId: number
}

const DummyEditFile: React.FC = () => 
{
    const [fileMod, setFileMod] = useState<FileCompoundInput | null>(null);
    const companyId = 2;

    {/* Logo Handling */}
    const handleLogoSelect = (file: File) => {
        console.log(file);
        setFileMod({
            file: file,
            type: 'logo',
            position: 0,
            companyId: companyId
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SUBMIT");
        if (fileMod === null) return;
        createFileModule({
            type: fileMod.type, 
            position: fileMod.position, 
            companyId: fileMod.companyId
        }, fileMod?.file);
    }

    return (
        <div className="flex flex-col items-center justify-center p-5 gap-3 w-full">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-2xl">
                    <label className="font-semibold text-clas-negro">Logo</label>
                    <FileUpload onFileSelect={handleLogoSelect} />
                </div>
                
                <div className="mt-4">
                    <button className="bg-clas text-white font-semibold rounded-lg px-2 py-1 hover:bg-clas-claro">
                        Aplicar Cambios
                    </button>
                </div>

            </form>
        </div>
    )
}

export default DummyEditFile;