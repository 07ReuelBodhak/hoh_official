"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  icon,
  className,
  children,
  href,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center min-w-[140px] h-12 px-6 rounded-lg font-bold text-base transition-all hover:-translate-y-0.5";

  const variantClasses = {
    primary: "bg-[#b20000] hover:bg-[#8f0000] text-white shadow-primary",
    secondary:
      "bg-[#4b2020] hover:bg-[#5e2828] border border-[#6b2e2e] text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    className ?? ""
  }`;

  // ✅ Link Button
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <span className="mr-2 text-[20px]">{icon}</span>}
        {children}
      </a>
    );
  }

  // ✅ Normal Button
  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <span className="mr-2 text-[20px]">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
