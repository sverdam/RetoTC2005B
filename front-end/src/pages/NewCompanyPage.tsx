import { PhoneIcon, EnvelopeIcon, MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CertificationCard from "../components/CertificationCard";
import Button from "../components/Button";

const NewCompanyPage: React.FC = () => {
    return(
        <div className="bg-gray-100">
            <div className="flex flex-col gap-12 items-center text-clas-negro">
                <div className="flex flex-col gap-4" >
                    {/* PROFILE */}
                    <div className="flex flex-col gap-2 w-full px-10 items-center">
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Ford-Motor-Company-Logo.png" className="h-30 my-4"></img>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-2xl">Ford Motor Company</h1>
                            <div className="bg-white text-sm flex items-center border border-clas-gris px-3 py-1 rounded-2xl">OEM</div>
                        </div>
                    </div>

                    {/* MAIN INFO CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-10">
        
                        <div className="bg-white border border-clas-gris rounded-xl p-5 sm:p-6 flex items-center">
                            <div className="flex gap-4 items-center justify-center">
                                <MapPinIcon className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"/>
                                <div className="text-sm sm:text-base text-left flex flex-col">
                                    <a href="https://maps.app.goo.gl/A3aJ7uP1qeQBAYnF7" className="hover:underline">KM 4.5, Carr. a la Colorada, Parque Industrial, 83299 Hermosillo, Son.</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-clas-gris rounded-xl p-5 sm:p-6 flex items-center">
                            <div className="flex gap-4 items-center">
                                <EnvelopeIcon className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"/>
                                <div className="text-sm sm:text-base text-left flex flex-col">
                                    <a href="mailto:" className="hover:underline"> correo1@ford.com</a>
                                    <a href="mailto:" className="hover:underline" > correo2@ford.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-clas-gris rounded-xl p-5 sm:p-6 flex items-center">
                            <div className="flex gap-4 items-center">
                                <PhoneIcon className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"/>
                                <div className="text-sm sm:text-base text-left">
                                    <p>525125162</p>
                                    <p>126162611</p>
                            </div>
                            </div>
                        </div>

                    </div>

                    {/* ABOUT US / TAGS */}
                    <div className="grid grid-cols-3 gap-4 w-full px-10">
                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 col-span-2 text-left flex flex-col gap-2 justify-between">
                            <h2 className="text-lg">Sobre Ford Motor Company</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ea voluptatibus magni sint, eligendi tempora. Harum blanditiis, vero corrupti molestias nisi animi aliquid exercitationem iste eligendi, necessitatibus impedit quidem quisquam.
                            </p>
                            <Button text="Sitio web" to="#"></Button>
                        
                        </div>
                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 text-left flex flex-col gap-2">
                            <h2 className="text-lg">Tag Category</h2>
                            <div className="flex flex-wrap gap-1">
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 1</div>
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 2</div>
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 3</div>
                            </div>


                            <div className="h-[1px] bg-clas-gris w-full my-2"></div>

                            <h2 className="text-lg">Tag Category</h2>
                            <div className="flex flex-wrap gap-1">
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 1</div>
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 2</div>
                                <div className="text-sm border-solid border-1 border-clas-gris px-3 py-1 rounded-2xl">Tag 3</div>
                            </div>
                        </div>
                    </div>
                </div>
                

                {/* PRODUCTS */}
                <div className="w-full px-10 flex flex-col gap-4 items-center">
                    <div className="w-full text-left flex justify-between">
                        <h2 className="text-xl">Productos</h2>
                        <div className="flex  gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                            <MagnifyingGlassIcon className="h-4 w-4" />
                            <input className="border-none focus:outline-none w-40 h-4 text-sm" placeholder="Buscar producto..."
                                type="text"
                            ></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <img 
                            src="https://www.dealerfireblog.com/akinsford/wp-content/uploads/sites/1027/2020/05/Ford-F-150-assembly-line_B_o.jpg"
                            alt="product"
                            className="h-34 object-cover rounded-lg"
                            ></img>
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>     

                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <img
                            src="https://cdn.businessday.ng/2022/05/vehicles-.png"
                            alt="product"
                            className="h-34 object-cover rounded-lg"
                            ></img>
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>   

                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <img 
                            src="https://gesrepair.com/wp-content/uploads/2018/07/bigstock-206068144.jpg"
                            alt="product"
                            className="h-34 object-cover rounded-lg"
                            ></img>
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>     
                    </div>
                    <Button text="Ver más" to=""/>
                </div>

                {/* SERVICES */}
                <div className="w-full px-10 flex flex-col gap-4 items-center">
                    <div className="w-full text-left flex justify-between">
                        <h2 className="text-xl">Servicios</h2>
                        <div className="flex  gap-2 p-2 items-center rounded-full border border-gray-300 bg-gray-100">
                            <MagnifyingGlassIcon className="h-4 w-4" />
                            <input className="border-none focus:outline-none w-40 h-4 text-sm" placeholder="Buscar producto..."
                                type="text"
                            ></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>     

                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>   

                        <div className="bg-white border-solid border-1 border-clas-gris w-full rounded-xl p-8 flex flex-col gap-2 text-left">
                            <div className="text-md">Nombre Producto</div>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste impedit alias a facere voluptates.</p>
                        </div>     
                    </div>
                    <Button text="Ver más" to=""/>
                </div>

                {/* CAPACITIES / CERTIFICATIONS */}
                <div className="grid grid-cols-3 gap-4 w-full px-10">
                    <div className="col-span-2 text-left flex flex-col gap-2">
                        <h2 className="text-xl">Capacidades</h2>
                        <div>
                            <p>Capacidad X</p>
                            <p className="text-clas-gris text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatem repellat beatae consectetur quaerat, nobis corporis.</p>
                        </div>

                        <div>
                            <p>Capacidad Y</p>
                            <p className="text-clas-gris text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat voluptatem repellat beatae consectetur quaerat, nobis corporis.</p>
                        </div>
                        
                    </div>


                    <div className="text-left flex flex-col gap-4">
                        <h2 className="text-xl">Certificaciones</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2">
                            <CertificationCard name="ISO 12838" />
                            <CertificationCard name="ISO 12838" />
                            <CertificationCard name="ISO 12838" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewCompanyPage;