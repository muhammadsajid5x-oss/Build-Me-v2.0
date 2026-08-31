import type { ReactNode } from "react";
import "./Card.css";
export type CardSize = "sm" | "md" | "lg";
export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardState = "default" | "loading" | "empty" | "error";
export interface CardProps {
  children: ReactNode;
  size?: CardSize;
  variant?: CardVariant;
  state?: CardState;
  className?: string;
}
export interface CardSectionProps {
  children?: ReactNode;
  className?: string;
}
export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}
export function Card({
  children,
  size = "md",
  variant = "default",
  state = "default",
  className = "",
}: CardProps) {
  const classes = [
    "ui-card",
    `ui-card--${size}`,
    `ui-card--${variant}`,
    `ui-card--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <article className={classes} data-state={state}>
      {children}
    </article>
  );
}
export function CardHeader({
  children,
  className = "",
}: CardSectionProps) {
  return (
    <header className={`ui-card__header ${className}`.trim()}>
      {children}
    </header>
  );
}
export function CardBody({
  children,
  className = "",
}: CardSectionProps) {
  return (
    <div className={`ui-card__body ${className}`.trim()}>
      {children}
    </div>
  );
}
export function CardFooter({
  children,
  className = "",
}: CardSectionProps) {
  return (
    <footer className={`ui-card__footer ${className}`.trim()}>
      {children}
    </footer>
  );
}
export function CardImage({
  src,
  alt,
  className = "",
}: CardImageProps) {
  return (
    <div className={`ui-card__image ${className}`.trim()}>
      <img src={src} alt={alt} />
    </div>
  );
}
export function CardActions({
  children,
  className = "",
}: CardSectionProps) {
  return (
    <div className={`ui-card__actions ${className}`.trim()}>
      {children}
    </div>
  );
}
