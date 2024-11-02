import CountriesTable from "./index.tsx";
import { render, getByText } from "@testing-library/react";

describe('<CountriesTable />', () => {
  it('should render component with correct props', () => {
    const { container } = render(<CountriesTable countries={[]} isLoading={false} />);

    expect(container).toBeInTheDocument();
  });

  it("should render message if there are no countries", () => {
    const { container } = render(<CountriesTable countries={[]} isLoading={false} />);

    const message = getByText(container, "No countries available");
    expect(message).toBeInTheDocument();
  });

  it("should show loading message if loading state", () => {
    const { container } = render(<CountriesTable countries={[]} isLoading={true} />);

    const message = getByText(container, "Loading...");
    expect(message).toBeInTheDocument();
  });

  it("should show error message from props", () => {
    const error = { message: "test message" };
    const { container } = render(<CountriesTable countries={[]} isLoading={false} error={error} />);

    const message = getByText(container, `Error : ${error.message}`);
    expect(message).toBeInTheDocument();
  });

  it("should render countries from props", () => {
    const countries = [
      {
        name: "Test country",
        code: "TE",
      },
    ];

    const { container } = render(<CountriesTable countries={countries} isLoading={false} />);
    const countryName = getByText(container, countries[0].name);
    const countryCode = getByText(container, countries[0].code);

    expect(countryName).toBeInTheDocument();
    expect(countryCode).toBeInTheDocument();
  });
});