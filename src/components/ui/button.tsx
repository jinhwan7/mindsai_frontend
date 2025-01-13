import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import styled, { css } from "styled-components"

interface ButtonStyleProps {
  $variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  $size?: 'default' | 'sm' | 'lg' | 'icon'
}

const getVariantStyles = (variant: ButtonStyleProps["$variant"] = "default") => {
  const variants = {
    default: css`
      background-color: var(--primary);
      color: var(--primary-foreground);
      &:hover {
        background-color: color-mix(in srgb, var(--primary) 90%, transparent);
      }
    `,
    destructive: css`
      background-color: var(--destructive);
      color: var(--destructive-foreground);
      &:hover {
        background-color: color-mix(in srgb, var(--destructive) 90%, transparent);
      }
    `,
    outline: css`
      border: 1px solid var(--input);
      background-color: var(--background);
      &:hover {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
    `,
    secondary: css`
      background-color: var(--secondary);
      color: var(--secondary-foreground);
      &:hover {
        background-color: color-mix(in srgb, var(--secondary) 80%, transparent);
      }
    `,
    ghost: css`
      border: none;
      background: transparent;
      &:hover {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
    `,
    link: css`
      color: var(--primary);
      text-decoration-line: underline;
      text-underline-offset: 4px;
      &:hover {
        text-decoration-line: underline;
      }
    `
  }
  return variants[variant]
}

const getSizeStyles = ($size: ButtonStyleProps["$size"] = "default") => {
  const sizes = {
    default: css`
      height: 2.5rem;
      padding: 0.5rem 1rem;
    `,
    sm: css`
      height: 2.25rem;
      padding: 0 0.75rem;
      border-radius: 0.375rem;
    `,
    lg: css`
      height: 2.75rem;
      padding: 0 2rem;
      border-radius: 0.375rem;
    `,
    icon: css`
      height: 2.5rem;
      width: 2.5rem;
    `
  }
  return sizes[$size]
}

const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: colors 0.2s;
  
  &:focus-visible {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
`

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ $variant, $size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : StyledButton
    return (
      <Comp
        ref={ref}
        $variant={$variant}
        $size={$size}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
