import Link from "next/link";
import {Button} from "@/components/ui/button";
import {AlertCircle , ArrowLeft , Home} from "lucide-react";
import {Card , CardContent , CardFooter} from "@/components/ui/card";
import {navigationPaths} from "@/config/navigation";

export default function ProfileNotFound() {
    return (
        <div className="w-full flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                    <div className="mb-6">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Voyager Not Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            The voyager profile you're looking for does not exist or may have been removed from our galaxy.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="w-full">
                    <div className="space-y-3 w-full gap-2 flex justify-between">
                        <Link href={navigationPaths.profilesPage()} className="w-full">
                            <Button variant="default" className="w-full flex items-center">
                                <ArrowLeft/>
                                Back to Voyagers
                            </Button>
                        </Link>
                        <Link href={navigationPaths.projectsPage()} className="w-full">
                            <Button variant="outline" className="w-full flex items-center" >
                                <Home  />
                                Return Home
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
