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
        <div className="text-clas-negro p-6 border border-gray-200 rounded-xl flex flex-col gap-3 items-start shadow transition hover:shadow-md hover:-translate-y-1">
            {/* Logo */}
            <img 
                src={!company?.logo ? "../src/assets/logoipsum.png" : `${getFileURLById(company.logo.id)}`} // TODO: Arreglar esto!!
                alt={company.name}
                className="w-full h-25 object-contain"
            />

            {/* COMPANY INFO */}
            <div className="flex gap-2 text-sm items-center">
                <InformationCircleIcon className="h-5 w-5 text-gray-400"/>
                <h4 className="text-gray-400">{ formatMember(company.memberType)}</h4>
                <h4 className="text-gray-400">|</h4>
                <h4 className="text-gray-400">{company.tier === 0 ? 'OEM' : `Tier ${company.tier}`}</h4>
            </div>

            {/* NAME */}
            <div className="h-[3.5rem] flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium text-left line-clamp-2">
                {company.name}
              </h2>
            </div>
            

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-left sm:line-clamp-3 lg:line-clamp-4">{!company.description ? "Conoce a nuestra empresa" :company.description }</p>

            {/* CTA BUTTON */}
            <div>
              {user.role === "unverified"
              ? <button 
              onClick={() => navigate(`/membresia`)}
              className="flex w-fit gap-2 items-center text-clas font-medium text-sm hover:text-clas-claro focus:ring-2 focus:ring-clas">
                  Unirse a CLAS
                  <ArrowRightIcon className="h-4 w-4"/>
              </button>
              : <button 
              onClick={() => navigate(`/empresa/${company.id}`)}
                  className="flex w-fit gap-2 items-center text-clas font-medium text-sm hover:text-clas-claro focus:ring-2 focus:ring-clas">
                  Leer más
                  <ArrowRightIcon className="h-4 w-4"/>
              </button>
              }
            </div>
        </div>
    );
}

export default DirectoryCard;