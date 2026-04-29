// Esqueleto para Company Page cuando sea usuario admin de empresa
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type {Company, Product, Contact, NewContactInput, NewCompanyInput, Filter, UserProfile, NewProductInput, NewCertificationInput, Service, FileBundleInput} from "clas-types";
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
import DeleteProductServiceConfirmModal from "../components/DeleteProductConfirmModal";
import DeleteContactConfirmModal from "../components/DeleteContactConfirmModal";
import { getProfile } from "../api/LoginAPI";
import ServiceModal from "../components/ServiceModal";
import { createFileModule } from "../api/fileModuleAPI";
import { deleteContact } from "../api/ContactAPI";


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
        id: null,
        name: "",
        description: "",
        aboutUs: "",
        tier: null,
        logo: null,
        catalog: null,
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

const emptyFormProduct: NewProductInput = {
    id: "",
    name: "",
    description: ""
}

const emptyFormCertification: NewCertificationInput = {
    name: ""
}

const emptyFormContact: NewContactInput = {
        type: null,
        contactInfo: "",
        position: ""
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

    const [isServiceOpen, setIsServiceOpen] = useState(false);

    {/* Obtain data */}
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<Company | NewCompanyInput | null>(null);

    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | NewProductInput | null>(null);
    const [productsToDelete, setProductsToDelete] = useState<Number[]>([])

    const [serviceToDelete, setServiceToDelete] = useState<Service | NewProductInput | null>(null);
    const [servicesToDelete, setServicesToDelete] = useState<Number[]>([])
    
    const [isContactDeleteOpen, setIsContactDeleteOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);


    {/* Logo Handling */}
    const handleLogoSelect = (file: File) => {
        const logoBoundle : FileBundleInput = {
            file: file,
            type: 'logo',
            position: 0,
            companyId: -1
        }

        handleChange('logo', logoBoundle);
    };

    const handleContact = (newContact: NewContactInput) => {
        newContact.id = `temp- ${crypto.randomUUID()}`;
        handleChange("contacts", [...formCompany.contacts, newContact])
    }
    const handleCertification = (newCertification: NewCertificationInput) => {
        newCertification.id = `temp- ${crypto.randomUUID()}`;
        handleChange("certifications", [...formCompany.certifications, newCertification])
    }
    const handleService = (newService: NewProductInput) => {
        newService.id = `temp- ${crypto.randomUUID()}`;
        handleChange("services", [...formCompany.services, newService])
    }
    const handleProduct = (newProduct: NewProductInput) => {
        newProduct.id = `temp- ${crypto.randomUUID()}`;
        handleChange("products", [...formCompany.products, newProduct])
    }
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
        const logoBoundle : FileBundleInput = {
            file: file,
            type: 'document',
            position: 0,
            companyId: -1
        }

        handleChange('catalog', logoBoundle);
    };

    const handleDelete = () => {
        if(!companyToDelete) return;
        deleteCompany(Number(companyToDelete.id)).then(() => {
          setCompanyToDelete(null);
          navigate('/directorio');
        });
    };

    const handleProductDelete = () => {
        if(!productToDelete) return;
        //TODO: Agregar API de producto
        const isReal = typeof productToDelete.id === 'number' || 
                         (typeof productToDelete.id === 'string' && !productToDelete.id.startsWith('temp-'));
        if(isReal){
            setProductsToDelete((prev) => [...prev, productToDelete.id]);

        }

        handleChange("products", formCompany.products.filter(p => p.id != productToDelete.id));
        setProductToDelete(null);
        console.log(productsToDelete);
        
    };

    const handleServiceDelete = () => {
        if(!serviceToDelete) return;

        const isReal= typeof serviceToDelete.id === 'number' || 
                         (typeof serviceToDelete.id === 'string' && !serviceToDelete.id.startsWith('temp-'));
        
        if(isReal){
            setServicesToDelete((prev) => [...prev, serviceToDelete.id])
        }
        handleChange("services", formCompany.services.filter(s => s.id != serviceToDelete.id))
        setServiceToDelete(null);
    }   

    const handleContactDelete = () => {
        if(!contactToDelete) return;
        //TODO: Agregar API de contacto
        const isReal = 
        deleteContact(contactToDelete.id).then(() => {
          setContactToDelete(null);
        });
    };
    
    

    useEffect(()=>{
       
        if(isEditing){
            if(location.state?.company){
            const company = location.state.company as Company;
            setFormCompany ({
                id: company.id,
                name: company.name,
                description: company.description,
                aboutUs: company.aboutUs,
                tier: company.tier,
                logo: null, // jalar bien el file
                catalog: company.catalog, //jalar bien el file
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
                getCompanybyId(Number(id)).then(data => 
                    setFormCompany({
                id: data.id,
                name: data.name,
                description: data.description,
                aboutUs: data.aboutUs,
                tier: data.tier,
                logo: null,
                catalog: data.catalog,
                memberType: data.memberType,
                website: data.website,
                slogan: data.slogan,
                employees: data.employees,
                pieces: data.pieces,
                space: data.space,
                capacity: data.capacity,
                color: data.color,
                location: data.location,
                contacts: data.contacts,
                user: data.user,
                textModules: data.textModules, 
                fileModules: data.fileModules,
                certifications: data.certifications,
                filters: data.filters,
                products: data.products,
                services: data.services
            })
                )
             }
            }

        getProfile().then((profile: UserProfile) => setUserProfile(profile))
        },[])
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create company
        // Create other table's rows
        
        const companyId = 0; // get id of somehow
        
        if (formCompany.logo){
            createFileModule({
                type: formCompany.logo.type, 
                position: formCompany.logo.position, 
                companyId: companyId
            }, formCompany.logo.file);
        }

        if (formCompany.catalog){
            createFileModule({
                type: formCompany.catalog.type, 
                position: formCompany.catalog.position, 
                companyId: companyId
            }, formCompany.catalog.file);
        }
    } 

    return(
    <div className="flex flex-col items-center justify-center p-5 gap-5 w-full">
        <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium text-clas-negro"> {isEditing ? "Editar Página de Empresa" : "Crear Página de Empresa" }</h1>
        {/* Subir Archivo de Logo*/}
        <div className="flex flex-col items-start w-2xl mt-5">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-clas-negro">Logo</label>
                <InformationCircleIcon className="text-gray-500 h-5"/>
                <p className="text-gray-500">Imagen en formato .png sin fondo</p>
            </div>
            <FileUpload onFileSelect={handleLogoSelect} />
        </div>
        <div className="flex flex-col gap-3 items-start w-2xl mt-5">
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
        <div className="mt-5 flex w-2xl justify-between">
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
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">Etiquetas</label>
            <div className="flex flex-wrap gap-2">
                {/*TODO: Mapeo filtros*/}
                {formCompany.filters?.map( e => <Tag value={e.name}/>)}
                <button
                    onClick={() => setIsOpen(true)} 
                    className=" w-15 bg-clas rounded-4xl py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                    Editar
                </button>
            </div>
        </div>
        
        {/* Descripcion ejecutiva / eslogan */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-clas-negro">Descripción breve</label>
                <InformationCircleIcon className="text-clas-gris h-5"/>
                <p className="text-clas-gris">20-30 palabras</p>
            </div>
            <input 
                type="text" 
                value={formCompany.slogan}
                placeholder="Descripción ejecutiva..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("slogan", e.target.value)}></input>
        </div>
        {/* Descripcion larga */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-clas-negro">
                Sobre tu empresa
            </label>
                <InformationCircleIcon className="text-clas-gris h-5"/>
                <p className="text-clas-gris">60-80 palabras</p>
            </div>
            <textarea  
                value={formCompany.description}
                placeholder="Describe a tu empresa" 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("description", e.target.value)}>
            </textarea>
        </div>
        {/* Sitio Web */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">Link a sitio Web</label>
            <input 
                type="text" 
                value={formCompany.website}
                placeholder="Sitio web..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("website", e.target.value)}></input>
        </div>
        {/* Color de Compania */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">Color de Compañía</label>
            <input 
                type="text" 
                value={formCompany.color}
                placeholder="#ffffff" 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("color", e.target.value)}></input>
        </div>
        {/* Ubicacion */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <div className="flex gap-2 items-center">
                <label className="font-semibold text-clas-negro">
                    Ubicación
                </label>
                {/* TODO: Agregar info de como obtener el link de embebido */}
                <InformationCircleIcon className="text-clas-negro h-5 w-5"/>
            </div>
            <input 
                type="text" 
                value={formCompany.location?.mapLink}
                placeholder="Link de embebido..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("location", e.target.value)}>
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
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-clas-negro">
                Catálogo de Productos / Servicios
            </label>
                <InformationCircleIcon className="text-clas-gris h-5"/>
                <p className="text-clas-gris">Archivo en formato .pdf</p>
            </div>
            <FileUpload onFileSelect={handleCatalogSelect} />
        </div>

        {isEditing ? 
        <><div className="w-2xl">
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
        
            <div className="overflow-hidden w-2xl rounded-2xl border border-clas bg-white shadow-lg shadow-slate-200/50">
                <table className="min-w-full text-sm">
                    
                    <thead className="bg-clas-claro/10 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Nombre
                            </th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Descripción
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Editar
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Eliminar
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {formCompany.products.map((p) => {
                            return (
                                <tr
                                    key={p.id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-semibold text-clas">
                                            #{p.id}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {p.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {p.description}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button>
                                                <PencilIcon className=" text-clas hover:text-clas-claro h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setProductToDelete(p)}
                                            >
                                                <TrashIcon className="text-red-500 hover:text-red-700 h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="w-2xl mt-5">
            <div className="flex justify-start">
                <label className="font-semibold text-clas-negro">
                Servicios
            </label>
            </div>
            
            <div className="w-full flex justify-end">
                <button className="mb-2 flex items-center gap-2 bg-clas text-white font-semibold rounded-lg px-2 hover:bg-clas-claro"
                    onClick={() => setIsServiceOpen(true)}
                >
                    Nuevo Servicio
                    <PlusIcon className="h-4 w-4"/>
                </button>
            </div>
            
            <div className="overflow-hidden w-2xl rounded-2xl border border-clas bg-white shadow-lg shadow-slate-200/50">
                <table className="min-w-full text-sm">
                    
                    <thead className="bg-clas-claro/10 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Nombre
                            </th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Descripción
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Editar
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Eliminar
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {formCompany.services.map((s) => {
                            return (
                                <tr
                                    key={s.id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-semibold text-clas">
                                            #{s.id}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {s.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-600">
                                        {s.description}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button>
                                                <PencilIcon className=" text-clas hover:text-clas-claro h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setServiceToDelete(s)}
                                            >
                                                <TrashIcon className="text-red-500 hover:text-red-700 h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
        : 
        <></>}
        {/* Empleados */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">
                Número de empleados
            </label>
            <input 
                type="number" 
                value={formCompany.employees != null ? formCompany.employees : ""}
                placeholder="Empleados..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => e.target.value}>
            </input>
        </div>
        {/* Piezas */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">
                Capacidad de producción en piezas
            </label>
            <input 
                type="number" 
                value={formCompany.pieces != null ? formCompany.pieces : "" }
                placeholder="Piezas..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("pieces", e.target.value)}>
            </input>
        </div>
        {/* Espacio */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">
                Capacidad de espacio
            </label>
            <input 
                type="number" 
                value={formCompany.space != null ? formCompany.space : ""}
                placeholder="Espacio..." 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("space", e.target.value)}>
            </input>
        </div>
        {/* Capacidad */}
        <div className="flex flex-col gap-2 items-start w-2xl mt-5">
            <label className="font-semibold text-clas-negro">
                Capacidad
            </label>
            <input 
                type="text" 
                value={formCompany.capacity}
                placeholder="Describe las capacidades de tu empresa" 
                className="w-2xl border-2 border-clas-gris rounded-lg p-2"
                onChange={(e) => handleChange("capacity", e.target.value)}>
            </input>
        </div>
        {/* Certificaciones */}
        {isEditing ? 
        <><div className="w-2xl mt-5">
            <div className="flex justify-start">
                <label className="font-semibold text-clas-negro">
                Certificaciones
            </label>
            </div>
            
            <div className="w-full flex justify-end">
                <button className="mb-2 flex items-center gap-2 bg-clas text-white font-semibold rounded-lg px-2 hover:bg-clas-claro"
                    onClick={() => setIsCertificationOpen(true)} // checar
                >
                    Nueva Certificación
                    <PlusIcon className="h-4 w-4"/>
                </button>
            </div>
            
            <div className="overflow-hidden w-2xl rounded-2xl border border-clas bg-white shadow-lg shadow-slate-200/50">
                <table className="min-w-full text-sm">
                    
                    <thead className="bg-clas-claro/10 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Nombre
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Editar
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Eliminar
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {formCompany.certifications.map((c) => {
                            return (
                                <tr
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {c.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button>
                                                <PencilIcon className=" text-clas hover:text-clas-claro h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setCertificationToDelete(c)}
                                            >
                                                <TrashIcon className="text-red-500 hover:text-red-700 h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        
       
        <div className="w-2xl mt-5">
            <div className="flex justify-start">
                <label className="font-semibold text-clas-negro">
                    Contactos
                </label>
            </div>
            <div className="w-full flex justify-end">
                <button className="mb-2 flex items-center gap-2 bg-clas text-white font-semibold rounded-lg px-2 hover:bg-clas-claro"
                    onClick={() => setIscontactOpen(true)}
                >
                    Nuevo Contacto
                    <PlusIcon className="h-4 w-4"/>
                </button>
            </div>
            
            <div className="overflow-hidden w-2xl rounded-2xl border border-clas bg-white shadow-lg shadow-slate-200/50">
                <table className="min-w-full text-sm">
                    
                    <thead className="bg-clas-claro/10 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Puesto
                            </th>
                            <th className="px-6 py-4 text-left font-semibold tracking-wide text-slate-700">
                                Contacto
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Editar
                            </th>
                            <th className="px-6 py-4 text-center font-semibold tracking-wide text-slate-700">
                                Eliminar
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {formCompany.contacts.map((c) => {
                            return (
                                <tr
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {c.position}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {c.contactInfo}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button>
                                                <PencilIcon className=" text-clas hover:text-clas-claro h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setContactToDelete(c)}
                                            >
                                                <TrashIcon className="text-red-500 hover:text-red-700 h-5 w-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div> </>
        : <></>}
        <div className="mt-5 flex w-2xl gap-3 justify-end">
            <button className="bg-white border-2 border-clas-negro/70 text-clas-negro/70 font-semibold rounded-lg px-2 py-1 hover:bg-clas-negro/20">Cancelar</button>
            {isEditing ? 
            <button className="bg-red-400 text-white font-semibold rounded-lg px-2 py-1 hover:bg-red-700"
                onClick={()=> setCompanyToDelete(formCompany)}
            >
                Eliminar Empresa
            </button> : <></>}
            <button type="submit" className="bg-clas text-white font-semibold rounded-lg px-2 py-1 hover:bg-clas-claro">Aplicar Cambios</button>
        </div>
        </form>
        
        <FilterModal //utilizado
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                selectFilter={formCompany.filters}
                setSelectFilter={handleFilter}
        />
        <DeleteCompanyConfirmModal //utilizado
            company={companyToDelete}
            onClose={() => setCompanyToDelete(null)}
            onConfirm={handleDelete}
        />
        
        <NewCertificationModal //utilizado
            isCertificationOpen={isCertificationOpen}
            onClose={() => setIsCertificationOpen(false)}
            certification={emptyFormCertification}
            setCertification={handleCertification}
        />

        <NewContactModal //utilizado
            isContactOpen={isContactOpen}
            onClose={() => setIscontactOpen(false)}
            contact={emptyFormContact}
            setContact={handleContact}
        />

        <ProductModal //utilizado
            isProductOpen={isProductOpen}
            onClose={() => setIsProductOpen(false)}
            product={emptyFormProduct}
            setProduct={handleProduct}
        />

        <ServiceModal //utilizado
            isServiceOpen={isServiceOpen}
            onClose={() => setIsServiceOpen(false)}
            service={emptyFormProduct}
            setService={handleService}

        />
        <DeleteProductServiceConfirmModal 
            product={productToDelete}
            service={serviceToDelete}
            onClose={() => {
                setProductToDelete(null)
                setServiceToDelete(null)
             }}
            onConfirm={productToDelete != null ? handleProductDelete : handleServiceDelete}
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