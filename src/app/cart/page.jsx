import CartInfo from '@/components/CartInfo';
import Header from '@/components/Header';

export default function Cart() {
    return (
        <>
            <div className="max-container">
                <Header />
            </div>
            <div className="mt-12">
                <CartInfo />
            </div>
        </>
    );
}
