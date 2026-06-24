"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/server/better-auth/client";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleEmailRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authClient.signUp.email(
        {
          name: username,
          email,
          password,
          callbackURL: "/login",
        },
      );
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
            Create Account
          </CardTitle>
          <CardDescription>
            Register to continue to TalentLens
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <Input
              name="username"
              placeholder="Username"
              required
            />

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

            <Button
              className="w-full"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating account..." : "Create Account"}
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
                callbackURL: "/dashboard",
              })
            }
          >
            <FaGithub className="h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}