import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import type { NewProductInput, Service } from "clas-types";
import { useEffect, useState } from "react";

interface Props {
    isServiceOpen: boolean;
    onClose: () => void;
    service: NewProductInput | Service;
    setService: (newService: any) => void;

}

const ServiceModal: React.FC<Props> = ({ isServiceOpen, onClose, service, setService }) => {

    const [formService, setFormService] = useState<NewProductInput | Service>(service);

    const handleChange = (field: keyof NewProductInput, value: any) => {
        setFormService((prev) => ({ ...prev, [field]: value }))
    }

    {/* Product Image Handling */ }
    const isEditing = 'id' in service && service.id;

    const [errors, setErrors] = useState<{ name?: boolean, description?: boolean}>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formService.name.trim()) newErrors.name = true;
        if (!formService.description.trim()) newErrors.description = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        setFormService(service);
    }, [service])
    return (
        <Dialog open={isServiceOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Nombre
                            </label>
                            <input type="text"
                                required
                                value={formService.name}
                                placeholder="Nombre del producto..."
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("name", e.target.value)}>
                            </input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Descripción
                            </label>
                            <input type="text"
                                required
                                value={formService.description}
                                placeholder="Descripción del producto..."
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("description", e.target.value)}>
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
                                setService(formService)
                                onClose();
                            }}
                            className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            {isEditing ? "Guardar Cambios" : "Agregar Servicio"}
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default ServiceModal;