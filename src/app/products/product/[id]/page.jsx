import { axiosInstance } from '@/axios/axiosInstance';
import ProductInfo from '@/components/ProductInfo';
import Header from '@/components/Header';

export default async function Product({ params: { id } }) {
    const response = await axiosInstance.get('/api/products/' + id);

    const product = response?.data?.products;

    return (
        <section>
            <div className="bg-black text-white">
                <div className="max-container">
                    <Header />
                </div>
            </div>
            <ProductInfo product={product} />
        </section>
    );
}
