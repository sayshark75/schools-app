// app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "@prisma/client";

export default function AdminDashboard() {
  const { status } = useSession();
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    // Fetch schools when authenticated
    async function fetchSchools() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/schools");

        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }

        const data: School[] = await response.json();
        setSchools(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setSchools([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchSchools();
    }
  }, [status]);

  if (status === "loading" || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl mb-4">Registered Schools</h2>
          {schools.length === 0 ? (
            <p className="text-muted-foreground">No schools found</p>
          ) : (
            schools.map((school) => (
              <div key={school.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                <div>
                  <span className="font-semibold">{school.name}</span>
                  <span className="text-muted-foreground ml-2">({school.subdomain})</span>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
