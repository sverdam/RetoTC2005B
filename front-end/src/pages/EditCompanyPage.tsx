// Esqueleto para Company Page cuando sea usuario admin de empresa
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Company } from "clas-types";
import { getAllCompanies } from "../api/CompanyAPI";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ProductCatalog from "../components/ProductCatalog";
import CertificationCard from "../components/CertificationCard";
import FileUpload from "../components/FileUpload";
import { Button } from "@headlessui/react";
import FilterModal from "../components/FilterModal";

interface TagProps {
    value:string;
}

const Tag: React.FC<TagProps> = ({value}) => {
    return(
        <div className="bg-white border border-clas-gris py-2 px-4 rounded-full">
            <p className="text-clas-negro">{value}</p>
        </div>
    )
};

const EditCompanyPage: React.FC = () => {
   
    const handleFileSelect = (file: File) => {
        console.log(file);
    };
    const [isOpen, setIsOpen] = useState(false);

    return(
    <div className="flex flex-col items-center justify-center p-5 gap-3">
        <h1 className="text-xl font-medium text-clas-negro">Editar Empresa</h1>
        {/* Subir Archivo de Logo*/}
        <div className="flex flex-col items-start p-2">
            <label className="font-semibold text-clas-negro">Logo</label>
            <FileUpload onFileSelect={handleFileSelect} />
        </div>
        <h2 className="font-semibold text-3xl text-clas-negro">Nombre de la Empresa Aqui</h2>
        {/* Filtros */}
        <div className="flex gap-2">
            {/*TODO: Mapeo filtros*/}
            <Tag value="Tier1" />
            <Tag value="Diseño e ingeniería" />
            <Tag value="Maquinaria" />
            <Tag value="Carroceria" />
            <Tag value="Interiores" />
            <button
                onClick={() => setIsOpen(true)} 
                className=" w-15 bg-clas rounded-4xl py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                +
            </button>
        </div>
        {/* Descripcion ejecutiva / eslogan */}
        <div className="flex flex-col gap-2 items-start">
            <label className="font-semibold text-clas-negro">Descripción ejecutiva / eslogan</label>
            <input 
                type="text" 
                placeholder="Descripción ejecutiva..." 
                className="w-md border-2 border-clas-gris rounded-lg p-2"></input>
        </div>
        {/* Descripcion larga */}
        <div className="flex flex-col gap-2 items-start">
            <label className="font-semibold text-clas-negro">
                Descripción
            </label>
            <input 
                type="text" 
                placeholder="Descripción..." 
                className="w-md border-2 border-clas-gris rounded-lg p-2"></input>
        </div>

        <FilterModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
        />
    </div>
   )
};

export default EditCompanyPage;