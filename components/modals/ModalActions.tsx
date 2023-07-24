"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  description?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  onToggle: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  description,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  onToggle,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={showModal} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {body}
        <DialogFooter>
          <section className="flex w-full flex-col justify-center">
            <div
              className="
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-4
                  "
            >
              {secondaryAction && secondaryActionLabel && (
                <Button
                  disabled={disabled}
                  onClick={handleSecondaryAction}
                  variant="outline"
                >
                  {secondaryActionLabel}
                </Button>
              )}
              <Button disabled={disabled} onClick={handleSubmit}>
                {actionLabel}
              </Button>
            </div>
            {footer}
          </section>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
