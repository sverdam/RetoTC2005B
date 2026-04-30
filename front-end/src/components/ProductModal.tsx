import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import FileUpload from "./FileUpload";
import type { NewProductInput, Product, ProductBundleInput } from "clas-types";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
    isProductOpen: boolean;
    onClose: () => void;
    product: NewProductInput | Product | ProductBundleInput;
    setProduct: (newProduct: any) => void;

}

function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const ProductModal: React.FC<Props> = ({ isProductOpen, onClose, product, setProduct }) => {

    const [formProduct, setFormProduct] = useState<NewProductInput | Product | ProductBundleInput>(product);

    const handleChange = (field: keyof NewProductInput, value: any) => {
        setFormProduct((prev) => ({ ...prev, [field]: value }))
    }
    {/* Product Image Handling */ }
    const handleProductImageSelect = (file: File) => {
        console.log("Handle Product Image?");
        setFormProduct((prev) => {
            const newProductObject: ProductBundleInput = {
                ...prev,
                file: file,
                position: randomInt(1, 10000000)
            }
            console.log("NEW PRODUCT OBJECT");
            console.log(newProductObject);
            return newProductObject;
        }

        )
    };

    const isEditing = 'id' in product && !!product.id;

    const [errors, setErrors] = useState<{ name?: boolean, description?: boolean, file?: boolean }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!formProduct.name.trim()) newErrors.name = true;
        if (!formProduct.description.trim()) newErrors.description = true;
        if (!isEditing && !('file' in formProduct && formProduct.file)) newErrors.file = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        setFormProduct(product);
    }, [product])
    return (
        <Dialog open={isProductOpen} onClose={onClose} className="relative z-50">
            {/* Overlay Oscuro */}
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            {/* Panel Centrado */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-sm rounded-lg bg-white shadow-xl p-6 space-y-4">
                    <DialogTitle className="text-xl font-semibold text-clas-negro">
                        {isEditing ? "Editar Producto" : "Nuevo Producto"}
                    </DialogTitle>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-clas-negro">
                                Nombre
                                {errors.name && <span className="text-red-400 text-sm font-normal">* Campo obligatorio</span>}
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
                                {errors.description && <span className="text-red-400 text-sm font-normal">* Campo obligatorio</span>}
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
                                {errors.file && <span className="text-red-400 text-sm font-normal">* Campo obligatorio</span>}
                            </label>
                            <div className="flex items-center gap-3 my-2">
                                <InformationCircleIcon className="text-clas-gris h-5" />
                                <p className="text-clas-gris">Imagen en formato .jpg</p>
                            </div>
                            <FileUpload id={"product-image"} onFileSelect={handleProductImageSelect} width="w-full" required={!isEditing} />
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
                                if (!validate()) return;
                                setProduct(formProduct)
                                onClose();
                            }}
                            className="bg-clas rounded-lg py-1 px-2 text-white hover:bg-clas-claro focus:ring-2 focus:ring-clas">
                            {isEditing ? "Guardar Cambios" : "Agregar Producto"}
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    )
};

export default ProductModal;