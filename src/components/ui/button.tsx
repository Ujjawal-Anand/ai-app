/**
 * Button component that supports different variants and sizes.
 * It uses the class-variance-authority library to generate class names based on the provided variants and sizes.
 * This library helps in managing and applying CSS classes dynamically based on the component's props.
 * It provides a convenient way to define and apply different styles to the button component without writing complex CSS logic.
 * The button component can be used as a regular button or as a child of the Slot component.
 *
 * @remarks
 * The class-variance-authority library simplifies the process of managing and applying CSS classes for different variants and sizes of the button component.
 * It allows us to define the styles for each variant and size in a declarative way, making it easier to maintain and update the styles in the future.
 * By using this library, we can easily customize the button component's appearance by simply changing the variant and size props.
 *
 * @example
 * ```tsx
 * import { Button } from "@/components/ui/button";
 *
 * const MyComponent = () => {
 *   return (
 *     <Button variant="default" size="default">
 *       Click me
 *     </Button>
 *   );
 * };
 * ```
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
