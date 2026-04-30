import type { Company, NewCompanyInput } from "clas-types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props{
    company: NewCompanyInput | null | Company;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteCompanyConfirmModal: React.FC<Props> = ({ company, onClose, onConfirm}) => {
    return(
        <Dialog open={company !== null} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro*/}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-10">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-sm font-semibold text-gray-900">
                                Eliminar Compañía
                            </DialogTitle>
                            <p className="mt-1 text-sm text-gray-600">
                                ¿Está seguro de querer eliminar {" "}
                                <span className="font-medium text-gray-900">
                                    {company?.name}
                                </span>?
                                Esta acción no se puede deshacer.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button onClick={onConfirm}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-70">
                            Eliminar
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default DeleteCompanyConfirmModal;