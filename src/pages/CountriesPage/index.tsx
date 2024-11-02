import {useQuery} from "@apollo/client";
import {CountryQuery} from "../../queries/types.ts";
import {GET_COUNTRIES} from "../../queries/graphql.ts";
import {useMemo, useState} from "react";
import Filters from "../../components/Filters";
import CountriesTable from "../../components/CountriesTable";

const CountriesPage = () => {
  const { loading, error, data } = useQuery<CountryQuery>(GET_COUNTRIES);
  const [searchValue, setSearchValue] = useState("");

  const filteredCountries = useMemo(() => {
    if (!data) return [];
    if (!searchValue) return data.countries;
    return data.countries.filter(({ code }) => code.startsWith(searchValue));
  }, [searchValue, data]);

  return (
    <div className="countries-page">
      <Filters setSearchValue={setSearchValue} />
      <CountriesTable isLoading={loading} error={error} countries={filteredCountries} />
    </div>
  );
};

export default CountriesPage;
