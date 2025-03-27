import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const subdomainUrl = `http://admin.${process.env.NEXT_PUBLIC_BASE_URL}`;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="bg-blue-600 p-6 rounded-t-lg">
          <CardTitle className="text-white text-3xl font-bold text-center">Welcome to School Profiles</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 text-lg text-center mb-6">
            Create and manage your school&apos;s profile effortlessly. Join our platform to showcase your institution&apos;s strengths and connect
            with a broader community.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={subdomainUrl} rel="noopener noreferrer">
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Started</Button>
            </Link>
            <Button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
