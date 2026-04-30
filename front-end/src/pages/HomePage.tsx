import LogoLoop from "../components/LogoLoop";
import ford from "../assets/LogoLoop_Logos/ford.png"
import beyond_movilidad from "../assets/LogoLoop_Logos/beyond_movilidad_compartida.png"
import martinrea from "../assets/LogoLoop_Logos/martinrea.png"
import schnellecke from "../assets/LogoLoop_Logos/schnellecke.png"
import soluciones_industriales from "../assets/LogoLoop_Logos/soluciones_industriales.png"
import suppliers_city from "../assets/LogoLoop_Logos/suppliers_city.png"
import Button from "../components/Button";
import heroImage from "../assets/hero.jpeg"
import type { LandingPage } from "clas-types";
import { useEffect, useState } from "react";
import { getLandingPage } from "../api/LandingPageApi";
import { getLogos } from "../api/fileModuleAPI";
import ProfileCard from "../components/ProfileCard";
import PhotoCarousel from "../components/PhotoCarousel";
import { EyeIcon, PuzzlePieceIcon, StarIcon } from "@heroicons/react/24/outline";

const companyLogos = [
    { src: ford, alt: "Ford" },
    { src: beyond_movilidad, alt: "Beyond Movilidad Compartida" },
    { src: martinrea, alt: "Martinrea" },
    { src: schnellecke, alt: "Schnellecke Logistics" },
    { src: soluciones_industriales, alt: "Soluciones Industriales" },
    { src: suppliers_city, alt: "Suppliers City" },
];

const carouselImages = [
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-204_(2048)-66bb25f.jpg/:/rs=w:1160,h:773",
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-42_(2048)-07244f7.jpg/:/rs=w:1160,h:773",
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-100_(2048)-446be96.jpg/:/rs=w:1160,h:773",
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-55_(2048)-8ae623b.jpg/:/rs=w:1160,h:773",
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-65_(2048)-f10808f.jpg/:/rs=w:1160,h:773",
    "https://img1.wsimg.com/isteam/ip/592f6b3f-6860-4413-a097-d94fc382c4b8/SM1-132_(2048)-6d29971.jpg/:/rs=w:1160,h:773",
]

interface LogoInterface {
    src: string,
    alt: string
}

const HomePage: React.FC = () => {

    const [info, setInfo] = useState<LandingPage | null>(null);
    const [dbLogos, setDbLogos] = useState<LogoInterface[]>(companyLogos);

    useEffect(() => {
        getLandingPage().then((result) => {
            setInfo(result);
        });
    }, []);

    useEffect(() => {
        getLogos().then(
            result => setDbLogos(result)
        )
    }, [])

    return (
        <div className="flex flex-col gap-20 items-center">

            <div className="relative h-[720px] w-full flex items-center">
                <img src={heroImage} alt="hero image" className="w-full h-[720px] object-cover absolute z-0" ></img>
                <div className="animate-fade-up relative z-10 max-w-2xl px-14 text-left text-white">
                    <h1 className="text-5xl font-medium mb-4">
                        Impulsando el futuro automotriz de Sonora
                    </h1>
                    <p className="mb-6 text-lg">
                        {info ? info.bannerText : "Colaboración que impulsa la innovación, competitividad y el crecimiento sostenible del sector automotriz sonorense."}
                    </p>
                    <Button text="Conoce nuestro directorio" to="/directorio" />
                </div>
            </div>

            <LogoLoop
                logos={dbLogos}
                speed={100}
                direction="left"
                logoHeight={34}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Technology partners"
            />

            {/* About Us Section */}
            <div className="flex flex-col gap-6 px-14 text-clas-negro">
                <div className="animate-fade-up w-full flex flex-col md:flex-row gap-x-10 gap-y-6 text-left">
                    <div className="basis-[60%]">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                                    ¿Quiénes somos?
                                </h1>

                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {info ? info.mainText : "Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 basis-[40%]">
                        <PhotoCarousel images={carouselImages}/>
                        <p className="text-sm text-gray-500 w-full text-right">Galería Sonora Move 2026</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col gap-2 w-full items-start">
                            <div className="flex gap-2 text-clas w-full items-center justify-start">
                                <EyeIcon className="h-6 flex-shrink-0"/>
                                <h2 className="text-xl font-medium">Visión</h2>
                            </div>
                            <p className="text-lg text-left text-gray-700">
                                {info ? info.visionText : "Posicionar a Sonora como el principal clúster automotriz de México, destacado por su innovación, sostenibilidad y calidad."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 w-full items-start">
                            <div className="flex gap-2 text-clas w-full items-center justify-start">
                                <StarIcon className="h-6 flex-shrink-0"/>
                                <h2 className="text-xl font-medium">Misión</h2>
                            </div>
                            <p className="text-lg text-left text-gray-700">
                                {info ? info.missionText : "Ser el motor que fortalece la competitividad del sector, fomentando colaboración y desarrollo continuo."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 w-full items-start">
                            <div className="flex gap-2 text-clas w-full items-center justify-start">
                                <PuzzlePieceIcon className="h-6 flex-shrink-0"/>
                                <h2 className="text-xl font-medium">Comunidad</h2>
                            </div>
                            
                            <p className="text-lg text-left text-gray-700">
                                {info ? info.communityText : "La fuerza de CLAS está en su gente: industria, academia y gobierno trabajando juntos para convertir el crecimiento individual en éxito compartido."}
                            </p>
                        </div>
                </div>
            </div>
            

            {/*Our Team section*/}
            <div className="animate-fade-up w-full bg-gray-50 py-20 px-14">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                            Conoce al equipo <span className="text-clas">CLAS</span>
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {info ? info.aboutUsText : "Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora."}
                        </p>
                    </div>

                    {/*Profile Cards*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-between">
                        <ProfileCard name="Juan Carlos Campoy Ramos" position="Presidente" company="New Concept Technology" mail="presidencia@clas.com.mx" image="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-8fa2f20.png/:/cr=t:14.81%25,l:5.78%25,w:84.75%25,h:51.43%25/rs=w:730,h:730,cg:true,m" />
                        <ProfileCard name="Mario Alberto Montiel Guzmán" position="Vicepresidente" company="Schnellecke Logistics México" mail="vicepresidencia@clas.com.mx" image="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2013.07.50_b.jpg/:/cr=t:0%25,l:15.14%25,w:66.81%25,h:70.43%25/rs=w:730,h:730,cg:true,m" />
                        <ProfileCard name="Diego Cacho Campillo" position="Tesorero" company="Grupo Industrial ESD" mail="tesoreria@clas.com.mx" image="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Diego%20Cacho.jpg/:/cr=t:2.17%25,l:0%25,w:100%25,h:71.41%25/rs=w:365,h:365,cg:true/qt=q:14" />
                        <ProfileCard name="Margarita Bejarano Celaya" position="Directora" company="CLAS" mail="direccion@clas.com.mx" image="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-074403d.png/:/cr=t:0%25,l:15.07%25,w:48.08%25,h:32.04%25/rs=w:365,h:365,cg:true,m/qt=q:14" />
                    </div>
                </div>
            </div>


            {/*News section*/}
            <div className="animate-fade-up w-full px-14">
                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                            Últimas noticias
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            PDF NEWSLETTER
                        </p>
                    </div>
                </div>
            </div>

            {/*TO DO: Add contact details to Contact and Location section*/}
            <div className="animate-fade-up w-full flex flex-col gap-6 px-14 py-20 pb-20 bg-gray-50">
                <div className="flex flex-col gap-4">
                    <div>
    
                        <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                            Acércate a CLAS
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {info ? info.contactText : "¿Te interesa formar parte del Cluster Automotriz de Sonora? Acércate a nosotros para obtener más información."}
                        </p>
                    </div>
                </div>

                {/*CONTACTS*/}
                <div className="animate-fade-up w-full justify-center grid grid-cols-1 sm:grid-cols-3 sm:px-30 gap-10">
                    <div>
                        <a href="https://maps.app.goo.gl/ux6pGm7EbhTyhdr86" className="text-gray-500 text-md hover:underline">
                            Obrero Mundial 10, 83210 Hermosillo, Sonora, Mexico
                        </a>
                    </div>

                    <div>
                        <a href="mailto:direccion@clas.com.mx" className="text-gray-500 text-md hover:underline">
                            direccion@clas.com.mx
                        </a>
                    </div>

                    <div>
                        <a href="mailto:tesoreria@clas.com.mx" className="text-gray-500 text-md hover:underline">
                            tesoreria@clas.com.mx
                        </a>
                    </div>
                </div>

                {/*LOCATION*/}
                <div className="h-[380px]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.390661977626!2d-110.99815782502202!3d29.094145875415716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce8543be63d777%3A0xcbfc449d5fa1bb40!2sCl%C3%BAster%20Automotriz%20de%20Sonora!5e0!3m2!1ses-419!2smx!4v1776759191201!5m2!1ses-419!2smx"
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

        </div>
    );
};

export default HomePage;