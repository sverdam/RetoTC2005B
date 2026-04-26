import LogoLoop from "../components/LogoLoop";
import ford from "../assets/LogoLoop_Logos/ford.png"
import beyond_movilidad from "../assets/LogoLoop_Logos/beyond_movilidad_compartida.png"
import martinrea from "../assets/LogoLoop_Logos/martinrea.png"
import schnellecke from "../assets/LogoLoop_Logos/schnellecke.png"
import soluciones_industriales from "../assets/LogoLoop_Logos/soluciones_industriales.png"
import suppliers_city from "../assets/LogoLoop_Logos/suppliers_city.png"
import Button from "../components/Button";
import heroImage from "../assets/hero.jpeg"

const companyLogos = [
  { src: ford, alt: "Ford"},
  { src: beyond_movilidad, alt: "Beyond Movilidad Compartida"},
  { src: martinrea, alt: "Martinrea"},
  { src: schnellecke, alt: "Schnellecke Logistics"},
  { src: soluciones_industriales, alt: "Soluciones Industriales"},
  { src: suppliers_city, alt: "Suppliers City"},
];

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-20 items-center">

            <div className="relative h-[720px] w-full flex items-center">
                <img src={heroImage} alt="landing background" className="w-full h-[720px] object-cover absolute z-0" ></img>
                <div className="relative z-10 max-w-2xl px-10 text-left text-white">
                    <h1 className="text-5xl font-bold mb-4">
                    Impulsando el futuro automotriz de Sonora
                    </h1>
                    <p className="mb-6 text-lg">
                    Colaboración que impulsa la innovación, competitividad y el crecimiento sostenible del sector automotriz sonorense.
                    </p>
                    <Button text="Conoce nuestro directorio" to="/directorio" />
                </div>
            </div>

            <LogoLoop
                logos={companyLogos}
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
           <div className="w-full flex gap-10 text-left text-clas-negro px-10">

            <div className="basis-[60%]">
                <div className="flex flex-col gap-4">
                <div>
                    <p className="text-clas font-medium mb-2">
                    Sobre Nosotros
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                    ¿Quiénes somos?
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed">
                    Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora.
                    </p>
                </div>
                </div>

                <div className="mt-8 space-y-6">
                <div>
                    <h2 className="text-xl font-medium">🌟 Visión</h2>
                    <p className="text-lg text-gray-700">
                    Posicionar a Sonora como el principal clúster automotriz de México, destacado por su innovación, sostenibilidad y calidad.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-medium">⚙️ Misión</h2>
                    <p className="text-lg text-gray-700">
                    Ser el motor que fortalece la competitividad del sector, fomentando colaboración y desarrollo continuo.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-medium">🤝 Comunidad</h2>
                    <p className="text-lg text-gray-700">
                    La fuerza de CLAS está en su gente: industria, academia y gobierno trabajando juntos para convertir el crecimiento individual en éxito compartido.
                    </p>
                </div>
                </div>
            </div>

            <div className="basis-[40%]">
                <img
                className="h-full w-full object-cover rounded-3xl"
                src="https://www.usnews.com/object/image/00000190-bd0f-d31e-abf1-fdcf4dcf0000/4187-2025gv80.jpg?update-time=1721158814747&size=responsive970"
                alt="CLAS"
                />
            </div>

            </div>

            {/*Our Team section*/}
            <div className="w-full px-10">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-clas font-medium mb-2">
                        Nuestro equipo
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                        Conoce al equipo CLAS
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                        Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora.
                        </p>
                    </div>
                </div>

                {/*Profile Cards*/}
                <div className="flex flex-row justify-between">
                    <div className="w-68 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center"> 
                    {/* Profile Image */}
                    <div className="w-34 h-34">
                        <img
                        src="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-8fa2f20.png/:/cr=t:14.81%25,l:5.78%25,w:84.75%25,h:51.43%25/rs=w:730,h:730,cg:true,m"
                        alt="JC"
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Profile Info */}
                    <h3 className="text-clas-negro font-medium text-lg">
                        Juan Carlos Campoy Ramos
                    </h3>
                    <h4 className="text-clas text-sm font-medium mb-1">
                        Presidente
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">
                        New Concept Technology
                    </p>
                    <a href="mailto:presidencia@clas.com.mx" className="text-clas text-sm font-medium hover:underline">
                        presidencia@clas.com.mx
                    </a>
                    </div>

                    <div className="w-68 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center">     
                    {/* Profile Image */}
                    <div className="w-34 h-34">
                        <img
                        src="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2013.07.50_b.jpg/:/cr=t:0%25,l:15.14%25,w:66.81%25,h:70.43%25/rs=w:730,h:730,cg:true,m"
                        alt="MM"
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Profile Info */}
                    <h3 className="text-clas-negro font-medium text-lg">
                        Mario Alberto Montiel Guzmán
                    </h3>
                    <h4 className="text-clas text-sm font-medium mb-1">
                        Vicepresidente
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">
                        Vicepresidente
                    </p>
                    <a href="mailto:vicepresidencia@clas.com.mx" className="text-clas text-sm font-medium hover:underline">
                        vicepresidencia@clas.com.mx
                    </a>
                    </div>

                    <div className="w-68 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center"> 
                    {/* Profile Image */}
                    <div className="w-34 h-34">
                        <img
                        src="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/Diego%20Cacho.jpg/:/cr=t:2.17%25,l:0%25,w:100%25,h:71.41%25/rs=w:365,h:365,cg:true/qt=q:14"
                        alt="DC"
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Profile Info */}
                    <h3 className="text-clas-negro font-medium text-lg">
                        Diego Cacho Campillo
                    </h3>
                    <h4 className="text-clas text-sm font-medium mb-1">
                        Tesorero
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">
                        Grupo Industrial ESD
                    </p>
                    <a href="mailto:tesoreria@clas.com.mx" className="text-clas text-sm font-medium hover:underline">
                        tesoreria@clas.com.mx
                    </a>
                    </div>

                    <div className="w-68 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center"> 
                    {/* Profile Image */}
                    <div className="w-34 h-34">
                        <img
                        src="https://img1.wsimg.com/isteam/ip/dcf17818-4267-46ce-a60c-cfa6c45c9047/blob-074403d.png/:/cr=t:0%25,l:15.07%25,w:48.08%25,h:32.04%25/rs=w:365,h:365,cg:true,m/qt=q:14"
                        alt="MB"
                        className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Profile Info */}
                    <h3 className="text-clas-negro font-medium text-lg">
                        Margarita Bejarano Celaya
                    </h3>
                    <h4 className="text-clas text-sm font-medium mb-1">
                        Directora
                    </h4>
                    <p className="text-gray-500 text-sm mb-3">
                        CLAS
                    </p>
                    <a href="mailto:direccion@clas.com.mx" className="text-clas text-sm font-medium hover:underline">
                        direccion@clas.com.mx
                    </a>
                    </div>
                </div>
            </div>

            {/*TO DO: Add contact details to Contact and Location section*/}
            <div className="w-full flex flex-col gap-6 px-10">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-clas font-medium mb-2">
                        Contacto
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-clas-negro mb-4">
                        Acércate a CLAS
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                       ¿Te interesa formar parte del Cluster Automotriz de Sonora? Acércate a nosotros para obtener más información.
                        </p>
                    </div>
                </div>

                {/*CONTACTS*/}
                <div className="w-full justify-center flex flex-row gap-10">
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

<div></div>
        </div>
    );
};

export default HomePage;