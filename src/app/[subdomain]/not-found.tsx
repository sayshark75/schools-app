// app/[subdomain]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function NotFound() {
  const schools = await prisma.school.findMany({});
  const subdomainUrl = `http://www.${process.env.NEXT_PUBLIC_BASE_URL}`;

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <AlertTriangle className="h-10 w-10 text-destructive mr-4" />
          <CardTitle className="text-3xl font-bold">School Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">The school you are looking for does not exist or is not available.</p>
          <Link href={subdomainUrl} rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Return to Home
            </Button>
          </Link>

          <p className="mb-6 text-muted-foreground">__ or __</p>
          <p className="mb-6 text-muted-foreground">Visit our other schools</p>
          <div className="flex flex-col gap-2 w-full">
            {schools.slice(0, 3).map((school) => {
              const subdomainUrl = `http://${school.subdomain}.${process.env.NEXT_PUBLIC_BASE_URL}`;
              return (
                <Link className="w-full" href={subdomainUrl} key={`school-${school.id}`} rel="noopener noreferrer">
                  <Button className="w-full" variant="outline" size="lg">
                    {school.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
