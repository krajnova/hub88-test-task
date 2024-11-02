import "./styles.css";
import { CountryType } from "../../queries/types.ts";

type CountriesTableProps = {
  countries: CountryType[],
  isLoading: boolean,
  error?: {
    message?: string,
  },
};
const CountriesTable = ({ countries, error, isLoading }: CountriesTableProps) => {

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!countries.length) return <p>No countries available</p>;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
        <tr>
          <th className="cell">Country name</th>
          <th className="cell">Country code</th>
        </tr>
        </thead>
        <tbody>
        {countries.map(({code, name}) => (
          <tr data-testid="country-row" key={code}>
            <td className="cell">{name}</td>
            <td className="cell">{code}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountriesTable;