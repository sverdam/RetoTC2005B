
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import FileUpload from "../components/FileUpload";
import { createFileModule } from "../api/fileModuleAPI";

interface FileCompoundInput {
    file: File, // <- Actual file
    type: 'logo' | 'document' | 'product' | 'image',
    position: number, // <- any number
    companyId: number
}

const DummyGalleryEditFile: React.FC = () => {
    const { id } = useParams();
    const companyId = Number(id)
    const [fileMod, setFileMod] = useState<FileCompoundInput | null>(null);
    const [pos, setPos] = useState<number>(0);


    {/* Logo Handling */ }
    const handleLogoSelect = (file: File) => {
        //console.log(file);
        setFileMod({
            file: file,
            type: 'logo',
            position: 0,
            companyId: companyId
        });
    };

    const handlePosition = (newPosition: number | string) => {
        //console.log(newPosition);
        setPos(Number(newPosition));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SUBMIT");
        if (fileMod === null) return;
        createFileModule({
            type: fileMod.type,
            position: fileMod.position,
            companyId: fileMod.companyId
        }, fileMod?.file).then(() => console.log("Yey"))
            .catch(() => console.log("Not"))
            .finally(() => console.log("Finally"));
    }

    useMemo(() => {
        if (fileMod === null) return;
        setFileMod({
            file: fileMod.file,
            type: 'image',
            position: pos,
            companyId: companyId
        });
    }, [pos])


    return (
        <div className="flex flex-col items-center justify-center p-5 gap-3 w-full">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-2xl">
                    <label className="font-semibold text-clas-negro">Imagen para galería</label>
                    <FileUpload id="gallery-upload" onFileSelect={handleLogoSelect} />
                </div>

                <div className="flex flex-col items-start w-2xl">
                    <label className="font-semibold text-clas-negro">Position</label>
                    <input type="text" onChange={e => handlePosition(e.target.value)}
                        value={pos}
                        placeholder="Link de embebido..."
                        className="w-2xl border-2 border-clas-gris rounded-lg p-2" />
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

export default DummyGalleryEditFile;