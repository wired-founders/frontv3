// src\components\forms\signup-form.tsx
"use client";

import { cn } from "@/lib/utils";
import { apiUrl } from "@/config/env.client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { VerificationModal } from "@/components/modals/verification-modal";
import { signUp } from "@/lib/api/authApi";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [showVerification, setShowVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });
  
  const onSubmit = async (data: SignupData) => {
    try {
      const result = await signUp(data);
      console.log(result);

      if (!result.verified) {
        setUserEmail(data.email);
        setShowVerification(true);
      }
    } catch (err) {
      setError("root", { message: (err as Error).message });
    }
  };

  function handleGoogleSignup() {
    window.location.href = `${apiUrl}/auth/google`;
  }

  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with Google, or use your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {/* Google OAuth */}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignup}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign Up with Google
              </Button>

              {/* Divider */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min 6 characters"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Root Error */}
              {errors.root && (
                <p className="text-sm text-red-600">{errors.root.message}</p>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Sign up"}
              </Button>

              <div className="mt-3 text-center text-xs text-balance text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </div>

              {/* Login Link */}
              <div className="mt-3 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <VerificationModal
        open={showVerification}
        email={userEmail}
        onClose={() => setShowVerification(false)}
      />
    </>
  );
}
