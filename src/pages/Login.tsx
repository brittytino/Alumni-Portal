
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(regNo, password);
    if (success) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center font-bold text-primary">Login to RVS Alumni</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="regNo" className="text-sm font-medium">Registration Number</Label>
              <Input
                id="regNo"
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="w-full p-2"
                placeholder="Enter your registration number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password (Mobile Number)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full py-2 font-semibold">
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/register")}
                className="w-full"
              >
                New Alumni? Register here
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
