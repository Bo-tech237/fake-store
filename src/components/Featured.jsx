import { axiosInstance } from '@/axios/axiosInstance';
import FeaturedProduct from './FeaturedProduct';

export default async function Featured() {
    const response = await axiosInstance.get('/api/products');
    const products = await response.data.products;
    const product = products.filter(
        (product) => product?.title === 'Polo Premium Blue Shirt'
    );

    return (
        <section className="py-12">
            {product?.map((product) => (
                <FeaturedProduct key={product._id} product={product} />
            ))}
        </section>
    );
}
