import { axiosInstance } from '@/axios/axiosInstance';
import EditProductForm from '@/components/EditProductForm';

export default async function EditProduct({ params: { id } }) {
    const response = await axiosInstance.get('/api/products/' + id);

    const product = response?.data?.products;

    const content = product && <EditProductForm product={product} id={id} />;

    return content;
}
