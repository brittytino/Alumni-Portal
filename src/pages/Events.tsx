import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { events as initialEvents } from "../data/mockData";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import type { Event } from "@/types/user";

const Events = () => {
  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : initialEvents;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Upcoming Events</h1>
      <div className="grid gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-60 w-full object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(event.date), "MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">No upcoming events</h3>
            <p className="text-gray-500 mt-2">Check back later for new events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
