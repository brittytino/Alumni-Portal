
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { News as NewsType } from "@/types/user";
import { news as initialNews } from "../data/mockData";

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsType[]>(() => {
    const storedNews = localStorage.getItem("news");
    return storedNews ? JSON.parse(storedNews) : initialNews;
  });

  useEffect(() => {
    // This effect refreshes the news from localStorage if updated elsewhere
    const handleStorageChange = () => {
      const storedNews = localStorage.getItem("news");
      if (storedNews) {
        setNewsItems(JSON.parse(storedNews));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Latest News</h1>
      <div className="grid gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-60 w-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-4">{item.content}</p>
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
