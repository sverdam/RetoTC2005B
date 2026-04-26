interface CatalogProps{
    documentLink: string;
}
const ProductCatalog: React.FC<CatalogProps> = ({documentLink}) => {
    return(
        <div className="rounded-lg w-150">
            <iframe src={documentLink} width="100%" height="600px" className="rounded-3xl m-3"></iframe>
        </div>
    )
}

export default ProductCatalog;