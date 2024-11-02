import {findAllByTestId, findByText, getByRole, getByText, render} from "@testing-library/react";
import {MockedProvider, MockedResponse} from "@apollo/client/testing";
import CountriesPage from "./index.tsx";
import {GET_COUNTRIES} from "../../queries/graphql.ts";
import {userEvent} from "@testing-library/user-event";

const defaultMock = {
  request: {
    query: GET_COUNTRIES,
  },
  result: {
    data: {
      countries: [
        {
          name: "First",
          code: "FI"
        },
        {
          name: "Second",
          code: "SE"
        },
        {
          name: "Third",
          code: "TH"
        },
        {
          name: "TEST 1",
          code: "T1"
        },
        {
          name: "TEST 2",
          code: "T2"
        },
      ]
    }
  }
};
const renderer = (mocks: MockedResponse = defaultMock) => render(
  <MockedProvider mocks={[mocks]} addTypename={false}>
    <CountriesPage/>
  </MockedProvider>
);
describe("<CountriesPage />", () => {
  it("should render component correctly", () => {
    const {container} = renderer();
    expect(container).toBeInTheDocument();
  });

  it("should still show filters in loading state", () => {
    const {container} = renderer({
      ...defaultMock,
      delay: Infinity,
    });
    const loadingTable = getByText(container, "Loading...");
    const filter = getByRole(container, "textbox");

    expect(loadingTable).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
  });

  it("should filter countries", async () => {
    const {container} = renderer();
    const filter = getByRole(container, "textbox");
    const allCountries = await findAllByTestId(container, "country-row");
    expect(allCountries).toHaveLength(defaultMock.result.data.countries.length);

    const searchValue = "t"
    await userEvent.type(filter, searchValue);

    const filteredCountries = await findAllByTestId(container, "country-row");
    const filteredLength = defaultMock.result.data.countries.filter(({code}) => code.startsWith(searchValue.toUpperCase())).length;
    expect(filteredCountries).toHaveLength(filteredLength);
  });

  it("should show error", async () => {
    const testMessage = "Test error";
    const {container} = renderer({
      ...defaultMock,
      error: new Error(testMessage)
    });
    const errorMessage = await findByText(container, `Error : ${testMessage}`);
    expect(errorMessage).toBeInTheDocument();
  });
});