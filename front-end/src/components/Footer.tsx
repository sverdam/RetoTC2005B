const Footer: React.FC = () => {
    return(
        <footer>
            <div className="flex flex-col p-4 gap-7">
                <div className="flex justify-between items-center">
                    <img src="..\src\assets\CLAS-Logotipo-03.jpeg" className="h-15"/>
                    {/* Suscribirse al Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-clas-negro font-bold">Suscribirse al Newsletter</h4>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Tu correo"
                                className="border-none outline-none"
                            >
                            </input>
                            <button className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas"> {/* TODO: Hacer que este botón funcione */}
                                Suscribirse
                            </button>
                        </div>
                    </div>
                    {/* Redes Sociales */}
                    <div className="flex gap-3">
                        <a className="flex items-center justify-center rounded-full border border-clas-black h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/profile.php?id=61568197160101&locale=es_LA"
                        >
                            <img  src="..\src\assets\facebook-icon.png"
                                className="h-6"    
                            />
                        </a>
                        <a className="flex items-center justify-center rounded-full border border-clas-black h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/clusterautomotrizsonora/"
                        >
                            <img  src="..\src\assets\instagram-icon.png"
                                className="h-6"    
                            />
                        </a>
                        <a className="flex items-center justify-center rounded-full border border-clas-black h-10 w-10"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://x.com/Clusterautoson?fbclid=IwY2xjawRM2vNleHRuA2FlbQIxMABicmlkETF5OXN1cVhhWDFUVlQyQlBOc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHu6Q2TOIkMkv_Nxiq872aRgWgFPAi2IoJVDCDtam50_jEerH-oL5HGDL3XVA_aem_AgLqod_-nz14tByRnk-M3g"
                        >
                            {/* TODO: Arreglar el logo de twitter */}
                            <img  src="..\src\assets\twitter-icon.png"
                                className="h-6"    
                            />
                        </a>
                    </div>
                </div>
                <div className="h-0.5 bg-clas-gris"></div>
                {/* Derechos reservados y contacto CLAS*/}
                <div className="flex flex-wrap justify-between items-center">
                    <p>Copyright @ 2026 CLAS | Todos los derechos reservados</p>
                    <p>direccion@clas.com.mx</p>
                    <p>tesoreria@clas.com.mx</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;