import { RequestLoginForm } from "@/components/request-login-form";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("RequestLoginForm", () => {
  it("renders the form", () => {
    render(<RequestLoginForm />);
    const form = screen.getByLabelText("Personnummer (ÅÅÅÅ-MM-DD-NNNN)");

    expect(form).toBeDefined();
  });
});
