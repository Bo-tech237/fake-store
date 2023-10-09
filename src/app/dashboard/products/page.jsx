import Link from 'next/link';
import { axiosInstance } from '@/axios/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

export default async function Products() {
    const response = await axiosInstance.get('/api/products');
    const products = response?.data?.products;

    return (
        <div>
            <Link
                className="bg-blue-900 text-white py-1 px-2 rounded-md"
                href={'/dashboard/products/new'}
            >
                Add new product
            </Link>
            <table className="back">
                <thead>
                    <tr className="text-left">
                        <th>Product Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product?._id}>
                            <td>{product?.title}</td>
                            <td>
                                <Link
                                    href={
                                        '/dashboard/products/edit/' +
                                        product?._id
                                    }
                                    className="bg-blue-900 text-white py-1 px-2 mb-2 mr-2 rounded-md inline-flex gap-1 items-center"
                                >
                                    <FontAwesomeIcon size="1x" icon={faPen} />
                                    Edit
                                </Link>
                                <Link
                                    href={
                                        '/dashboard/products/delete/' +
                                        product?._id
                                    }
                                    className="bg-blue-900 text-white py-1 px-2 mr-2 rounded-md inline-flex gap-1 items-center"
                                >
                                    <FontAwesomeIcon
                                        size="1x"
                                        icon={faTrashCan}
                                    />
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
