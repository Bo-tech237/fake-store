'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faGear,
    faPrescriptionBottle,
    faBuildingColumns,
    faRectangleList,
    faList,
} from '@fortawesome/free-solid-svg-icons';

export default function Nav({ mobileMenuOpen, setMobileMenuOpen }) {
    const inactiveLink = 'flex items-center gap-2 p-1';
    const activeLink = inactiveLink + ' bg-white text-blue-900 rounded-l-lg ';
    const pathname = usePathname();

    return (
        <aside
            className={`text-white ${
                mobileMenuOpen ? 'left-0' : '-left-full'
            } p-4 pr-0 fixed w-full bg-blue-900 h-full md:static md:w-auto`}
        >
            <div className="">
                <Link
                    href={'/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex gap-2 mb-4 pr-4 items-center"
                >
                    <FontAwesomeIcon
                        size="2x"
                        style={{ color: '' }}
                        icon={faBuildingColumns}
                    />
                    <span>EcommerceAdmin</span>
                </Link>
            </div>
            {
                <nav className="flex flex-col gap-2">
                    <Link
                        href={'/dashboard'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={
                            pathname === '/dashboard'
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        <FontAwesomeIcon size="xl" icon={faHome} />
                        Dashboard
                    </Link>
                    <Link
                        href={'/dashboard/products'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={
                            pathname.includes('/dashboard/products')
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        <FontAwesomeIcon
                            size="xl"
                            icon={faPrescriptionBottle}
                        />
                        Products
                    </Link>
                    <Link
                        href={'/dashboard/categories'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={
                            pathname.includes('/dashboard/categories')
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        <FontAwesomeIcon size="xl" icon={faList} />
                        Categories
                    </Link>
                    <Link
                        href={'/dashboard/orders'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={
                            pathname.includes('/dashboard/orders')
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        <FontAwesomeIcon size="xl" icon={faRectangleList} />
                        Orders
                    </Link>
                    <Link
                        href={'/dashboard/settings'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={
                            pathname.includes('/dashboard/settings')
                                ? activeLink
                                : inactiveLink
                        }
                    >
                        <FontAwesomeIcon size="xl" icon={faGear} />
                        Settings
                    </Link>
                </nav>
            }
        </aside>
    );
}
