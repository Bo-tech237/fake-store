export default function SearchBar({ query, handleInputChange }) {
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search Product..."
            />
        </div>
    );
}
