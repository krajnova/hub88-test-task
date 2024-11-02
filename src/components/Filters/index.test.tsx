import Filters from "./index.tsx";
import { render, getByText, getByRole } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const propsMock = {
  setSearchValue: jest.fn(),
};
describe("<Filters />", () => {
  it("should render component", () => {
    const { container } = render(<Filters {...propsMock} />);

    expect(container).toBeInTheDocument();
  });

  it("should show input and corresponding label", () => {
    const { container } = render(<Filters {...propsMock} />);

    const label = getByText(container, "Filter by country code");
    const input = getByRole(container, "textbox");
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  })

  it("should pass value from input to setSearchValue onChange transformed to upper case", async () => {
    const { container } = render(<Filters {...propsMock} />);

    const input = getByRole(container, "textbox");
    const value = "test";

    await userEvent.type(input, value);

    expect(input).toHaveValue(value);
    expect(propsMock.setSearchValue).toHaveBeenLastCalledWith(value.toUpperCase());
  })
});
