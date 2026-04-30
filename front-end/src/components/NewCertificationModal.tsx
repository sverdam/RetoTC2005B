import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import type { NewCertificationInput, Certification } from "clas-types";
import { useEffect, useState } from "react";

interface Props {
    isCertificationOpen: boolean;
    onClose: () => void;
    certification: NewCertificationInput | Certification;
    setCertification: (newCertification: any) => void;
}

const NewCertificationModal: React.FC<Props> = ({ isCertificationOpen, onClose, certification, setCertification }) => {
    const [newCertification, setNewCertification] = useState<NewCertificationInput | Certification>(certification);
    const isEditing = 'id' in certification && certification.id;

    const [errors, setErrors] = useState<{ name?: boolean }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!certification.name.trim()) newErrors.name = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        setNewCertification(certification);
    }, [certification])
    return (
        <Dialog open={isCertificationOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        {isEditing ? "Editar Certificación" : "Nueva Certificación"}
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Certificación
                                {errors.name && <span className="text-red-400 text-sm font-normal">* Campo obligatorio</span>}
                            </label>
                            <input type="text"
                                required
                                value={newCertification.name}
                                placeholder="Nombre de la certificación..."
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => setNewCertification({ ...newCertification, ["name"]: e.target.value })}>
                            </input>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onClose()}
                            className="bg-white rounded-lg py-1 px-2 border-2 border-red-400 text-red-400 hover:bg-clas-gris/20 focus:ring-2 focus:ring-rojo-600">
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (!validate) return;
                                setCertification(newCertification);
                                onClose();
                            }}
                            className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            {isEditing ? "Guardar Cambios" : "Agregar Certificación"}
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default NewCertificationModal;