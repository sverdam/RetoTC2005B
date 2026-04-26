import type { Company } from "../types/types";
import { InformationCircleIcon, StarIcon } from "@heroicons/react/24/outline";

interface Props {
    company: Company;
    // onClose: () => void;
    // onEdit: () => void;
}
const DirectoryCard: React.FC<Props> = ({ company }) => {
    const logo = company.logo;
    const hasLogo = logo && (typeof logo === 'object');

    return (
        <div className="p-4 border border-gray-200 rounded-lg flex flex-col gap-4 items-start bg-white shadow-sm">
            <div className="w-full h-40 overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
                {hasLogo ? (
                    <div className="text-center text-sm text-slate-600 px-3">
                        {logo.originalName ? `Logo: ${logo.originalName}` : "Logo registrado"}
                    </div>
                ) : (
                    <span className="text-sm text-slate-400">Sin logo</span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 items-center text-sm text-slate-500">
                <InformationCircleIcon className="h-5 w-5"/>
                <span>{company.memberType}</span>
                <span className="text-slate-300">|</span>
                <span>Nivel {company.tier}</span>
            </div>

            <h2 className="text-lg font-semibold text-slate-800">{company.name}</h2>
            <p className="text-sm text-slate-500">{company.description}</p>
            <p className="text-sm text-slate-400">
                {company.location?.address ?? 'Sin dirección registrada'}
            </p>

            <button className="mt-auto font-medium text-sm text-clas hover:text-clas-claro">
                Ver detalles
            </button>
        </div>
    );
}

export default DirectoryCard;