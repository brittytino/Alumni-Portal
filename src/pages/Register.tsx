
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      studentName: formData.get("studentName") as string,
      regNo: formData.get("regNo") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      permanentAddress: formData.get("permanentAddress") as string,
      yearOfPassing: parseInt(formData.get("yearOfPassing") as string),
      companyName: formData.get("companyName") as string,
      designation: formData.get("designation") as string,
      skills: formData.get("skills") as string,
    };

    try {
      await register(userData);
      toast({
        title: "Registration Successful",
        description: "Welcome to the RVS Alumni Network!",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-8">
          <GraduationCap className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join the Alumni Network
          </h2>
          <p className="mt-2 text-gray-600">
            Connect with fellow graduates and stay updated with the latest opportunities
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill in your details to create your alumni account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regNo">Registration Number</Label>
                  <Input
                    id="regNo"
                    name="regNo"
                    required
                    placeholder="e.g., 1U20CA004"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    required
                    placeholder="e.g., BCA"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing</Label>
                  <Input
                    id="yearOfPassing"
                    name="yearOfPassing"
                    type="number"
                    required
                    min="1900"
                    max="2024"
                    placeholder="Enter your graduation year"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Current Company</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter your current company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    placeholder="Enter your current designation"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    required
                    placeholder="Enter your permanent address"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="skills">Key Skills (Top 3)</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    placeholder="Enter your top 3 professional skills"
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Already have an account?
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
