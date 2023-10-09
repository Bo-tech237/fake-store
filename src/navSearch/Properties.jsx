export default function Properties({
    filteredProps,
    selectedProperty,
    handlePropertyChange,
}) {
    return (
        <div>
            <select
                name={filteredProps.name}
                className="outline-none"
                value={
                    selectedProperty?.selectedFilters[filteredProps?.name] || ''
                }
                onChange={(e) =>
                    handlePropertyChange(filteredProps.name, e.target.value)
                }
            >
                <option value="">All {filteredProps.name}</option>
                {filteredProps?.values.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
