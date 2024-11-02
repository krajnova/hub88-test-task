import "./styles.css";

type FiltersProps = {
  setSearchValue: (value: string) => void;
};
const Filters = ({ setSearchValue }: FiltersProps) => (
  <div className="filter-wrapper">
    <label htmlFor="country-code" className="filter-label">Filter by country code</label>
    <input
      id="country-code"
      className="filter-input"
      type="text"
      autoComplete="off"
      onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
    />
  </div>
);

export default Filters;
