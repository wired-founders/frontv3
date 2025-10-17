// src/components/modals/verification-modal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

interface VerificationModalProps {
  open: boolean;
  email: string;
}

export function VerificationModal({ open, email }: VerificationModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">Check your email</DialogTitle>
          <DialogDescription className="text-base">
            We sent a verification link to <strong className="text-foreground">{email}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground text-center">
            Click the link in the email to verify your account. Then you can log in.
          </p>
          
          <Button asChild className="w-full">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}