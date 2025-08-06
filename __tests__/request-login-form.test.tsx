import { RequestLoginForm } from "@/components/request-login-form";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";
import { wait } from "@/lib/utils";

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
document.elementFromPoint = (): null => null;

afterEach(() => {
  cleanup();
});

describe("RequestLoginForm", () => {
  it("renders the form", () => {
    render(<RequestLoginForm />);
    const form = screen.getByTestId("request-login-form");

    expect(form).toBeInTheDocument();
  });

  it("validates and shows error message on submission", async () => {
    render(<RequestLoginForm />);

    const input = screen.getByLabelText(
      "Personnummer (ÅÅÅÅ-MM-DD-NNNN)",
    ) as HTMLInputElement;
    await userEvent.type(input, "000000000000");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(/Ogiltigt personnummer/i)).toBeInTheDocument(),
    );
  });

  it("revalidates on valid input", async () => {
    render(<RequestLoginForm />);

    const input = screen.getByLabelText(
      "Personnummer (ÅÅÅÅ-MM-DD-NNNN)",
    ) as HTMLInputElement;

    await userEvent.type(input, "000000000000");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(/Ogiltigt personnummer/i)).toBeInTheDocument(),
    );

    await userEvent.clear(input);
    await userEvent.type(input, "199001011234");

    await waitFor(() =>
      expect(
        screen.queryByText(/Ogiltigt personnummer/i),
      ).not.toBeInTheDocument(),
    );

    // Allow input-otp's internal timeouts to resolve
    await wait(100);
  });
});
