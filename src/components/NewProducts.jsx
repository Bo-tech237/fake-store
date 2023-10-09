import Product from './Product';
import { axiosInstance } from '@/axios/axiosInstance';

export default async function NewProduct() {
    const response = await axiosInstance.get('/api/products');
    const products = await response.data.products;

    return (
        <section>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
                {products?.map((product) => (
                    <Product key={product?._id} product={product} />
                ))}
            </div>
        </section>
    );
}
