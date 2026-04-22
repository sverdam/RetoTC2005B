import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Company } from "clas-types";
import { getAllCompanies } from "../api/CompanyAPI";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ProductCatalog from "../components/ProductCatalog";
import CertificationCard from "../components/CertificationCard";
import Button from "../components/Button";

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

    useEffect(() => {
        const companies = location.state.company as Company
        setcompany(companies);
    }, [])

    !company ? navigate(`/error`) : null
    return(
        <div className="flex flex-col gap-5 items-center p-5 bg-white rounded-lg">
            <div className="flex w-full justify-end">
                <Button text="Editar" to="editar"/>
            </div>
            <img src="../src/assets/logoipsum.png" className="w-75"/>
            <h1 className="font-semibold text-3xl text-clas-negro">{company?.name}</h1>
            <div className="flex gap-2">
                {/*Mapeo filtros*/}
                <Tag value="Tier1" />
                <Tag value="Diseño e ingeniería" />
                <Tag value="Maquinaria" />
                <Tag value="Carroceria" />
                <Tag value="Interiores" />
            </div>
            <h2 className="text-xl font-medium text-clas-negro">
                {/* Descripcion de la empresa */}
                {company?.description}
            </h2>
            <div className="grid grid-cols-2 gap-15 p-5 items-center">
                <p className="text-left text-clas-negro">{company?.description} {/*Aquí va un text_module */}</p>
                <div className="flex flex-col gap-2 items-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15695.29597219136!2d-110.91489855!3d29.170230649999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce87d095decee9%3A0x856739bc6d718ca5!2sTecnol%C3%B3gico%20de%20Monterrey!5e1!3m2!1ses-419!2smx!4v1776732607196!5m2!1ses-419!2smx"></iframe>
                    <div className="flex gap-2">
                        <div className="flex gap-1 items-center">
                            <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
                                <PhoneIcon className="text-clas h-5 w-5"/>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold text-clas-negro">Detalles de Contacto</p>
                                <p className="font-thin text-clas-negro">+1 800-525-54-589</p>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
                                <EnvelopeIcon className="text-clas h-5 w-5"/>
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold text-clas-negro">Mándanos un e-mail</p>
                                <p className="font-thin text-clas-negro">info@clas.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-medium text-clas-negro">Producto / Servicio </h2>
            <ProductCatalog documentLink="..\src\assets\ManualCLAS.pdf" />
            <h2 className="text-xl font-medium text-clas-negro">Capacidades</h2>
            <p className="text-left text-clas-negro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin odio ligula, vestibulum id fringilla sit amet, consectetur at libero. In gravida 100% sed purus nec feugiat. In id cursus metus. In hac habitasse platea dictumst. Sed turpis lorem, ultricies vel elit ut, varius scelerisque magna. 2400 eget arcu eget arcu aliquam aliquet et eu arcu. Nam quis nulla quis dui dignissim placerat nec mattis mi. Integer nulla sapien, commodo eget erat eget, ultrices egestas massa. 
                Nulla interdum ornare arcu, ac lobortis ex porta in. Curabitur quis consectetur leo, sed porta magna. Nam tempor hendrerit quam, et eleifend tortor faucibus vitae.
            </p>
            <h2 className="text-xl font-medium text-clas-negro">Certificaciones</h2>
            <div className="flex flex-wrap gap-5">
                <CertificationCard name="IATF 16949" />
                <CertificationCard name="ISO 14001" />
                <CertificationCard name="ISO 45001" />
                <CertificationCard name="C-TPAT / OEA" />
            </div>
        </div>
    )
};

export default CompanyPage;