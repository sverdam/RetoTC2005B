import { CheckIcon } from "@heroicons/react/24/outline";

interface CertificationProps{
    name: string;
}

const CertificationCard: React.FC<CertificationProps> = ({name}) => {
    return (
        <div className="bg-white flex flex-col flex-wrap justify-center items-center rounded-xl border border-clas-gris h-30 p-2 w-full">
            <div className="rounded-full w-7 h-7 border border-clas m-1">
                <CheckIcon className="text-clas p-1"/>
            </div>
            <h3 className="text-clas-negro m-2 text-center">{name}</h3>
        </div>
    )
}

export default CertificationCard;