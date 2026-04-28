import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

interface BenefitProps{
    name:string;
}

// Subcomponente beneficio
const Benefit: React.FC<BenefitProps> = ({name}) => {
    return(
        <div className="flex gap-2 mx-5">
            <CheckIcon className="w-5 h-5 text-clas"/>
            <p className="text-clas-negro">{name}</p>
        </div>
    )
}

const PaywallPage: React.FC = () => {
    const navigate = useNavigate();

    return(
        <div>
            <h2 className="px-10 pt-5 text-clas text-md text-center">
                Únete a CLAS
            </h2>
            <h1 className="px-10 pt-5 text-clas-negro font-bold text-3xl text-center">
                Forma parte de nuestra comunidad
            </h1>
            <h2 className="px-10 pt-5 text-clas-negro/70 text-md text-center">
                Para conocer más sobre productos, capacidades y certificaciones
            </h2>
            <div className=" flex flex-col gap-2 align-center items-center rounded-lg bg-clas-gris/20 mt-5 p-5">
                <p className="text-clas-negro font-bold text-lg text-center">Accede a nuestros beneficios</p>
                <div className="flex flex-col gap-2">
                <Benefit name="Directorio" />
                <Benefit name="Búsqueda Avanzada" />
                <Benefit name="Conexión con Proveedores y Clientes" />
                </div>
                <button className="w-md bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas"
                    onClick={() => navigate("/contacto")}    
                >
                    Contáctanos
                </button>
                
            </div>
        </div>
    )
}

export default PaywallPage;