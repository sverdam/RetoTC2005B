// Esqueleto para Company Page cuando sea usuario admin de empresa
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Company, Product, Contact, NewContactInput, NewCompanyInput, Filter, UserProfile } from "clas-types";
import { deleteCompany, createCompany, getCompanybyId } from "../api/CompanyAPI";
import { PhoneIcon, EnvelopeIcon} from "@heroicons/react/24/solid";
import { InformationCircleIcon, PlusIcon, TrashIcon, PencilIcon} from "@heroicons/react/24/outline";
import ProductCatalog from "../components/ProductCatalog";
import CertificationCard from "../components/CertificationCard";
import FileUpload from "../components/FileUpload";
import FilterModal from "../components/FilterModal";
import NewCertificationModal from "../components/NewCertificationModal";
import NewContactModal from "../components/NewContactModal";
import DeleteCompanyConfirmModal from "../components/DeleteCompanyConfirmModal";
import ProductModal from "../components/ProductModal";
import DeleteProductConfirmModal from "../components/DeleteProductConfirmModal";
import DeleteContactConfirmModal from "../components/DeleteContactConfirmModal";
import { getProfile } from "../api/LoginAPI";


const unverifiedUser : UserProfile = {
    id: "-1",
    email: 'unknown',
    companyId: -1,
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

const emptyFormCompany: NewCompanyInput = {
        name: "",
        description: "",
        aboutUs: "",
        tier: null,
        logo: null,
        catalogo: null,
        memberType: null,
        website: "",
        slogan: "",
        employees: null,
        pieces: null,
        space: null,
        capacity: "",
        color: "",
        location: null,
        contacts: [],
        user: [],
        textModules: [], 
        fileModules: [],
        certifications: [],
        filters: [],
        products: [],
        services: []
}


const EditCompanyPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const isEditing = id !==undefined;
    const [formCompany, setFormCompany] = useState<NewCompanyInput>(emptyFormCompany)
    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
    
   
    {/* Filter Modal  */}
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<Filter[]>([]);
    {/* Certification Modal */}
    const [isCertificationOpen, setIsCertificationOpen] = useState(false);
    {/* Contact Modal */}
    const [isContactOpen, setIscontactOpen] = useState(false);
    {/* Product Modal */}
    const [isProductOpen, setIsProductOpen] = useState(false);

    {/* Obtain data */}
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    
    const [isContactDeleteOpen, setIsContactDeleteOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);


    {/* Logo Handling */}
    const handleLogoSelect = (file: File) => {
        console.log(file);
    };

    const handleFilter = (newFilters: Filter[]) => {
        handleChange("filters", newFilters)
    }
    const handleChange = (field:keyof NewCompanyInput, value: any) => {
        setFormCompany((prev) => ({...prev, [field]: value}));
    }

    {/* Product Image Handling */}
    const handleProductImageSelect = (file: File) => {
        console.log(file);
    };

    {/* Catalog Handling */}
    const handleCatalogSelect = (file: File) => {
        console.log(file);
    };

    const handleDelete = () => {
        if(!companyToDelete) return;
        deleteCompany(companyToDelete.id).then(() => {
          setCompanyToDelete(null);
        });
    };

    const handleProductDelete = () => {
        if(!productToDelete) return;
        //TODO: Agregar API de producto
        deleteProduct(productToDelete.id).then(() => {
          setProductToDelete(null);
        });
    };

    const handleContactDelete = () => {
        if(!contactToDelete) return;
        //TODO: Agregar API de contacto
        deleteContact(contactToDelete.id).then(() => {
          setContactToDelete(null);
        });
    };


    useEffect(()=>{
       
        if(isEditing){
            if(location.state?.company){
            const company = location.state.company as Company;
            console.log(company)
            setFormCompany ({
                name: company.name,
                description: company.description,
                aboutUs: company.aboutUs,
                tier: company.tier,
                logo: company.logo,
                catalogo: company.catalogo,
                memberType: company.memberType,
                website: company.website,
                slogan: company.slogan,
                employees: company.employees,
                pieces: company.pieces,
                space: company.space,
                capacity: company.capacity,
                color: company.color,
                location: company.location,
                contacts: company.contacts,
                user: company.user,
                textModules: company.textModules, 
                fileModules: company.fileModules,
                certifications: company.certifications,
                filters: company.filters,
                products: company.products,
                services: company.services
            })}else{
                getCompanybyId(Number(id)).then(data => setFormCompany(data))
             }
            }

        getProfile().then((profile: UserProfile) => setUserProfile(profile))
        },[])


    return(
    <div className="flex flex-col items-center justify-center p-5 gap-3 w-full">
        <h1 className="text-xl font-medium text-clas-negro"> {isEditing ? "Editar Empresa" : "Crear Empresa" }</h1>
        {/* Subir Archivo de Logo*/}
        <div className="flex flex-col items-start w-2xl">
            <label className="font-semibold text-clas-negro">Logo</label>
            <FileUpload onFileSelect={handleLogoSelect} />
        </div>
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Nombre de la empresa</label>
            <input 
                required
                type="text" 
                placeholder="Nombre..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                value = {formCompany.name}
                onChange={(e) => handleChange("name", e.target.value || "")}>    
            </input>
        </div>
        {/* Tier y MemberType*/}
        <div className="flex w-2xl justify-between">
            <div className="flex flex-col gap-2 items-start w-3xs">
                <label className="font-semibold text-clas-negro">Tier</label>
                <select  
                    className="border-2 border-clas-gris rounded-lg p-2 w-3xs"
                    required
                    value={formCompany.tier != null ? formCompany.tier:10}
                    onChange={(e) => handleChange("tier", e.target.value)}
                    >
                    <option
                        value={10} disabled>
                        Selecciona un tier..
                    </option>
                    <option 
                        value={0}>
                        OEM
                    </option>
                    <option
                        value={1}>
                        Tier 1
                    </option>
                    <option
                        value={2}>
                        Tier 2
                    </option>
                </select>
            </div>
            {userProfile.role === "admin" ?
            <div className="flex flex-col gap-2 items-start w-3xs">
                <label className="font-semibold text-clas-negro">Tipo de Miembro</label>
                <select  
                    className="border-2 border-clas-gris rounded-lg p-2 w-3xs"
                    required
                    value={formCompany.memberType != null ? formCompany.memberType : ""}
                    onChange={ (e) => handleChange("memberType", e.target.value)}
                >
                    <option
                        value={""} disabled>
                        Selecciona un tipo...
                    </option>
                    <option
                    value={"Affiliate"}>
                        Afiliado
                    </option>
                    <option
                    value={"Associate"}>
                        Asociado
                    </option>
                </select>
            </div>
            : <></>}
        </div>
        
        {/* Filtros */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Etiquetas</label>
            <div className="flex flex-wrap gap-2">
                {/*TODO: Mapeo filtros*/}
                {formCompany.filters?.map( e => <Tag value={e.name}/>)}
                <button
                    onClick={() => setIsOpen(true)} 
                    className=" w-15 bg-clas rounded-4xl py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                    +
                </button>
            </div>
        </div>
        
        {/* Descripcion ejecutiva / eslogan */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Descripción ejecutiva / eslogan</label>
            <input 
                type="text" 
                value={formCompany.slogan}
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
        {/* Sitio Web */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Link a sitio Web</label>
            <input 
                type="text" 
                placeholder="Sitio web..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"></input>
        </div>
        {/* Color de Compania */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">Color de Compañía</label>
            <input 
                type="text" 
                placeholder="#ffffff" 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"></input>
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
            <FileUpload onFileSelect={handleCatalogSelect} />
        </div>
        {/* Productos */}
        <div className="w-2xl">
            <div className="flex justify-start">
                <label className="font-semibold text-clas-negro">
                Productos
            </label>
            </div>
            
            <div className="w-full flex justify-end">
                <button className="my-2 flex items-center gap-2 bg-clas text-white font-semibold rounded-lg px-2 hover:bg-clas-claro"
                    onClick={() => setIsProductOpen(true)}
                >
                    Nuevo Producto
                    <PlusIcon className="h-4 w-4"/>
                </button>
            </div>
            
            <div className="rounded-md border-2 border-clas/50">
                <table className="min-w-full">
                    <thead className="bg-clas/30">
                        <tr>
                            <th className="text-clas-negro">Id</th>
                            <th className="text-clas-negro">Nombre</th>
                            <th className="text-clas-negro">Descripción</th>
                            <th className="text-clas-negro">Editar</th>
                            <th className="text-clas-negro">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-clas-negro text-center">1</td>
                            <td className="text-clas-negro text-center">Tornillo</td>
                            <td className="text-clas-negro text-center">Tornillo de 1/2"</td>
                            <td className="p-2">
                                <div className="flex justify-center text-clas">
                                    <PencilIcon className="h-4 w-4"/>
                                </div>
                            </td>
                            <td className="p-2">
                                <div className="flex justify-center text-red-400">
                                    <button
                                        onClick={() =>
                                        setProductToDelete(product)
                                        }
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        {/* Empleados */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Número de empleados
            </label>
            <input 
                type="number" 
                placeholder="Empleados..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
        </div>
        {/* Piezas */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Capacidad de producción en piezas
            </label>
            <input 
                type="number" 
                placeholder="Piezas..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
        </div>
        {/* Espacio */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Capacidad de espacio
            </label>
            <input 
                type="number" 
                placeholder="Espacio..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2">
            </input>
        </div>
        {/* Capacidad */}
        <div className="flex flex-col gap-2 items-start w-2xl">
            <label className="font-semibold text-clas-negro">
                Capacidad
            </label>
            <input 
                type="text" 
                placeholder="Capacidad..." 
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
                                    <button
                                        onClick={() =>
                                        setContactToDelete(contact)
                                        }
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
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
                selectFilter={formCompany.filters}
                setSelectFilter={handleFilter}
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

        <ProductModal 
            isProductOpen={isProductOpen}
            onClose={() => setIsProductOpen(false)}
        />
        <DeleteProductConfirmModal 
            product={productToDelete}
            onClose={() => setProductToDelete(null)}
            onConfirm={handleProductDelete}
        />
        <DeleteContactConfirmModal 
            contact={contactToDelete}
            onClose={() => setContactToDelete(null)}
            onConfirm={handleContactDelete}
        />
    </div>
   )
};

export default EditCompanyPage;