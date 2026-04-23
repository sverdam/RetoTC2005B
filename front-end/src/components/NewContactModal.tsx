import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react"

interface Props{
    isContactOpen: boolean;
    onClose: () => void;
}

const NewContactModal: React.FC<Props> = ({ isContactOpen, onClose }) => {
    return(
        <Dialog open={isContactOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        Nuevo Contacto
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Puesto
                            </label>
                            <input type="text" 
                                placeholder="Puesto..." 
                                className="w-full border-2 border-clas-gris rounded-lg p-2">
                            </input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Contacto
                            </label>
                            <input type="text" 
                                placeholder="Teléfono o correo" 
                                className="w-full border-2 border-clas-gris rounded-lg p-2">
                            </input>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white rounded-lg py-1 px-2 border-2 border-red-400 text-red-400 hover:bg-clas-gris/20 focus:ring-2 focus:ring-rojo-600">
                            Cancelar
                        </button>
                        <button className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            Agregar
                        </button>
                    </div>
                    
                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default NewContactModal;