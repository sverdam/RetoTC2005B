import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ArrowUpRightIcon,
    PlusIcon,
    CheckBadgeIcon,
    InformationCircleIcon,
    ShoppingCartIcon,
    BoltIcon,
    ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/outline";
import PhotoCarousel from "../components/PhotoCarousel";
import CertificationCard from "../components/CertificationCard";
import ProductServiceCard from "../components/ProductServiceCard";

const images = [
    "https://u-mercari-images.mercdn.net/photos/m80862755279_1.jpg?1774828834",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQC_OPbbCDWa-3rZ28ONF6A1_38cwXOfiULw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQIwNYMOqZG-J9N8jeEhZJv9kK8vgukYfCsw&s"
]

const Redesign: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="flex flex-col gap-20 py-10 text-clas-negro max-w-7xl ">

                {/* PROFILE */}
                <div className="hero-intro w-full flex flex-col gap-8 px-14">

                    {/* LOGO */}
                    <div className="group relative">
                        <div className="relative flex items-center justify-center">
                            <img
                                src="https://canadianautomotivefootprintmexico.com/wp-content/uploads/2025/03/martinrea-logo-1024x866.png"
                                className="h-40 object-contain transition group-hover:scale-102"
                            />
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col gap-2 items-center">

                        {/* NAME + TAG */}
                        <div className="flex flex-col lg:flex-row items-center gap-x-4">
                            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                                Martinrea International
                            </h1>

                            <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                                Tier 1
                            </span>
                        </div>

                        {/* SUBTEXT */}
                        <p className="text-md text-gray-500 ">
                            Fabricación automotriz de clase mundial con enfoque en innovación,
                            eficiencia y producción a gran escala.
                        </p>

                        {/* TAGS / METADATA */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">

                            <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                                Automotriz
                            </span>

                            <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                                Ensamblaje
                            </span>

                            <span className="bg-white text-sm px-3 py-1 rounded-full border border-clas-gris">
                                Global
                            </span>

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

                    <div className="flex flex-row w-full gap-8">
                        <div className="text-left flex flex-col justify-between text-lg basis-[60%]">
                            <p>
                                Martinrea International se especializa en el diseño y fabricación de estructuras ligeras y sistemas de propulsión para la industria automotriz. Su enfoque está en la innovación, la eficiencia y la mejora continua para contribuir al futuro de la movilidad.

                            </p>
                            <div className="flex flex-row justify-around">
                                <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                                        <PlusIcon className="h-6 text-clas" />
                                        950
                                    </div>
                                    <div className="text-lg text-gray-500">
                                        Empleados
                                    </div>
                                </div>

                                <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                                        <PlusIcon className="h-6 text-clas" />
                                        26000 m2
                                    </div>
                                    <div className="text-lg text-gray-500">
                                        Capacidad de planta
                                    </div>
                                </div>

                                <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                                    <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                                        <PlusIcon className="h-6 text-clas" />
                                        74000
                                    </div>
                                    <div className="text-lg text-gray-500">
                                        Piezas / año
                                    </div>
                                </div>

                            </div>
                            <div className="group flex gap-2 items-center text-clas w-fit">
                                <a className="text-md">Visita nuestro Sitio Web<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-clas rounded-full"></span>
                                </a>
                                <ArrowUpRightIcon className="h-4 group-hover:-translate-y-1 transition-all ease-in-out" />
                            </div>
                        </div>
                        <div className="basis-[40%]">
                            <PhotoCarousel images={images} />
                            {/*TO DO: COLAPSAR SI NO HAY IMÁGENES*/}
                        </div>
                    </div>

                </div>


                {/* CONTACT US */}
                <div className="animate-fade-up w-full flex flex-col gap-8 px-14">
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
                            <MapPinIcon className="w-7 text-clas flex-shrink-0" />
                            <a href="https://maps.app.goo.gl/y4V7jCetxMjZNJW98">Henry Ford 23-Sur, Parque Industrial Dinatech, 83297 Hermosillo, Son. </a>
                        </div>
                        <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                            <EnvelopeIcon className="w-7 text-clas" />
                            <div className="flex flex-col">
                                <a>Correo</a>
                                <a>Correo</a>
                            </div>
                        </div>
                        <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                            <PhoneIcon className="w-7 text-clas" />
                            <div className="flex flex-col">
                                <a>Telefono</a>
                                <a>Telefono</a>
                            </div>
                        </div>

                    </div>
                </div>


                {/* CATALOG */}
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
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-left flex flex-col justify-between">
                            <h2 className="text-2xl"><span className="text-clas">Productos</span> destacados</h2>
                            <p>Explora nuestros productos diseñados para ofrecer calidad, confiabilidad y alto desempeño.</p>
                            <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>
                        </div>

                        {/* PRODUCT CARD */}
                        <div>
                            <ProductServiceCard name="Producto" description="Descripción breve de el producto" type="p" image="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg" />
                        </div>

                        {/* PRODUCT CARD */}
                        <div>
                            <ProductServiceCard name="Producto" description="Descripción breve de el producto" type="p" image="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg" />
                        </div>

                        {/* PRODUCT CARD */}
                        <div>
                            <ProductServiceCard name="Producto" description="Descripción breve de el producto" type="p" image="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg" />
                        </div>

                    </div>

                    {/* SERVICES */}
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* SERVICE CARD */}
                        <div>
                            <ProductServiceCard name="Servicio" description="Descripción breve de el servicio" type="s" />
                        </div>

                        {/* SERVICE CARD */}
                        <div>
                            <ProductServiceCard name="Servicio" description="Descripción breve de el servicio" type="s" />
                        </div>

                        {/* SERVICE CARD */}
                        <div>
                            <ProductServiceCard name="Servicio" description="Descripción breve de el servicio" type="s" />
                        </div>

                        <div className="text-right items-end flex flex-col justify-between">
                            <h2 className="text-2xl"><span className="text-clas">Servicios</span> destacados</h2>
                            <p>Brindamos soluciones eficientes y adaptadas a tus necesidades.</p>
                            <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>
                        </div>
                    </div>

                    <div className="group flex gap-2 items-center mx-auto text-clas w-fit">
                        <a className="text-md">Explora el catálogo completo <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-clas rounded-full"></span>
                        </a>
                        <ArrowUpRightIcon className="h-4 group-hover:-translate-y-1 transition-all ease-in-out" />
                    </div>

                </div>


                {/* CAPACITIES */}
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
                            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate iure cum dolorum repellat consectetur est libero obcaecati tempora nisi suscipit unde reprehenderit minima autem, aut atque officiis aliquid accusantium.</p>
                        </div>

                    </div>
                </div>

                {/* CERTIFICATIONS */}
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

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <CertificationCard name="a" />
                        <CertificationCard name="b" />
                        <CertificationCard name="c" />
                        <CertificationCard name="d" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Redesign;