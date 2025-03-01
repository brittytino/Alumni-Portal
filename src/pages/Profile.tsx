
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X } from "lucide-react";
import { User } from "@/types/user";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(user);

  if (!user || !formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "yearOfPassing" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Profile Information</CardTitle>
            {!isEditing && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.studentName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="regNo">Registration Number</Label>
                <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.regNo}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                {isEditing ? (
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.department}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearOfPassing">Year of Passing</Label>
                {isEditing ? (
                  <Input
                    id="yearOfPassing"
                    name="yearOfPassing"
                    type="number"
                    value={formData.yearOfPassing}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.yearOfPassing}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                {isEditing ? (
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">{user.mobileNumber}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                {isEditing ? (
                  <Textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress || ""}
                    onChange={handleInputChange}
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md min-h-[60px]">
                    {user.permanentAddress || "Not provided"}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Current Company</Label>
                {isEditing ? (
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">
                    {user.companyName || "Not provided"}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                {isEditing ? (
                  <Input
                    id="designation"
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md">
                    {user.designation || "Not provided"}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="skills">Skills</Label>
                {isEditing ? (
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleInputChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700 font-medium p-2 bg-gray-50 rounded-md min-h-[50px]">
                    {user.skills || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          
          {isEditing && (
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={cancelEdit}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Profile;
