import Header from '@/components/Header';
import Featured from '@/components/Featured';
import NewProduct from '@/components/NewProducts';

export default function Home() {
    return (
        <main className="bg-gray-200">
            <div className=" bg-black text-white px-4 padding-1">
                <div className="max-container">
                    <div className=" pb-10">
                        <Header />
                    </div>
                    <Featured />
                </div>
            </div>
            <div className="max-container px-4 py-6 padding-1">
                <h1 className="mb-4">New Arrival</h1>
                <NewProduct />
            </div>
        </main>
    );
}
