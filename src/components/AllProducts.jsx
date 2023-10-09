'use client';
import { useEffect, useState } from 'react';
import Product from './Product';
import SelectCategory from '@/navSearch/SelectCategory';
import SearchBar from '@/navSearch/SearchBar';
import Properties from '@/navSearch/Properties';
import { signOut, useSession } from 'next-auth/react';

export default function AllProducts({ products, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [query, setQuery] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        const filteredCategory = categories?.filter(
            (category) => category?.name === selectedCategory
        );
        const filteredProperties = filteredCategory && {
            properties: filteredCategory[0]?.properties,
            selectedFilters: {},
        };
        setSelectedProperty(filteredProperties);
    }, [categories, selectedCategory]);

    function handleInputChange(e) {
        setQuery(e.target.value);
    }

    function handleChange(e) {
        setSelectedCategory(e.target.value);
    }

    function handlePropertyChange(property, value) {
        setSelectedProperty((prevState) => ({
            ...prevState,
            selectedFilters: {
                ...prevState.selectedFilters,
                [property]: value,
            },
        }));
    }

    const filteredItems = products?.filter(
        (product) =>
            product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    function filteredData(products, selected, query, property) {
        let filteredProducts = products;

        if (query) {
            filteredProducts = filteredItems;
        }

        if (selected) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category?.name === selected
            );
        }

        if (property) {
            filteredProducts = filteredProducts.filter(({ properties }) => {
                return Object.entries(properties).every(([prop, val]) => {
                    const selectedValue =
                        selectedProperty.selectedFilters[prop];
                    return !selectedValue || selectedValue === val;
                });
            });
        }

        return filteredProducts?.map((product) => (
            <Product key={product?._id} product={product} />
        ));
    }

    const result = filteredData(
        products,
        selectedCategory,
        query,
        selectedProperty.selectedFilters
    );

    return (
        <section>
            <div className="flex flex-wrap justify-between items-center gap-2 py-3 sm:gap-5">
                <div className=" w-[42%]">
                    <SearchBar
                        query={query}
                        handleInputChange={handleInputChange}
                    />
                </div>

                <SelectCategory
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleChange={handleChange}
                />

                {selectedCategory && (
                    <div className="flex justify-between items-center gap-10">
                        {selectedProperty?.properties?.map((filteredProps) => (
                            <Properties
                                key={filteredProps?._id}
                                filteredProps={filteredProps}
                                selectedProperty={selectedProperty}
                                handlePropertyChange={handlePropertyChange}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
                {result}
            </div>
        </section>
    );
}
