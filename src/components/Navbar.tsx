
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  LayoutDashboard,
  Calendar,
  Newspaper,
  UserCircle,
  LogOut,
  MessageSquare,
  Briefcase,
  Settings,
} from "lucide-react";
import { NotificationSystem } from "./NotificationSystem";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">RVS Alumni</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/events"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </Link>
                <Link
                  to="/news"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <Newspaper className="h-4 w-4" />
                  <span>News</span>
                </Link>
                <Link
                  to="/qa"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Q&A</span>
                </Link>
                <Link
                  to="/jobs"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Jobs</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <NotificationSystem />
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
