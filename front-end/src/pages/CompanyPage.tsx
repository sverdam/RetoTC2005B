import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Company, UserProfile } from "clas-types";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ProductCatalog from "../components/ProductCatalog";
import CertificationCard from "../components/CertificationCard";
import Button from "../components/Button";
import { getProfile } from "../api/LoginAPI";

const unverifiedUser : UserProfile = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
    companyMemberType: 'none',
    role: 'unverified'
}

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

const CompanyPage: React.FC = () => {
    {/* TODO: Hacer que se vea la info de la empresa seleccionada desde el directorio */}
    
    const location = useLocation();
    const navigate = useNavigate();
    const [company, setcompany] = useState<Company>();
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
        

    useEffect(() => {
        const companies = location.state.company as Company
        setcompany(companies);
        
        getProfile().then((profile: UserProfile) => setUserProfile(profile))
    }, [])

    !company ? navigate(`/error`) : null
    return(
        <div className="flex flex-col gap-5 items-center p-5 bg-white rounded-lg">
            {(userProfile.role === "admin" && (userProfile.companyMemberType === "Admin" || userProfile.companyId === company?.id)) ?
            <div className="flex w-full justify-end">
                <Button text="Editar" to="editar"/>
            </div> : <></>
            }
            <img src={!company?.logo ? "../src/assets/logoipsum.png" : `http://localhost:3000/fileModule/files/${company.logo.id}`} className="w-75"/>
            <h1 className="font-semibold text-3xl text-clas-negro">{company?.name}</h1>
            {company?.filters != null ? 
            <div className="flex gap-2">
                {/*Mapeo filtros*/}
                {company?.filters?.map((f) => (
                <Tag value= {f.name} />
                ))}
            </div> : <></>}
            {!company?.textModules?.find( t => t.id === 1) ? 
            <></>
            : 
            <h2 className="text-xl font-medium text-clas-negro">
                {/* Descripcion de la empresa */}
                {String(company?.textModules?.find(t => t.id === 1)?.text) || "No hay textmodule 1"}
            </h2>
}
            <div className="grid grid-cols-2 gap-15 p-5 items-center">
                {company?.textModules?.find(t => t.id === 2) ? 
                <p className="text-left text-clas-negro">{String(company?.textModules?.find(t => t.id === 2)?.text)} {/*Aquí va un text_module */}</p>
                : <></>}
                <div className="flex flex-col gap-2 items-center">
                    {!company?.location ? 
                    <></>:
                    <iframe
                        src={company.location.link}
                        title="Location"
                        className="rounded-xl"
                    >
                    </iframe>
                    }
                    
                    <div className="flex gap-2">
                        <div className="flex gap-1 items-center">
                            <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
                                <PhoneIcon className="text-clas h-5 w-5"/>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold text-clas-negro">Detalles de Contacto</p>
                                <p className="font-thin text-clas-negro">{company?.contact?.find(c => c.type ==="phone")?.contactInfo || "No se encontró telefono"}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
                                <EnvelopeIcon className="text-clas h-5 w-5"/>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold text-clas-negro">Mándanos un e-mail</p>
                                <p className="font-thin text-clas-negro">{company?.contact?.find(c => c.type === "email")?.contactInfo || "No se encontró mail disponible" }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {company?.catalogo ? 
            <>
            <h2 className="text-xl font-medium text-clas-negro">Producto / Servicio </h2>
            <ProductCatalog documentLink={ company?.catalogo != null ? `http://localhost:3000/filemodule/files/${company.catalogo.id}` :"..\src\assets\ManualCLAS.pdf"} /> </>
            : <></>}
            {company?.certifications ? 
            <>
            <h2 className="text-xl font-medium text-clas-negro">Capacidades</h2>
            <p className="text-left text-clas-negro">{String(company?.textModules?.find(c => c.id === 3)?.text) || "No hay text module 3"}
            </p>
            </>
            : <></>}
            {company?.certifications ? 
            <>
            <h2 className="text-xl font-medium text-clas-negro">Certificaciones</h2>
            <div className="flex flex-wrap gap-5">
                {company?.certifications?.map( (c) => (
                <CertificationCard name={c.name} />
                )) || "No hay certificaciones"}
            </div>
            </> 
            : <></>    }
            {/* TODO: HACER QUE SE VEAN LOS CONTACTOS DE LA EMPRESA!!  */}
            <div className="rounded-md border-2 border-clas/50">
                <table className="min-w-full">
                    <thead className="bg-clas/30">
                        <tr>
                            <th className="text-clas-negro">Puesto</th>
                            <th className="text-clas-negro">Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company?.contact?.map( c => (
                            <>
                        <tr>
                            <td className="text-clas-negro text-center">{c.position}</td>
                            <td className="text-clas-negro text-center">{c.contactInfo}</td>
                            
                        </tr>
                        </>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CompanyPage;