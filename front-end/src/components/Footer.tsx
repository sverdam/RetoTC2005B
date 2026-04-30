import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer: React.FC = () => {
    return(
        <footer className="bg-clas-negro px-14 py-10">
            <div className="flex flex-col gap-7">
                <div className="flex flex-col items-center md:grid md:grid-cols-3  gap-7">
                    {/* First Column: CLAS Logo and Social Media */}
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <img src="..\src\assets\CLAS-logo-gray.png" className="w-37"/>
                        <div className="flex gap-3">
                            <a className="flex items-center justify-center rounded-full border border-clas-gris h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/profile.php?id=61568197160101&locale=es_LA"
                        >
                            <img  src="..\src\assets\Social-Media-Icons\facebook.png"
                                className="h-6"    
                            />
                        </a>
                        <a className="flex items-center justify-center rounded-full border border-clas-gris h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/clusterautomotrizsonora/"
                        >
                            <img  src="..\src\assets\Social-Media-Icons\instagram.png"
                                className="h-6"    
                            />
                        </a>
                        <a className="flex items-center justify-center rounded-full border border-clas-gris h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://x.com/Clusterautoson?fbclid=IwY2xjawRM2vNleHRuA2FlbQIxMABicmlkETF5OXN1cVhhWDFUVlQyQlBOc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHu6Q2TOIkMkv_Nxiq872aRgWgFPAi2IoJVDCDtam50_jEerH-oL5HGDL3XVA_aem_AgLqod_-nz14tByRnk-M3g"
                        >
                            {/* TODO: Arreglar el logo de twitter */}
                            <img  src="..\src\assets\Social-Media-Icons\x.png"
                                className="h-6"    
                            />
                        </a>
                        </div>
                    </div>
                    {/* Second Column: Contact US */}
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <h4 className="text-clas-gris font-semibold text-left">CONTÁCTANOS</h4>
                        <a href="mailto:direccion@clas.com.mx" className="text-clas-gris font-normal text-center md:text-left">direccion@clas.com.mx</a>
                        <a href="mailto:tesoreria@clas.com.mx" className="text-clas-gris font-normal text-center md:text-left">tesoreria@clas.com.mx</a>
                        <p className="text-clas-gris font-normal text-center md:text-left">Obrero Mundial 10, 83210 Hermosillo, Sonora, México</p>
                    </div>
                    {/* Third Column: Subscribe to Newsletter */}
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <h4 className="text-clas-gris font-semibold text-left">SUSCRÍBETE</h4>
                        <p className="text-clas-gris font-normal text-center md:text-left">Ingresa tu correo para recibir notificaciones sobre la industria automotriz</p>
                        <div className="flex items-center w-full bg-clas-gris/30 rounded-lg px-4 py-1 gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo"
                                className="flex-1 min-w-0 bg-transparent border-none outline-none text-clas-gris"
                            />

                            <button className="flex-shrink-0 rounded-lg p-2 text-clas hover:bg-clas-negro focus:ring-2 focus:ring-clas">
                                <EnvelopeIcon className="h-5 w-5 text-clas-gris" />
                            </button>
                        </div>
                    </div>
                </div>  
                <div className="h-0.25 bg-clas-gris"></div>
                {/* Derechos reservados y contacto CLAS*/}
                <div className="flex flex-wrap w-full justify-center items-center md:justify-end">
                    <p className="text-clas-gris">Copyright @ 2026 CLAS | Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
        
    );
};

export default Footer;