import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  WrenchIcon,
  PlusIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import PhotoCarousel from "../components/PhotoCarousel";

const images = [
    "https://u-mercari-images.mercdn.net/photos/m80862755279_1.jpg?1774828834",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQC_OPbbCDWa-3rZ28ONF6A1_38cwXOfiULw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQIwNYMOqZG-J9N8jeEhZJv9kK8vgukYfCsw&s"
]

const Redesign: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center">
      <div className="flex flex-col gap-16 py-10 text-clas-negro max-w-7xl">

        {/* PROFILE */}
        <div className="w-full flex flex-col gap-8 px-10">

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

            {/* CONTACT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="w-full text-left p-4 items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <MapPinIcon className="w-7 text-clas flex-shrink-0"/>  
                    <a href="https://maps.app.goo.gl/y4V7jCetxMjZNJW98">Henry Ford 23-Sur, Parque Industrial Dinatech, 83297 Hermosillo, Son. </a>  
                </div>
                <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <EnvelopeIcon className="w-7 text-clas"/>  
                    <div className="flex flex-col">
                        <a>Correo</a> 
                        <a>Correo</a> 
                    </div> 
                </div>
                <div className="w-full p-4 text-left items-center bg-white rounded-xl flex gap-4 shadow transition hover:shadow-md hover:-translate-y-1">
                    <PhoneIcon className="w-7 text-clas"/>  
                     <div className="flex flex-col">
                        <a>Telefono</a>  
                        <a>Telefono</a>  
                     </div>
                </div>

            </div>
        </div>

        {/* ABOUT / PHOTO CAROUSEL */}
        <div className="bg-gray-100">
            <div className="w-full flex flex-col gap-8 px-10 py-20">
            <div className="mx-auto flex flex-col">
                <h2 className="text-3xl">Sobre Nosotros</h2>
            </div>
            <div className="flex flex-row w-full gap-4">
                <div className="text-left flex flex-col justify-between text-lg basis-[60%] bg-blue-100">
                    <p>
                    Martinrea International se especializa en el diseño y fabricación de estructuras ligeras y sistemas de propulsión para la industria automotriz. Su enfoque está en la innovación, la eficiencia y la mejora continua para contribuir al futuro de la movilidad.

                    </p>
                    <div className="flex flex-row justify-between">
                        <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                            <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                            <PlusIcon className="h-6"/>
                            950
                            </div>
                            <div className="text-lg text-gray-500">
                            Empleados
                            </div>
                        </div>

                        <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                            <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                            <PlusIcon className="h-6"/>
                            950
                            </div>
                            <div className="text-lg text-gray-500">
                            Empleados
                            </div>
                        </div>

                        <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                            <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                            <PlusIcon className="h-6"/>
                            98000 m2
                            </div>
                            <div className="text-lg text-gray-500">
                            Capacidad de planta
                            </div>
                        </div>

                        <div className="text-center justify-center space-y-1 transition hover:-translate-y-1">
                            <div className="text-3xl font-semibold flex flex-row gap-2 justify-center items-center">
                            <PlusIcon className="h-6"/>
                            950
                            </div>
                            <div className="text-lg text-gray-500">
                            Empleados
                            </div>
                        </div>

                    </div>
                    <div className="group flex gap-2 items-center text-clas w-fit">
                        <a className="text-sm">Visita nuestro Sitio Web<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-clas rounded-full"></span>
                        </a>
                        <ArrowUpRightIcon className="h-3 group-hover:-translate-y-1 transition-all ease-in-out"/>
                    </div>
                </div>
                <div className="basis-[40%]">
                    <PhotoCarousel images={images}/>
                    {/*TO DO: COLAPSAR SI NO HAY IMÁGENES*/}
                </div>
            </div>

            </div>
        </div>

        {/* CATALOG */}
        <div className="w-full flex flex-col gap-8 px-10">
            <div className="mx-auto flex flex-col">
                <h2 className="text-3xl">Nuestro catálogo</h2>
            </div>

            {/* PRODUCTS */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-left flex flex-col justify-between">
                    <h2 className="text-3xl"><span className="text-clas">Productos</span> destacados</h2>
                    <p>Explora nuestros productos diseñados para ofrecer calidad, confiabilidad y alto desempeño.</p>
                    <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>  
                </div>
            
                {/* PRODUCT CARD */}
                <div>
                <div className="w-full bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <img
                            className="h-40 w-full object-cover"
                            src="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg"
                        />

                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Producto
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>
                {/* PRODUCT CARD */}
                <div>
                <div className="w-full  bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <img
                            className="h-40 w-full object-cover"
                            src="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg"
                        />

                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Producto
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>

                {/* PRODUCT CARD */}
                <div>
                <div className="w-full  bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <img
                            className="h-40 w-full object-cover"
                            src="https://img.lazcdn.com/g/p/bbc5df909767213b8a507c620800d6ef.jpg_720x720q80.jpg"
                        />

                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Producto
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* SERVICES */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* SERVICE CARD */}
                <div>
                <div className="w-full  bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <div className="h-20 w-full bg-gradient-to-r from-clas to-clas-claro text-white flex flex-col items-center justify-center">
                            <WrenchIcon className="h-7 w-7"/>
                        </div>
                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Servicio
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>

                {/* SERVICE CARD */}
                <div>
                <div className="w-full  bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <div className="h-20 w-full bg-gradient-to-r from-clas to-clas-claro text-white flex flex-col items-center justify-center">
                            <WrenchIcon className="h-7 w-7"/>
                        </div>
                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Servicio
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>

                {/* SERVICE CARD */}
                <div>
                <div className="w-full bg-white rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
                        <div className="h-20 w-full bg-gradient-to-r from-clas to-clas-claro text-white flex flex-col items-center justify-center">
                            <WrenchIcon className="h-7 w-7"/>
                        </div>
                        <div className="p-4 flex flex-col gap-1 text-left">
                            <p className="text-base font-medium leading-tight">
                            Servicio
                            </p>

                            <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                            Descripción breve de 2 líneas
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-right items-end flex flex-col justify-between">
                    <h2 className="text-3xl"><span className="text-clas">Servicios</span> destacados</h2>
                    <p>Brindamos soluciones eficientes y adaptadas a tus necesidades.</p>
                    <a className="text-white text-sm bg-clas rounded-full w-fit px-4 py-1 hover:bg-clas/90">Ver más</a>  
                </div>
            </div>

            <div className="group flex gap-2 items-center mx-auto text-clas w-fit">
                <a className="text-sm">Explora el catálogo completo <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-[1px] bg-clas rounded-full"></span>
</a>
                <ArrowUpRightIcon className="h-3 group-hover:-translate-y-1 transition-all ease-in-out"/>
            </div>

        </div>

        {/* CAPACITIES */}
        <div className="bg-white border border-gray-200 rounded-2xl px-10 animate-fade-in-up">
          <h2 className="text-2xl mb-6 text-center">Capacidades</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="text-center space-y-1 transition hover:-translate-y-1"
              >
                <div className="text-2xl font-semibold">
                  500,000+
                </div>
                <div className="text-sm text-gray-500">
                  Producción anual
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="animate-fade-in-up px-10">
          <h2 className="text-2xl mb-6 text-center">Certificaciones</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">

            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="group flex flex-col items-center gap-3 text-center px-6 py-10 transition hover:-translate-y-[2px]">

                  <CheckBadgeIcon className="h-8 text-gray-400 group-hover:text-gray-700 transition group-hover:scale-110" />

                  <div className="text-gray-700 group-hover:text-black transition">
                    Certificación
                  </div>

                  <div className="h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-8 rounded-full"></div>

                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Redesign;