// Esqueleto para Company Page cuando sea usuario admin de empresa
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Company } from "clas-types";
import { getAllCompanies } from "../api/CompanyAPI";
import { PhoneIcon, EnvelopeIcon} from "@heroicons/react/24/solid";
import { InformationCircleIcon, PlusIcon, TrashIcon, PencilIcon} from "@heroicons/react/24/outline";
import ProductCatalog from "../components/ProductCatalog";
import CertificationCard from "../components/CertificationCard";
import FileUpload from "../components/FileUpload";
import FilterModal from "../components/FilterModal";
import NewCertificationModal from "../components/NewCertificationModal";
import NewContactModal from "../components/NewContactModal";
import DeleteCompanyConfirmModal from "../components/DeleteCompanyConfirmModal";
import { deleteCompany } from "../api/CompanyAPI";

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
   
    {/* File Handling */}
    const handleFileSelect = (file: File) => {
        console.log(file);
    };
    {/* Filter Modal  */}
    const [isOpen, setIsOpen] = useState(false);

    {/* Certification Modal */}
    const [isCertificationOpen, setIsCertificationOpen] = useState(false);

    {/* Contact Modal */}
    const [isContactOpen, setIscontactOpen] = useState(false);

    {/* Navigate */}
    const navigate = useNavigate();
    {/* access id parameter from current URL*/}
    const { id } = useParams<{ id: string }>();

    {/* Obtain data */}

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

    const handleDelete = () => {
        if(!companyToDelete) return;
        deleteCompany(companyToDelete.id).then(() => {
          setCompanyToDelete(null);
        });
      };

    return(
    <div className="flex flex-col items-center justify-center p-5 gap-3 w-full">
        <h1 className="text-xl font-medium text-clas-negro">Editar Empresa</h1>
        {/* Subir Archivo de Logo*/}
        <div className="flex flex-col items-start p-2 w-2xl">
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
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Descripción ejecutiva / eslogan</label>
            <input 
                type="text" 
                placeholder="Descripción ejecutiva..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"></input>
        </div>
        {/* Descripcion larga */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Descripción
            </label>
            <input 
                type="text" 
                placeholder="Descripción..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
        </div>
        {/* Ubicacion */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <div className="flex gap-2 items-center">
                <label className="font-semibold text-clas-negro">
                    Ubicación
                </label>
                {/* TODO: Agregar info de como obtener el link de embebido */}
                <InformationCircleIcon className="text-clas-negro h-5 w-5"/>
            </div>
            <input 
                type="text" 
                placeholder="Link de embebido..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
            {/* Hacer que lo que se obtenga del input del link se muestre en el iframe */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15695.29597219136!2d-110.91489855!3d29.170230649999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce87d095decee9%3A0x856739bc6d718ca5!2sTecnol%C3%B3gico%20de%20Monterrey!5e1!3m2!1ses-419!2smx!4v1776732607196!5m2!1ses-419!2smx"
            className="rounded-lg"
            width="672"
            height="450"
            >
            </iframe>
        </div>
        {/* Catalogo */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Catálogo de Productos / Servicios
            </label>
            <FileUpload onFileSelect={handleFileSelect} />
        </div>
        {/* Capacidades */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Capacidades
            </label>
            <input 
                type="text" 
                placeholder="Capacidades de producción y/o servicio..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
        </div>
        {/* Certificaciones */}
        <div className="flex flex-col gap-2 items-start">
            <label className="font-semibold text-clas-negro">
                Certificaciones
            </label>
            {/* TODO: MAPEO DE CERTIFICACIONES */}
            <div className="flex flex-wrap gap-5">
                <CertificationCard name="IATF 16949" />
                <CertificationCard name="ISO 14001" />
                <CertificationCard name="ISO 45001" />
                <CertificationCard name="C-TPAT / OEA" />
                <div className=" flex flex-col flex-wrap justify-center items-center rounded-lg border border-clas bg-clas w-30 h-30 p-2">
                    {/* Hacer Modal de agregar certificaciones y hacer que funcione el boton de agregar */}
                    <button className="hover:bg-clas-claro"
                        onClick={() => setIsCertificationOpen(true)}
                    >
                        <div className="rounded-full w-7 h-7 border border-white m-1">
                            <PlusIcon className="text-white p-1"/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        {/* Contactos */}
        <div className="w-2xl">
            <label className="font-semibold text-clas-negro">
                Contactos
            </label>
            <div className="w-full flex justify-end">
                <button className="my-2 flex items-center gap-2 bg-clas text-white font-semibold rounded-lg px-2 hover:bg-clas-claro"
                    onClick={() => setIscontactOpen(true)}
                >
                    Nuevo Contacto
                    <PlusIcon className="h-4 w-4"/>
                </button>
            </div>
            
            <div className="rounded-md border-2 border-clas/50">
                <table className="min-w-full">
                    <thead className="bg-clas/30">
                        <tr>
                            <th className="text-clas-negro">Puesto</th>
                            <th className="text-clas-negro">Contacto</th>
                            <th className="text-clas-negro">Editar</th>
                            <th className="text-clas-negro">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-clas-negro text-center">Ventas</td>
                            <td className="text-clas-negro text-center">ventas@ford.com</td>
                            <td className="p-2">
                                <div className="flex justify-center text-clas">
                                    <PencilIcon className="h-4 w-4"/>
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex justify-center text-red-400">
                                    <TrashIcon className="h-4 w-4"/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="m-5 flex w-2xl gap-3 justify-end">
            <button className="bg-white border-2 border-clas-negro/70 text-clas-negro/70 font-semibold rounded-lg px-2 py-1 hover:bg-clas-negro/20">Cancelar</button>
            <button className="bg-red-400 text-white font-semibold rounded-lg px-2 py-1 hover:bg-red-700"
                onClick={()=> setCompanyToDelete(company)}
            >
                Eliminar Empresa
            </button>
            <button className="bg-clas text-white font-semibold rounded-lg px-2 py-1 hover:bg-clas-claro">Aplicar Cambios</button>
        </div>
        
        <FilterModal 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
        />
        <DeleteCompanyConfirmModal 
            company={companyToDelete}
            onClose={() => setCompanyToDelete(null)}
            onConfirm={handleDelete}
        />
        
        <NewCertificationModal 
            isCertificationOpen={isCertificationOpen}
            onClose={() => setIsCertificationOpen(false)}
        />

        <NewContactModal 
            isContactOpen={isContactOpen}
            onClose={() => setIscontactOpen(false)}
        />
    </div>
   )
};

export default EditCompanyPage;