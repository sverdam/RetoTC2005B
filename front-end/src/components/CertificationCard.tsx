import { CheckIcon } from "@heroicons/react/24/outline";

interface CertificationProps{
    name: string;
}

const CertificationCard: React.FC<CertificationProps> = ({name}) => {
    return (
        <div  className="w-full bg-white flex flex-col items-center p-4 rounded-xl overflow-hidden shadow transition hover:shadow-md hover:-translate-y-1">
            <div className="rounded-full w-7 h-7 border border-clas m-1">
                <CheckIcon className="text-clas p-1"/>
            </div>
            <h3 className="text-clas-negro m-2 text-center">{name}</h3>
        </div>
    )
}

export default CertificationCard;