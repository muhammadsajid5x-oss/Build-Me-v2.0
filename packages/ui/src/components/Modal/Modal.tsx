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

export function Modal(props: Readonly<ModalProps>) {
  const {
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
  } = props;

  const titleId = useId();
  const modalRef = useRef<HTMLDialogElement>(null);

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
      aria-hidden="true"
    >
      <dialog
        ref={modalRef}
        className={classes}
        open={open}
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
      </dialog>
    </div>
  );
}

export function ModalHeader(props: Readonly<ModalSectionProps>) {
  const { children, className = "" } = props;
  return (
    <header className={`ui-modal__header ${className}`.trim()}>
      {children}
    </header>
  );
}

export function ModalBody(props: Readonly<ModalSectionProps>) {
  const { children, className = "" } = props;
  return <div className={`ui-modal__body ${className}`.trim()}>{children}</div>;
}

export function ModalFooter(props: Readonly<ModalSectionProps>) {
  const { children, className = "" } = props;
  return (
    <footer className={`ui-modal__footer ${className}`.trim()}>
      {children}
    </footer>
  );
}

export function ModalActions(props: Readonly<ModalActionsProps>) {
  const { children, align = "end", className = "" } = props;
  return (
    <div
      className={`ui-modal__actions ui-modal__actions--${align} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function ModalStep(
  props: Readonly<ModalSectionProps & { active?: boolean }>,
) {
  const { children, active = true, className = "" } = props;
  if (!active) {
    return null;
  }
  return <div className={`ui-modal__step ${className}`.trim()}>{children}</div>;
}
