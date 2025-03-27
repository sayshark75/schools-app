// app/[subdomain]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
type Props = {
  params: Promise<{ subdomain: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: Props) {
  const { subdomain } = await params;
  const school = await prisma.school.findUnique({
    where: { subdomain: subdomain },
  });

  return {
    title: school ? `${school.name} - School Profile` : "School Not Found",
    description: school?.description || "School profile",
  };
}

export default async function SchoolPage({ params }: Props) {
  // Fetch school by subdomain
  const { subdomain } = await params;
  const school = await prisma.school.findUnique({
    where: { subdomain: subdomain },
  });

  // Return 404 if school not found
  if (!school) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{school.name}</CardTitle>
          <Building2 className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">About Us</h2>
              <p className="text-muted-foreground">{school.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{school.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{school.contactPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{school.address}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
