"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function home() {

      const res = api.health.useQuery();

    return (
        <>
            <div className="flex flex-col items-center justify-center p-5">
                <div className="text-2xl font-bold">
                    Home Page | TalentLens
                </div>
                <div className="text-lg font-semibold">
                    Status: {res.data?.status}  
                </div>
                <Button asChild className="mt-4 dark:bg-orange-500"><Link href="/login">Login</Link></Button>
                <Button asChild className="mt-4 dark:bg-orange-500"><Link href="/register">Register</Link></Button>
            </div>

        </>
    )
}