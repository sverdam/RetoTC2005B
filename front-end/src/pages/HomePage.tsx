import LogoLoop from "../components/LogoLoop";
import ford from "../assets/LogoLoop_Logos/ford.png"
import beyond_movilidad from "../assets/LogoLoop_Logos/beyond_movilidad_compartida.png"
import martinrea from "../assets/LogoLoop_Logos/martinrea.png"
import schnellecke from "../assets/LogoLoop_Logos/schnellecke.png"
import soluciones_industriales from "../assets/LogoLoop_Logos/soluciones_industriales.png"
import suppliers_city from "../assets/LogoLoop_Logos/suppliers_city.png"
import Button from "../components/Button";
import heroImage from "../assets/hero.jpg"

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
                <img src={heroImage} alt="" className="w-full h-[720px] object-cover absolute z-0" ></img>
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

            {/*TO DO: About Us section*/}
            <div className="w-full grid grid-cols-2 grid-rows-1 text-left text-clas-negro">
                <div>
                    <h1 className="text-3xl font-semibold">
                        About Us
                    </h1>
                    <p className="mb-6 text-lg">
                        CLAS impulsa el crecimiento de la industria automotriz en el estado, conectando empresas, talento y conocimiento en un solo ecosistema.
                    </p>

                    <h2 className="text-xl font-semibold">
                        🌟 Visión
                    </h2>
                    <p className="mb-6 text-lg">
                        Posicionar a Sonora como el principal clúster automotriz de México, destacado por su innovación, sostenibilidad y calidad.
                    </p>

                    <h2 className="text-xl font-semibold">
                        ⚙️ Misión
                    </h2>
                    <p className="mb-6 text-lg">
                        Ser el motor que fortalece la competitividad del sector, fomentando colaboración y desarrollo continuo.
                    </p>

                    <h2 className="text-xl font-semibold">
                        🤝 Comunidad
                    </h2>
                    <p className="mb-6 text-lg">
                        La fuerza de CLAS está en su gente: industria, academia y gobierno trabajando juntos para convertir el crecimiento individual en éxito compartido.
                    </p>
                </div>
                <div>
                    <img src='abtus.jpg' alt='about us image'></img>
                </div>
            </div>

            {/*TO DO: Our Team section*/}
            <div className="w-full grid grid-cols-2 grid-rows-1 text-left text-clas-negro">
                <div>
                    <h1 className="text-3xl font-semibold">
                    Nuestro Equipo
                    </h1>
                    <p className="mb-6 text-lg">
                        Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora.
                    </p>
                </div>
                    
            </div>

            {/*TO DO: Add contact details to Contact and Location section*/}
            
            <div className="w-full text-left text-clas-negro">
                <div>
                    <h1 className="text-3xl font-semibold">
                    Contáctanos
                    </h1>
                    <p className="mb-6 text-lg">Whether you're visiting us in person or simply want to know where we're based, here's some helpful information about our location</p>
                </div>
                <div className="h-[340px]">
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