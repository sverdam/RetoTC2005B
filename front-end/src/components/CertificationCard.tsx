import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface CertificationProps {
    name: string;
    color: string;
}

const CertificationCard: React.FC<CertificationProps> = ({ name, color }) => {
    return (
        <div className="w-full bg-white h-full flex flex-col items-center p-4 rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
            <div>
                <CheckCircleIcon style={{ color: color }} className="h-9 stroke-1" />
            </div>
            <h3 className="text-clas-negro m-2 text-center">{name}</h3>
        </div>
    )
}

export default CertificationCard;