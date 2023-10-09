import AllProducts from '@/components/AllProducts';
import Header from '@/components/Header';
import { axiosInstance } from '@/axios/axiosInstance';

export default async function Products() {
    const categoriesResponse = await axiosInstance.get('/api/categories');
    const categories = await categoriesResponse?.data?.categories;
    const response = await axiosInstance.get('/api/products');
    const products = await response.data.products;

    return (
        <section className="bg-gray-400 min-h-screen">
            <div className="bg-black text-white">
                <div className="max-container">
                    <Header />
                </div>
            </div>
            <div className="py-8 mt-12 px-3">
                <div className="max-container">
                    <h1 className="mb-4">All Products</h1>
                    <AllProducts products={products} categories={categories} />
                </div>
            </div>
        </section>
    );
}
