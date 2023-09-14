import React, { ComponentProps, forwardRef } from "react";

interface Props extends Omit<ComponentProps<"textarea">, "id" | "ref"> {
  label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...props }, ref) => {
    const id = label.toLowerCase().replace(" ", "-");

    return (
      <div className="grid mb-4">
        <label htmlFor={id} className="pb-2">
          {label}
        </label>
        <textarea className="p-2 rounded" id={id} {...props} ref={ref} />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
