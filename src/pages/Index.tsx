
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  Calendar,
  Newspaper,
  MessageSquare,
  Briefcase,
  ArrowRight,
  Building,
  Award,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Global Network",
    description: "Connect with accomplished alumni across industries worldwide.",
  },
  {
    icon: <Building className="w-12 h-12 text-primary" />,
    title: "Career Growth",
    description: "Access exclusive job opportunities and professional development resources.",
  },
  {
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Mentorship",
    description: "Learn from industry leaders and experienced professionals.",
  },
  {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    title: "Knowledge Sharing",
    description: "Participate in workshops, seminars, and skill-building sessions.",
  },
];

const successStories = [
  {
    name: "Rohan Kumar",
    role: "Chief Technology Officer",
    company: "InnovateTech Solutions",
    image: "https://img.freepik.com/premium-photo/young-indian-college-boy-holding-backpack-books-giving-happy-expression_54391-7209.jpg",
    quote: "The alumni network played a crucial role in my career progression.",
  },
  {
    name: "Janany Krishnan",
    role: "Founder & CEO",
    company: "Future Dynamics",
    image: "https://as2.ftcdn.net/jpg/06/22/43/91/1000_F_622439103_awYTqLhzL9PGpScksUGeyGey6ETiaqZI.jpg",
    quote: "The connections I made through the alumni network were invaluable.",
  },
  {
    name: "Raagavi Srinivasan",
    role: "Research Director",
    company: "Global Research Institute",
    image: "https://img.freepik.com/premium-photo/young-indian-college-girl-holding-backpack-books-giving-happy-expression_54391-7225.jpg",
    quote: "The mentorship programs helped shape my research career.",
  },
];

const jobHighlights = [
  {
    company: "Global Technologies",
    position: "Senior Software Architect",
    location: "Remote / London",
    type: "Full-time",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
  {
    company: "Innovation Labs",
    position: "AI Research Scientist",
    location: "Singapore",
    type: "Full-time",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
  {
    company: "Future Finance",
    position: "Investment Analyst",
    location: "New York",
    type: "Full-time",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.vaave.com/blog/wp-content/uploads/2024/04/Marketing-Block-Image-5.png"
            alt="Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GraduationCap className="w-20 h-20 mx-auto mb-8 text-primary" />
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Welcome to the
              <span className="block text-primary">RVS Alumni Network</span>
            </h1>
            <p className="text-xl mb-12 text-gray-200 max-w-3xl mx-auto">
              Join our prestigious community of over 50,000 alumni making an impact across the globe.
              Connect, collaborate, and grow with fellow graduates.
            </p>
            <div className="flex gap-6 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Join the Network
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20"
                onClick={() => navigate("/register")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Join Our Network?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of being part of our distinguished alumni community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Alumni Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn from the experiences of our accomplished alumni
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <blockquote className="text-gray-600 italic mb-6">
                    "{story.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg">{story.name}</h3>
                    <p className="text-primary">{story.role}</p>
                    <p className="text-gray-500 text-sm">{story.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Opportunities */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Opportunities</h2>
              <p className="text-xl text-gray-600">
                Exclusive positions shared by our alumni network
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2"
            >
              View All Opportunities <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {jobHighlights.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <div className="relative h-48 rounded-t-2xl overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.company}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{job.position}</h3>
                    <p className="text-gray-200">{job.company}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-b-2xl shadow-lg">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {job.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join Our Distinguished Alumni Network?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Connect with fellow graduates, access exclusive opportunities, and be part of a global community of achievers.
          </p>
          <div className="flex gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={() => navigate("/register")}
            >
              Join Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 hover:bg-white/20"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <GraduationCap className="w-12 h-12 mx-auto mb-6 text-primary" />
          <p className="mb-4">RVS Alumni Network - Connecting Generations of Excellence</p>
          <p>&copy; {new Date().getFullYear()} RVS Alumni Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
