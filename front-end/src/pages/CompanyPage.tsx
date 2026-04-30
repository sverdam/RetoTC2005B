import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import type { Company, Contact, UserProfile } from "clas-types";
import ProductCatalog from "../components/ProductCatalog";
import Button from "../components/Button";
import { getProfile } from "../api/LoginAPI";
import { getCompanybyId } from "../api/CompanyAPI";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  WrenchIcon,
  PlusIcon,
  CheckBadgeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  BoltIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/outline";
import PhotoCarousel from "../components/PhotoCarousel";
import CertificationCard from "../components/CertificationCard";
import { getFileURLById, getGallery } from "../api/fileModuleAPI";
import ProductServiceCard from "../components/ProductServiceCard";
import { Description } from "@headlessui/react";

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

const CompanyPage: React.FC = () => {
    {/* TODO: Hacer que se vea la info de la empresa seleccionada desde el directorio */}
    
    const {id} = useParams();
    const companyId = Number(id)
    const navigate = useNavigate();
    const [company, setcompany] = useState<Company>();
    const location = useLocation();

    const [gallery, setGallery] = useState<string[]>([]);
    const [catalog, setCatalog] = useState<string>("");

    const [contactNumbers, setContactNumbers] = useState<Contact[]>([]);
    const [contactEmails, setContactEmails] = useState<Contact[]>([]);

    const [userProfile, setUserProfile] = useState<UserProfile>(unverifiedUser)
        

    useEffect(() => {
        getCompanybyId(companyId).then((companies: Company) => setcompany(companies)).catch(
            () => !company ? navigate(`/error`) : null 
        );

        getGallery(companyId).then((result: string[]) => setGallery(result));

        getProfile().then((profile: UserProfile) => setUserProfile(profile))
    }, [companyId, location.state?.refresh])

    useMemo(() => {
        if (company == null) return;
        setContactNumbers(company.contacts.filter(contact  =>  contact.type === "phone"));
        setContactEmails(company.contacts.filter(contact   =>  contact.type === "email"));
        if (company.catalog){
            setCatalog(getFileURLById(company.catalog.id))
        }else{
            setCatalog("");
        }
    }, [company])
   
    return(
    <div className="bg-gray-50 min-h-screen flex justify-center">
      <div className="flex flex-col gap-20 py-10 text-clas-negro max-w-7xl w-full pb-20">
        {/* PROFILE */}
        <div className="flex flex-col gap-8 px-14">
            {/* LOGO */}
                <div className="w-full flex justify-center">
                    <img
                            src={company?.logo ? getFileURLById(company.logo.id) : ''}
                            alt={'Logo'}
                            className="text-sm text-clas-gris h-40 object-contain transition group-hover:scale-101"
                        />
                </div>

            {/* INFO */}
                <div className="flex flex-col gap-2 items-center">

                    {/* NAME + TAG */}
                    <div className="flex flex-col lg:flex-row items-center gap-x-4">
                        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                            {company?.name}
                        </h1>

                        <div className="flex gap-4 items-center">
                            <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                                {company?.tier === 0 ? "OEM" : `Tier ${company?.tier}`}
                            </span>
                            {(userProfile.role === "admin" 
                                || userProfile.role === "CLAS editor"
                                || (userProfile.role === "company editor" && userProfile.companyId === company?.id)) ?
                                <Button text="Editar" to="editar" comp={company} />
                                : <></>
                            }
                        </div>
                        
                    </div>

                    {/* SUBTEXT */}
                    <p className="text-md text-gray-500 ">
                    {company?.slogan}
                    </p>

                    {/* TAGS / METADATA */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">

                    {company?.filters.length === 0 ? <></> :
                        company?.filters.map((filter) => 
                        <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                        {filter.name}
                        </span>)
                    }

                    </div>

                </div>
        </div>

        {/* ABOUT / PHOTO CAROUSEL */}
            <div className="animate-fade-up w-full flex flex-col gap-8 px-14">
                {/* SECTION DIVIDER */}
                <div className="mx-auto flex items-center justify-center gap-4">
                    <div className="h-px w-20 rounded-full bg-gradient-to-r from-transparent to-clas-gris" />
                    {/* SECTION ICON */}
                        <InformationCircleIcon className="text-clas h-8 w-8" />
                    {/* SECTION TITLE */}
                    <h2 className="text-2xl">
                        Sobre Nosotros
                    </h2>
                    {/* Right line */}
                    <div className="h-px w-20 rounded-full  bg-gradient-to-l from-transparent to-clas-gris" />
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex w-full h-full gap-4 justify-between flex-col">
                            {/* ABOUT US TEXT */}
                            <p className="text-lg text-left">
                            {company?.aboutUs}
                            </p>

                            {/* STATS */}
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around ">
                                <div className="flex flex-col items-start text-left transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 items-center">
                                        <PlusIcon className="h-6 text-clas flex-shrink-0" />
                                        <p>{company?.employees}</p>
                                    </div>
                                    <div className="text-lg text-gray-500 w-full text-center">
                                        <p>Empleados</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start text-left transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 items-center">
                                        <PlusIcon className="h-6 text-clas flex-shrink-0" />
                                        <p>{company?.space} m²</p>
                                    </div>
                                    <div className="text-lg text-gray-500 w-full text-center">
                                        <p>Capacidad de planta</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start text-left transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 items-center">
                                        <PlusIcon className="h-6 text-clas flex-shrink-0" />
                                        <p>{company?.pieces}</p>
                                    </div>
                                    <div className="text-lg text-gray-500 w-full text-center">
                                        <p>Piezas / año</p>
                                    </div>
                                </div>
                            </div>

                            {/* WEBSITE LINK */}
                            {company?.website ? (<div className="group flex gap-2 items-center text-clas w-fit">
                                    <a className="text-md" href={company?.website}>Visita nuestro Sitio Web
                                        <span className="block max-w-0 group-hover:max-w-full 
                                        transition-all duration-300 h-[1px] bg-clas rounded-full">
                                        </span>
                                    </a>
                                    <ArrowUpRightIcon className="h-4 group-hover:-translate-y-1 transition-all ease-in-out"/>
                                </div>) : <></>}

                        </div>

                        {/* PHOTO CAROUSEL / GALLERY */}
                        {
                            gallery.length === 0 ? <></> :
                            <div className="basis-[60%] lg:basis-[40%]">
                                <PhotoCarousel images={gallery}/>
                            </div> 
                        }
                    </div>
                    
                    
                    
                </div>

            </div>


        {/* CONTACT US */}
        <div  className="animate-fade-up w-full flex flex-col gap-8 px-14">
            {/* SECTION DIVIDER */}
                <div className="mx-auto flex items-center justify-center gap-4">
                    <div className="h-px w-20 rounded-full bg-gradient-to-r from-transparent to-clas-gris" />
                    {/* SECTION ICON */}
                        <ChatBubbleOvalLeftIcon className="text-clas h-8 w-8" />
                    {/* SECTION TITLE */}
                    <h2 className="text-2xl">
                        Contáctanos
                    </h2>
                    {/* Right line */}
                    <div className="h-px w-20 rounded-full  bg-gradient-to-l from-transparent to-clas-gris" />
                </div>

            {/* CONTACT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="w-full text-left p-4 items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <MapPinIcon className="w-7 text-clas flex-shrink-0"/>  
                    <a href={company?.location?.mapLink}>{company?.location?.address}</a>  
                </div>
                <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <EnvelopeIcon className="w-7 text-clas"/>  
                    <div className="flex flex-col">
                        {contactEmails.map(c => <a>{c.contactInfo}</a>)}
                    </div> 
                </div>
                <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <PhoneIcon className="w-7 text-clas"/>  
                     <div className="flex flex-col">
                        {contactNumbers.map(c => <a>{`${c.contactInfo}`}</a>)}
                     </div>
                </div>

            </div>
        </div>

        
        {/* CATALOG */}
        {(company?.products.length === 0 && company?.services.length === 0) ? <></> : 
        <div className="animate-fade-up w-full flex flex-col gap-8 px-14">
            {/* SECTION DIVIDER */}
                <div className="mx-auto flex items-center justify-center gap-4">
                    <div className="h-px w-20 rounded-full bg-gradient-to-r from-transparent to-clas-gris" />
                    {/* SECTION ICON */}
                        <ShoppingCartIcon className="text-clas h-8 w-8" />
                    {/* SECTION TITLE */}
                    <h2 className="text-2xl">
                        Catálogo
                    </h2>
                    {/* Right line */}
                    <div className="h-px w-20 rounded-full  bg-gradient-to-l from-transparent to-clas-gris" />
                </div>

            {/* PRODUCTS */}
            {company?.products.length === 0 ? <></> : 
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-left flex flex-col justify-between">
                    <h2 className="text-2xl"><span className="text-clas">Productos</span> destacados</h2>
                    <p>Explora nuestros productos diseñados para ofrecer calidad, confiabilidad y alto desempeño.</p>
                    <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>  
                </div>
                
                {company?.products.length === 0 ? <></> : 
                company?.products.map(product => 
                    <div>
                        <ProductServiceCard name={product.name} description={product.description} type="p" image={getFileURLById(product.fileModuleId)}/>
                    </div>
                )}

            </div>}
            

            {/* SERVICES */}
            {company?.services.length === 0 ?  <></> : 
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                {company?.services.map(service => 
                    <div>
                        <ProductServiceCard name={service.name} description={service.description} type="s"/>
                    </div>
                )}


                <div className="text-right items-end flex flex-col justify-between">
                    <h2 className="text-2xl"><span className="text-clas">Servicios</span> destacados</h2>
                    <p>Brindamos soluciones eficientes y adaptadas a tus necesidades.</p>
                    <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>  
                </div>
            </div>}
            
            
            {catalog === "" ? <></> :
            <div className="group flex gap-2 items-center mx-auto text-clas w-fit">
                <a className="text-md" href={catalog}>Explora el catálogo completo 
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-clas rounded-full"></span>
                </a>
                <ArrowUpRightIcon className="h-4 group-hover:-translate-y-1 transition-all ease-in-out"/>
            </div> }
            

        </div>}
        


        {/* CAPACITIES */}
        {company?.capacity === undefined || company?.capacity === null || company.capacity.length === 0 ? 
        <></> : 
        <div className="animate-fade-up w-full flex flex-col gap-8 px-14">
            <div className="bg-linear-to-tr from-clas to-clas-claro rounded-xl text-white p-10 flex flex-col gap-8">
                {/* SECTION DIVIDER */}
                <div className="mx-auto flex items-center justify-center gap-4">
                    <div className="h-px w-20 rounded-full bg-gradient-to-r from-transparent to-clas-gris" />
                    {/* SECTION ICON */}
                        <BoltIcon className="h-8 w-8" />
                    {/* SECTION TITLE */}
                    <h2 className="text-2xl">
                        Capacidades
                    </h2>
                    {/* Right line */}
                    <div className="h-px w-20 rounded-full  bg-gradient-to-l from-transparent to-clas-gris" />
                </div>
                <div>
                    <p className="text-lg">{company?.capacity}</p>
                </div>
            
            </div>
        </div>
        }
        

        {/* CERTIFICATIONS */}
        {company?.certifications.length === 0 ? <></> : 
         <div className="animate-fade-up w-full flex flex-col gap-8 px-14">
          {/* SECTION DIVIDER */}
                <div className="mx-auto flex items-center justify-center gap-4">
                    <div className="h-px w-20 rounded-full bg-gradient-to-r from-transparent to-clas-gris" />
                    {/* SECTION ICON */}
                        <CheckBadgeIcon className="text-clas h-8 w-8" />
                    {/* SECTION TITLE */}
                    <h2 className="text-2xl">
                        Certificaciones
                    </h2>
                    {/* Right line */}
                    <div className="h-px w-20 rounded-full  bg-gradient-to-l from-transparent to-clas-gris" />
                </div>

            <div className="flex flex-wrap justify-center gap-4">
                {company?.certifications.map((c) => (
                    <div className="w-full sm:w-[48%] lg:w-[23%]">
                        <CertificationCard name={c.name} />
                    </div>
                ))}
            </div>
        </div>}
       

      </div>
    </div>


//         <div className="flex flex-col gap-5 items-center p-5 bg-white rounded-lg">
//             {(userProfile.role === "admin" 
//             || userProfile.role === "CLAS editor"
//             || (userProfile.role === "company editor" && userProfile.companyId === company?.id)) ?
//             <div className="flex w-full justify-end">
//                 <Button text="Editar" to="editar" comp={company} />
//             </div> : <></>
//             }
//             <img src={!company?.logo ? "../src/assets/logoipsum.png" : `http://localhost:3000/fileModule/files/${company.logo.id}`} className="w-75"/>
//             <h1 className="font-semibold text-3xl text-clas-negro">{company?.name}</h1>
//             {company?.filters != null ? 
//             <div className="flex gap-2">
//                 {/*Mapeo filtros*/}
//                 {company?.filters?.map((f) => (
//                 <Tag value= {f.name} />
//                 ))}
//             </div> : <></>}
//             {!company?.textModules?.find( t => t.id === 1) ? 
//             <></>
//             : 
//             <h2 className="text-xl font-medium text-clas-negro">
//                 {/* Descripcion de la empresa */}
//                 {String(company?.textModules?.find(t => t.id === 1)?.text) || "No hay textmodule 1"}
//             </h2>
// }
//             <div className="grid grid-cols-2 gap-15 p-5 items-center">
//                 {company?.textModules?.find(t => t.id === 2) ? 
//                 <p className="text-left text-clas-negro">{String(company?.textModules?.find(t => t.id === 2)?.text)} {/*Aquí va un text_module */}</p>
//                 : <></>}
//                 <div className="flex flex-col gap-2 items-center">
//                     {!company?.location ? 
//                     <></>:
//                     <iframe
//                         src={company.location.mapLink}
//                         title="Location"
//                         className="rounded-xl"
//                     >
//                     </iframe>
//                     }
                    
//                     <div className="flex gap-2">
//                         <div className="flex gap-1 items-center">
//                             <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
//                                 <PhoneIcon className="text-clas h-5 w-5"/>
//                             </div>
//                             <div className="flex flex-col gap-1 items-start">
//                                 <p className="font-semibold text-clas-negro">Detalles de Contacto</p>
//                                 <p className="font-thin text-clas-negro">{company?.contacts?.find(c => c.type ==="phone")?.contactInfo || "No se encontró telefono"}</p>
//                             </div>
//                         </div>
//                         <div className="flex gap-1 items-center">
//                             <div className=" flex justify-center items-center rounded-full h-7 w-7 bg-gray-50">
//                                 <EnvelopeIcon className="text-clas h-5 w-5"/>
//                             </div>
//                             <div className="flex flex-col gap-1 items-start">
//                                 <p className="font-semibold text-clas-negro">Mándanos un e-mail</p>
//                                 <p className="font-thin text-clas-negro">{company?.contacts?.find(c => c.type === "email")?.contactInfo || "No se encontró mail disponible" }</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {company?.catalogo ? 
//             <>
//             <h2 className="text-xl font-medium text-clas-negro">Producto / Servicio </h2>
//             <ProductCatalog documentLink={ company?.catalogo != null ? `http://localhost:3000/filemodule/files/${company.catalogo.id}` :"..\src\assets\ManualCLAS.pdf"} /> </>
//             : <></>}
//             {company?.textModules ? 
//             ( company?.textModules?.find(c => c.id === 3)?.text ?
//             <>
//             <h2 className="text-xl font-medium text-clas-negro">Capacidades</h2>
//             <p className="text-left text-clas-negro">{String(company?.textModules?.find(c => c.id === 3)?.text) ?? "No hay text module 3"}
//             </p>
//             </> : <></>)
//             : <></>}
//             {company?.certifications ? 
//             (company.certifications.length > 0 ? <>
//             <h2 className="text-xl font-medium text-clas-negro">Certificaciones</h2>
//             <div className="flex flex-wrap gap-5">
//                 {company?.certifications?.map( (c) => (
//                 <CertificationCard name={c.name} />
//                 )) || "No hay certificaciones"}
//             </div>
//             </> : <></> )
//             : <></>    }
//             {/* TODO: HACER QUE SE VEAN LOS CONTACTOS DE LA EMPRESA!!  */}
//             <div className="rounded-md border-2 border-clas/50">
//                 <table className="min-w-full">
//                     <thead className="bg-clas/30">
//                         <tr>
//                             <th className="text-clas-negro">Puesto</th>
//                             <th className="text-clas-negro">Contacto</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {company?.contacts?.map( c => (
//                         <tr>
//                             <td className="text-clas-negro text-center">{c.position}</td>
//                             <td className="text-clas-negro text-center">{c.contactInfo}</td>
                            
//                         </tr>))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
    )
};

export default CompanyPage;