import { RequestLoginForm } from "@/components/request-login-form";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

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
    input.value = "000000000000";

    const submitButton = screen.getByRole("button");
    submitButton.click();

    await waitFor(() =>
      expect(screen.getByText(/Ogiltigt personnummer/i)).toBeInTheDocument(),
    );
  });
});
