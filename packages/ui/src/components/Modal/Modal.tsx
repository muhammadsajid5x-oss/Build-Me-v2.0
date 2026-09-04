import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import "./Modal.css";
export type ModalSize = "sm" | "md" | "lg" | "xl";
export type ModalState = "default" | "loading" | "error" | "success";
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  state?: ModalState;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  "aria-label"?: string;
}
export interface ModalSectionProps {
  children?: ReactNode;
  className?: string;
}
export interface ModalActionsProps extends ModalSectionProps {
  align?: "start" | "center" | "end" | "between";
}
export function Modal({
  open,
  onClose,
  children,
  size = "md",
  state = "default",
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
  "aria-label": ariaLabel,
}: ModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, closeOnEscape, onClose]);
  if (!open) {
    return null;
  }
  const classes = [
    "ui-modal",
    `ui-modal--${size}`,
    `ui-modal--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="ui-modal__backdrop"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : titleId}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            type="button"
            className="ui-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        )}
        <div id={titleId} className="ui-modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
export function ModalHeader({
  children,
  className = "",
}: ModalSectionProps) {
  return (
    <header className={`ui-modal__header ${className}`.trim()}>
      {children}
    </header>
  );
}
export function ModalBody({
  children,
  className = "",
}: ModalSectionProps) {
  return (
    <div className={`ui-modal__body ${className}`.trim()}>
      {children}
    </div>
  );
}
export function ModalFooter({
  children,
  className = "",
}: ModalSectionProps) {
  return (
    <footer className={`ui-modal__footer ${className}`.trim()}>
      {children}
    </footer>
  );
}
export function ModalActions({
  children,
  align = "end",
  className = "",
}: ModalActionsProps) {
  return (
    <div
      className={`ui-modal__actions ui-modal__actions--${align} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
export function ModalStep({
  children,
  active = true,
  className = "",
}: ModalSectionProps & { active?: boolean }) {
  if (!active) {
    return null;
  }
  return (
    <div className={`ui-modal__step ${className}`.trim()}>
      {children}
    </div>
  );
}
