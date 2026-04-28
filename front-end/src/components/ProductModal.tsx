import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react"
import FileUpload from "./FileUpload";
import type { NewProductInput} from "clas-types";
import { useState } from "react";

interface Props{
    isProductOpen: boolean;
    onClose: () => void;
    product: NewProductInput;
    setProduct: (newProduct: NewProductInput) => void;

}

const ProductModal: React.FC<Props> = ({ isProductOpen, onClose , product, setProduct}) => {
    
    const [formProduct, setFormProduct] = useState<NewProductInput>(product);

    const handleChange = (field:keyof NewProductInput, value:any) => {
        setFormProduct((prev) => ({...prev, [field]: value}))
    }

    {/* Product Image Handling */}
    const handleProductImageSelect = (file: File) => {
        console.log(file);
    };
    return(
        <Dialog open={isProductOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        Nuevo Producto
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Nombre
                            </label>
                            <input type="text" 
                                required
                                value={formProduct.name}
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
                                value={formProduct.description}
                                placeholder="Descripción del producto..." 
                                className="w-full border-2 border-clas-gris rounded-lg p-2"
                                onChange={(e) => handleChange("description", e.target.value)}>
                            </input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Imagen del producto
                            </label>
                            <FileUpload onFileSelect={handleProductImageSelect} />
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
                            setProduct(formProduct)
                            onClose();
                        }}
                        className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            Agregar Producto
                        </button>
                    </div>
                    
                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default ProductModal;