export type CountryType = {
  name: string,
  code: string,
};

export type CountryQuery = {
  countries: CountryType[],
};
