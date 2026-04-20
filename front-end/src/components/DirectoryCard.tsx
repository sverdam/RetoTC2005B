import type { Company } from "clas-types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
    company: Company;
    // onClose: () => void;
    // onEdit: () => void;
}
const DirectoryCard: React.FC<Props> = ({ company }) => {
    console.log(company)
    return (
        <div className="p-2 border border-gray-200 rounded-lg flex flex-col gap-3 items-start">
            {/* Logo */}
            <img 
                src={!company?.logo ? "../src/assets/logoipsum.png" : String(company.logo.path)} // TODO: Arreglar esto!!
                alt={company.name}
                className="w-full h-25 object-contain"
            />
            <div className="flex gap-2 items-center">
                <InformationCircleIcon className="h-5 w-5 text-gray-400"/>
                <h4 className="text-gray-400">{company.memberType}</h4>
                <h4 className="text-gray-400">|</h4>
                <h4 className="text-gray-400">Tier {company.tier}</h4>
            </div>
            <h2 className="text-lg font-medium text-left">
                {company.name}
            </h2>
            <p className="text-gray-400 text-left">{!company.location ? "No existe dirección ingresada aún..." :company.location.address }</p>

            <button className="font-medium text-sm text-gray-400">
                Leer más
            </button>
        </div>
    );
}

export default DirectoryCard;