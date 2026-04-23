import { useNavigate } from "react-router";
import { PlusIcon } from "@heroicons/react/24/outline";

const NewDirectoryCardButton: React.FC = () => {
	const navigate = useNavigate();
	
	return(
		<div className="p-2 border border-clas rounded-lg flex flex-col gap-3 items-start"
		>
			<button className="w-full h-full bg-clas"
				onClick={() => navigate("/empresa/editar")}
			>
				<PlusIcon className="h-7 w-7 text-white" />
			</button>
			
		</div>
	);
};

export default NewDirectoryCardButton;