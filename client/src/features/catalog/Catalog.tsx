import { Fragment, useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getData = async () => {
            const request = await fetch('https://localhost:5001/api/products');
            const response = (await request.json()) as Product[];

            setProducts(response);
        };

        getData();
    }, []);

    return (
        <Fragment>
            <ProductList products={products} />
        </Fragment>
    );
}
