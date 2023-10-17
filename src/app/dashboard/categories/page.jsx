'use client';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import axios from 'axios';

export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null);
    const [deletedCategory, setDeletedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);
    async function fetchCategories() {
        const response = await axios.get('/api/categories');
        const data = await response.data?.categories;
        setCategories(data);
    }
    async function saveCategory(e) {
        e.preventDefault();
        try {
            setLoading(true);
            if (editedCategory) {
                const response = await axios.put('/api/categories', {
                    name,
                    id: editedCategory._id,
                    properties: properties.map((p) => ({
                        name: p.name,
                        values: p.values.split(','),
                    })),
                });
                if (response.status === 200) {
                    setLoading(false);
                }
                setEditedCategory(null);
            } else {
                const response = await axios.post('/api/categories', {
                    name,
                    properties: properties.map((p) => ({
                        name: p.name,
                        values: p.values.split(','),
                    })),
                });
                if (response.status === 201) {
                    setLoading(false);
                }
            }
            setName('');
            setProperties([]);
            fetchCategories();
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    }
    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setProperties(
            category?.properties?.map(({ name, values }) => ({
                name,
                values: values?.join(','),
            }))
        );
    }
    function toggleDialog(category) {
        setDeletedCategory(category);
        setDialogOpen((bool) => !bool);
    }
    function closeDialog() {
        setDialogOpen(false);
    }
    async function deleteCategory() {
        try {
            setDeleting(true);

            const response = await axios.delete(
                '/api/categories/' + deletedCategory?._id
            );

            if (response.status === 200) {
                setDeleting(false);
                setDialogOpen(false);
                fetchCategories();
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setDeleting(false);
        }
    }
    function addProperty() {
        setProperties((prev) => [...prev, { name: '', values: '' }]);
    }
    function handlePropertyName(index, newName) {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }
    function handlePropertyValues(index, newValues) {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }
    function removeProperty(index) {
        setProperties((prev) => {
            const properties = [...prev];
            return properties.filter((p, i) => i !== index);
        });
    }
    return (
        <div>
            <h1>Categories</h1>
            <form onSubmit={saveCategory}>
                <label>
                    {editedCategory
                        ? `Edit category ${editedCategory.name}`
                        : 'Create new category'}
                </label>
                <div>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target?.value)}
                            placeholder="Category name"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex gap-3">
                            <label>Properties</label>
                            <button
                                onClick={addProperty}
                                type="button"
                                className="btn-default"
                            >
                                Add new property
                            </button>
                        </div>
                        {properties?.length > 0 &&
                            properties.map((property, index) => (
                                <div key={index} className="flex gap-1">
                                    <input
                                        value={property.name}
                                        onChange={(e) =>
                                            handlePropertyName(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        placeholder="property name (example:color)"
                                    />
                                    <input
                                        value={property.values}
                                        onChange={(e) =>
                                            handlePropertyValues(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        type="text"
                                        placeholder="values commas separated"
                                    />
                                    <button
                                        type="button"
                                        className="btn-default"
                                        onClick={() => removeProperty(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div className="flex gap-2">
                        {editedCategory && (
                            <button
                                type="button"
                                className="btn-default"
                                onClick={() => {
                                    setEditedCategory(null);
                                    setName('');
                                    setProperties([]);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'SAVING...' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
            {!editedCategory && (
                <table className="back">
                    <thead>
                        <tr>
                            <th>Category name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.length > 0 &&
                            categories?.map((category) => (
                                <tr key={category._id}>
                                    <td>{category?.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <button
                                            onClick={() =>
                                                editCategory(category)
                                            }
                                            className="btn-primary mr-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                toggleDialog(category)
                                            }
                                            className="btn-primary mr-1"
                                        >
                                            Delete
                                        </button>
                                        <Modal open={dialogOpen}>
                                            <div className=" p-16">
                                                <h1>Are you really sure?</h1>
                                                <div className="flex gap-3 justify-center mt-2">
                                                    <button
                                                        onClick={closeDialog}
                                                        className="btn-default mr-1"
                                                    >
                                                        CANCEL
                                                    </button>
                                                    <button
                                                        onClick={deleteCategory}
                                                        disabled={deleting}
                                                        className="btn-red mr-1"
                                                    >
                                                        {deleting
                                                            ? 'DELETING...'
                                                            : 'YES,DELETE'}
                                                    </button>
                                                </div>
                                            </div>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
