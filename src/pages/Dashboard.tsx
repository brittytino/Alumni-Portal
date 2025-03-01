
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Newspaper, Users, Bell } from "lucide-react";
import { events, news } from "@/data/mockData";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const recentEvents = events.slice(0, 2);
  const recentNews = news.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.studentName}!</h1>
            <p className="text-gray-600">
              Stay connected with your alma mater and fellow alumni !
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">10</CardTitle>
            <CardDescription>Upcoming Events</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">5</CardTitle>
            <CardDescription>Unread Updates</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">250+</CardTitle>
            <CardDescription>Connected Alumni</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Events</CardTitle>
              <Button variant="ghost" asChild>
                <Link to="/events">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.date), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Latest News</CardTitle>
              <Button variant="ghost" asChild>
                <Link to="/news">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <Newspaper className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(item.date), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
              <Link to="/profile">
                <Users className="h-6 w-6" />
                Update Profile
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
              <Link to="/events">
                <Calendar className="h-6 w-6" />
                View Events
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2" asChild>
              <Link to="/news">
                <Newspaper className="h-6 w-6" />
                Read News
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Bell className="h-6 w-6" />
              Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
