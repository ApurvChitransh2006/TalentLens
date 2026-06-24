"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { authClient } from "@/server/better-auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border bg-card shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to continue to TalentLens
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <span className="bg-card text-muted-foreground absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
              OR
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() =>
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard"
              })
            }
          >
            <FaGithub className="h-4 w-4" />
            Continue with GitHub
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-foreground font-medium underline underline-offset-4"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}