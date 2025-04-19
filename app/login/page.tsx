"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cookies } from "next/headers";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Default credentials check
    if (username === "admin" && password === "000000") {
      try {
        // Set the authentication cookie
        document.cookie = "isAuthenticated=true; path=/; max-age=86400"; // 24 hours
        // Redirect to home page
        router.push("/");
        // Force a page reload to ensure the middleware picks up the new auth state
        window.location.reload();
      } catch (err) {
        setError("An error occurred during login. Please try again.");
      }
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117]">
      <div className="w-full max-w-md p-4">
        <Card className="bg-[#161B22] border-[#30363D]">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] flex items-center justify-center">
                <span className="text-2xl font-bold text-white">PT</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center font-bold text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="text-sm text-red-500 text-center bg-red-500/10 p-2 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0D1117] border-[#30363D] text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0D1117] border-[#30363D] text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] hover:opacity-90 text-white"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-400">
              <Link href="#" className="hover:text-[#3B82F6] underline underline-offset-4">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm text-center text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#3B82F6] hover:underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 