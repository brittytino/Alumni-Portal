
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <p className="text-gray-600">{user.studentName}</p>
            </div>
            <div>
              <Label>Registration Number</Label>
              <p className="text-gray-600">{user.regNo}</p>
            </div>
            <div>
              <Label>Department</Label>
              <p className="text-gray-600">{user.department}</p>
            </div>
            <div>
              <Label>Year of Passing</Label>
              <p className="text-gray-600">{user.yearOfPassing}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <Label>Mobile Number</Label>
              <p className="text-gray-600">{user.mobileNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
