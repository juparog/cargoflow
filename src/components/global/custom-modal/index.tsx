"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/modal-provider";
import React from "react";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();

  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px] w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
        </DialogHeader>
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
