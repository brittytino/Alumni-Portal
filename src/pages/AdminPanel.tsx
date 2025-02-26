
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  Users,
  Mail,
  Phone,
  GraduationCap,
  Building,
} from "lucide-react";
import { format } from "date-fns";
import { Event, News, User } from "@/types/user";
import { events as initialEvents, news as initialNews, users as initialUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

// Form Components
const EventForm = ({ event, onSubmit, onClose }: { event?: Event; onSubmit: (data: Event) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState<Event>(
    event || {
      id: "",
      title: "",
      description: "",
      date: "",
      location: "",
      image: "/placeholder.svg",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: formData.id || Date.now().toString() });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Location</Label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>
      <Button type="submit">{event ? "Update" : "Create"} Event</Button>
    </form>
  );
};

const NewsForm = ({ news, onSubmit, onClose }: { news?: News; onSubmit: (data: News) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState<News>(
    news || {
      id: "",
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      image: "/placeholder.svg",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: formData.id || Date.now().toString() });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Content</Label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={formData.date.split("T")[0]}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <Button type="submit">{news ? "Update" : "Create"} News</Button>
    </form>
  );
};

const UserForm = ({ user, onSubmit, onClose }: { user?: User; onSubmit: (data: User) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState<User>(
    user || {
      id: "",
      studentName: "",
      regNo: "",
      mobileNumber: "",
      email: "",
      department: "",
      yearOfPassing: new Date().getFullYear(),
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: formData.id || Date.now().toString() });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Student Name</Label>
        <Input
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Registration Number</Label>
        <Input
          value={formData.regNo}
          onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Mobile Number</Label>
        <Input
          value={formData.mobileNumber}
          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Department</Label>
        <Input
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Year of Passing</Label>
        <Input
          type="number"
          value={formData.yearOfPassing}
          onChange={(e) => setFormData({ ...formData, yearOfPassing: parseInt(e.target.value) })}
          required
        />
      </div>
      <Button type="submit">{user ? "Update" : "Create"} User</Button>
    </form>
  );
};

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : initialEvents;
  });
  const [news, setNews] = useState<News[]>(() => {
    const stored = localStorage.getItem("news");
    return stored ? JSON.parse(stored) : initialNews;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : initialUsers;
  });

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You don't have permission to access this page.
        </p>
      </div>
    );
  }

  const handleSaveEvent = (event: Event) => {
    if (selectedEvent) {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    } else {
      setEvents([...events, event]);
    }
    setSelectedEvent(null);
    setShowEventForm(false);
    toast({
      title: "Success",
      description: `Event ${selectedEvent ? "updated" : "created"} successfully!`,
    });
  };

  const handleSaveNews = (newsItem: News) => {
    if (selectedNews) {
      setNews(news.map((n) => (n.id === newsItem.id ? newsItem : n)));
    } else {
      setNews([...news, newsItem]);
    }
    setSelectedNews(null);
    setShowNewsForm(false);
    toast({
      title: "Success",
      description: `News ${selectedNews ? "updated" : "created"} successfully!`,
    });
  };

  const handleSaveUser = (userData: User) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === userData.id ? userData : u)));
    } else {
      setUsers([...users, userData]);
    }
    setSelectedUser(null);
    setShowUserForm(false);
    toast({
      title: "Success",
      description: `User ${selectedUser ? "updated" : "created"} successfully!`,
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    toast({
      title: "Success",
      description: "Event deleted successfully!",
    });
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((n) => n.id !== id));
    toast({
      title: "Success",
      description: "News deleted successfully!",
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({
      title: "Success",
      description: "User deleted successfully!",
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-2" />
            News
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage Users</CardTitle>
                <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedUser(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedUser ? "Edit" : "Add"} User</DialogTitle>
                    </DialogHeader>
                    <UserForm
                      user={selectedUser || undefined}
                      onSubmit={handleSaveUser}
                      onClose={() => setShowUserForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage alumni user accounts and their information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          {user.studentName}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {user.department} ({user.yearOfPassing})
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {user.mobileNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserForm(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage Events</CardTitle>
                <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedEvent(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedEvent ? "Edit" : "Add"} Event</DialogTitle>
                    </DialogHeader>
                    <EventForm
                      event={selectedEvent || undefined}
                      onSubmit={handleSaveEvent}
                      onClose={() => setShowEventForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(event.date), "MMMM d, yyyy")} at {event.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage News</CardTitle>
                <Dialog open={showNewsForm} onOpenChange={setShowNewsForm}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedNews(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add News
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedNews ? "Edit" : "Add"} News</DialogTitle>
                    </DialogHeader>
                    <NewsForm
                      news={selectedNews || undefined}
                      onSubmit={handleSaveNews}
                      onClose={() => setShowNewsForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(item.date), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedNews(item);
                        setShowNewsForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNews(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
