import { CheckIcon, PaperAirplaneIcon, StarIcon, ArrowRightIcon, BuildingOffice2Icon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

interface BenefitProps{
    name:string;
    description: string;
}

// Subcomponente beneficio
const Benefit: React.FC<BenefitProps> = ({name, description}) => {
    return(
        <div className="flex flex-col w-xs p-5 items-center justify-center gap-2 bg-white rounded-lg border border-clas-gris shadow-lg">
            <div className="h-15 w-15 flex items-center justify-center rounded-full bg-gradient-to-r from-clas to-clas-claro">
                <CheckIcon className="text-white h-12"/>
            </div>
            <h1 className="px-2 font-semibold text-clas-negro">{name}</h1>
            <p className="text-sm font-light text-clas-gris">{description}</p>
        </div>
    )
}

const PaywallPage: React.FC = () => {
    const navigate = useNavigate();

    return(
        <div className="flex flex-col bg-clas-gris/10 pb-10 items-center">
            <div className="w-screen flex flex-col items-center justify-center gap-5 bg-[radial-gradient(circle,_rgba(59,130,246,0.45)_0%,_rgba(59,130,246,0.18)_25%,_white_65%)]">
                <div className="mt-5 flex justify-center items-center bg-clas-claro rounded-full">
                    <h2 className="p-2 text-white text-md text-center">
                        Únete a CLAS
                    </h2>
                </div>
                <div className="w-lg flex flex-col items-center">
                    <h1 className="px-10 pt-2 text-clas-negro font-bold text-3xl text-center">
                        Conecta. Colabora.
                    </h1>
                    <h1 className="px-10 pt-2 text-clas font-bold text-3xl text-center">
                        Impulsa la industria.
                    </h1>
                    <p className="px-10 pt-5 text-clas-negro/70 text-md text-center">
                        Forma parte de Clúster Automotriz de Sonora y accede a oportunidades que llevan a tu empresa más lejos.
                    </p>
                    <button className=" m-5 flex gap-2 bg-clas rounded-lg p-2 text-white items-center justify-center">
                        <PaperAirplaneIcon className="h-5"/>
                        Solicita información
                    </button>
                </div>
            </div>
            <div className=" mx-75 mt-5 flex flex-col gap-5 items-center">
                <p className="text-clas-negro font-bold text-lg text-center">Accede a nuestros beneficios exclusivos</p>
                <div className="h-0.5 w-10 bg-clas"></div>
                <div className="flex gap-3">
                    <Benefit name="Directorio Exclusivo" description="Conecta con empresas líderes, proovedores y clientes del sector automotriz." />
                    <Benefit name="Búsqueda Avanzada" description="Encuentra socios estratégicos con filtros especializados en capacidades, productos, servicios y certificaciones." />
                    <Benefit name="Networking y Eventos" description="Participa en eventos exclusivos y genera relaciones que impulsan nuevas oportunidades." />
                </div>

                <div className="w-full mt-5 rounded-lg grid grid-cols-2 p-10 gap-10 bg-gradient-to-r from-clas to-clas-claro">
                    <div className="flex flex-col gap-2 items-start pr-5">
                        <div className="flex gap-2">
                            <StarIcon className="text-white h-5"/>
                            <h2 className="text-white font-semibold text-sm">MEMBRESÍA CLAS</h2>
                        </div>
                        <h1 className="font-bold text-white text-2xl">Cotización para tu empresa</h1>
                        <p className="font-light text-white text-sm text-left">
                            Conoce cómo CLAS puede ayudarte a crecer, conectar y ser parte de la cadena de valor de la industria automotriz.
                        </p>
                        <button className=" w-full flex gap-2 bg-white rounded-lg p-2 text-clas items-center justify-center">
                            Solicita información
                            <ArrowRightIcon className="h-5"/>
                        </button>
                    </div>
                    <div className="flex items-center justify-center pl-5">
                        <div className="flex justify-center items-center bg-transparent h-35 w-35 rounded-full border-3 border-clas">
                            <div className="flex justify-center items-center bg-transparent h-30 w-30 rounded-full border-3 border-white">
                                <BuildingOffice2Icon className="text-white h-20"/>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
            
            
        </div>
    )
}

export default PaywallPage;