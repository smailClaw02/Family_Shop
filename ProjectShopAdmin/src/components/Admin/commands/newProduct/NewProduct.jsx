import ProductItem from "./ProductItem";

function NewProduct({ product, removeProduct }) {

    return (
        <div className="row mt-4 m-0 align-items-center">
            {
                product.map((p, key) => (
                    <ProductItem
                    product={p}
                    removeProduct={removeProduct}
                    key={key}
                    />
                ))
            }
        </div>
    );
}

export default NewProduct;