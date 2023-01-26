import { createComponent } from "components";

export const Button = createComponent("button", {
  className:
    "disabled:opacity-50 disabled:hover:bg-gray-100 inline-flex items-center justify-center bg-gray-100 border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors rounded",
});
