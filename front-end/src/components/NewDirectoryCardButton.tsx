import { useNavigate } from "react-router";
import { PlusIcon } from "@heroicons/react/24/outline";

const NewDirectoryCardButton: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-w-50 min-h-50 border-2 border-clas rounded-lg flex flex-col gap-3 items-start hover:bg-clas/20"
		>
			<button className="w-full h-full flex justify-center items-center hover:bg-clas/20"
				onClick={() => navigate("/empresa/editar")}
			>
				<PlusIcon className="h-10 w-10 text-clas" />
			</button>

		</div>
	);
};

export default NewDirectoryCardButton;