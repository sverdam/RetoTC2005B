import type { Company, UserProfile } from "clas-types";
import { InformationCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { getFileURLById } from "../api/fileModuleAPI";


interface Props {
    company: Company;
    user: UserProfile
    // onClose: () => void;
    // onEdit: () => void;
}

  const formatMember = (member: string) => {
    switch (member){
      case "Affiliate":
        return "Afiliado"

      case "Associate":
        return "Asociado"

      default:
        return member
    }
  }

const DirectoryCard: React.FC<Props> = ({ company, user }) => {
    const navigate = useNavigate();
    return company.memberType === "Admin" ? <></> : (
        <div className="p-2 border border-gray-200 rounded-lg flex flex-col gap-3 items-start">
            {/* Logo */}
            <img 
                src={!company?.logo ? "../src/assets/logoipsum.png" : `${getFileURLById(company.logo.id)}`} // TODO: Arreglar esto!!
                alt={company.name}
                className="w-full h-25 object-contain"
            />
            <div className="flex gap-2 items-center">
                <InformationCircleIcon className="h-5 w-5 text-gray-400"/>
                <h4 className="text-gray-400">{ formatMember(company.memberType)}</h4>
                <h4 className="text-gray-400">|</h4>
                <h4 className="text-gray-400">{company.tier === 0 ? 'OEM' : `Tier ${company.tier}`}</h4>
            </div>
            <h2 className="text-lg font-medium text-left">
                {company.name}
            </h2>
            <p className="text-gray-400 text-left">{!company.locations ? "No existe dirección ingresada aún..." :company.locations.address }</p>

            {user.role === "unverified"
            ? <button 
            onClick={() => navigate(`/`)}
            className="bg-clas rounded-lg py-1 px-2 text-white font-medium text-sm hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                Unirse a CLAS
            </button>
            : <button 
            onClick={() => navigate(`/empresa/${company.id}`)}
            className="bg-clas rounded-lg py-1 px-2 text-white font-medium text-sm hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                Leer más
                <ArrowRightIcon className="h-4 w-4"/>
            </button>
            }
            
        </div>
    );
}

export default DirectoryCard;