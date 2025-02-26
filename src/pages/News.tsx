
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { news } from "../data/mockData";
import { format } from "date-fns";

const News = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      <div className="grid gap-6">
        {news.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(item.date), "MMMM d, yyyy")}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
