import { createComponent } from "components";

const inputClasses = "bg-gray-100 p-2 rounded";
export const Input = createComponent("input", {
  className: inputClasses,
});
export const Label = createComponent("label", { className: "" });
export const Textarea = createComponent("textarea", {
  className: inputClasses,
});
