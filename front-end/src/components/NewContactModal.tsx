import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react"
import type { NewContactInput, Contact } from "clas-types";
import { useEffect, useState } from "react";

interface Props{
    isContactOpen: boolean;
    onClose: () => void;
    contact: NewContactInput | Contact;
    setContact: (newContact: any) => void;
}

const NewContactModal: React.FC<Props> = ({ isContactOpen, onClose, contact, setContact }) => {
    const [formContact, setFormContact] = useState<NewContactInput | Contact>(contact);
    const handleChange = (field:keyof NewContactInput, value:any) => {
            setFormContact((prev) => ({...prev, [field]: value}))
    }

    const isEditing = 'id' in contact && contact.id;
    
    useEffect(() => {
        setFormContact(contact)
    }, [contact])


    return(
        <Dialog open={isContactOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        {isEditing ? "Editar Contacto" : "Nuevo Contacto" }
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Puesto
                            </label>
                            <input type="text" 
                                required
                                value={formContact.position}
                                placeholder="Puesto..." 
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("position",e.target.value)}>
                            </input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Tipo de Contacto
                            </label>
                            <select 
                                required
                                value={formContact.type || ""}
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("type", e.target.value)}>
                                <option
                                    value={""} disabled>
                                    Selecciona una opción...
                                </option>
                                <option
                                    value={"email"}>
                                    Correo electrónico
                                </option>
                                <option
                                    value={"phone"}>
                                    Número de teléfono
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Contacto
                            </label>
                            <input 
                                required
                                value={formContact.contactInfo}
                                type="text" 
                                placeholder="Teléfono o correo" 
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("contactInfo", e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={onClose}
                            className="bg-white rounded-lg py-1 px-2 border-2 border-red-400 text-red-400 hover:bg-clas-gris/20 focus:ring-2 focus:ring-rojo-600">
                            Cancelar
                        </button>
                        <button 
                            onClick={() => {
                                setContact(formContact);
                                onClose();
                            }}
                            className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            {isEditing ? "Guardar Cambios" : "Agregar Contacto"}
                        </button>
                    </div>
                    
                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default NewContactModal;