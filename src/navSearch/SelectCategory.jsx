export default function SelectCategory({
    categories,
    selectedCategory,
    handleChange,
}) {
    return (
        <div>
            <select
                className=""
                value={selectedCategory}
                onChange={handleChange}
            >
                <option value="">All Categories</option>
                {categories?.map((category) => (
                    <option key={category._id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
