
import { User, Event, News } from "@/types/user";

export const users: User[] = [
  {
    id: "1",
    studentName: "Admin User",
    regNo: "admin",
    mobileNumber: "admin123",
    email: "admin@rvs.edu",
    department: "Administration",
    yearOfPassing: 2024,
    isAdmin: true
  },
  {
    id: "2",
    studentName: "Angaleeshwara Gandhi",
    regNo: "1U20CA004",
    mobileNumber: "7397687841",
    email: "agangaleesh@gmail.com",
    department: "BCA",
    yearOfPassing: 2023,
  },
  {
    id: "3",
    studentName: "Dharani K",
    regNo: "1U18CA023",
    mobileNumber: "7373488548",
    email: "kdhy",
    department: "BCA",
    yearOfPassing: 2021,
  },
  {
    id: "4",
    studentName: "KANNAN",
    regNo: "1U20CA036",
    mobileNumber: "7339036274",
    email: "kannananubis@gmail.com",
    department: "BCA",
    yearOfPassing: 2023,
  },
  {
    id: "5",
    studentName: "Ajithkumar G",
    regNo: "1U19CA006",
    mobileNumber: "9677908652",
    email: "ajithkumargunasekar1906@gmail.com",
    department: "BCA",
    yearOfPassing: 2022,
  },
  {
    id: "6",
    studentName: "Jayalakshmi",
    regNo: "1U17CA030",
    mobileNumber: "8248355330",
    email: "jayabubblu240814@gmail.com",
    department: "BCA",
    yearOfPassing: 2020,
  },
  {
    id: "7",
    studentName: "Ramya C",
    regNo: "1U19CA079",
    mobileNumber: "6385330846",
    email: "ramyasamy67@gmail.com",
    department: "BCA",
    yearOfPassing: 2022,
  },
  {
    id: "8",
    studentName: "Jayakumaran S",
    regNo: "1U19CA030",
    mobileNumber: "6379832866",
    email: "jayakumarans18@gmail.com",
    department: "BCA",
    yearOfPassing: 2019,
  },
  {
    id: "9",
    studentName: "Dhurgeshwaran K",
    regNo: "1U21CA018",
    mobileNumber: "6369231815",
    email: "dhurgeshbca2021@gmail.com",
    department: "BCA",
    yearOfPassing: 2024,
  },
  {
    id: "10",
    studentName: "Preethi",
    regNo: "1U17CA072",
    mobileNumber: "9994983469",
    email: "preetz0715@gmail.com",
    department: "BCA",
    yearOfPassing: 2020,
  },
  {
    id: "11",
    studentName: "Arun K",
    regNo: "1U19CA012",
    mobileNumber: "9003362308",
    email: "tamilan7.aa@gmail.com",
    department: "BCA",
    yearOfPassing: 2022,
  }
];

export const events: Event[] = [
  {
    id: "1",
    title: "Annual Alumni Meet 2024",
    description: "Join us for our annual alumni gathering with networking opportunities and guest speakers.",
    date: "2024-05-15",
    location: "RVS College Main Auditorium",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Career Fair 2024",
    description: "Connect with potential employers and fellow alumni in tech industry.",
    date: "2024-06-20",
    location: "RVS College Campus",
    image: "/placeholder.svg",
  },
];

export const news: News[] = [
  {
    id: "1",
    title: "New Computer Lab Inauguration",
    content: "RVS College proudly announces the inauguration of our state-of-the-art computer lab.",
    date: "2024-03-01",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "Alumni Achievement Award",
    content: "Congratulations to our alumni who received recognition in the tech industry.",
    date: "2024-02-15",
    image: "/placeholder.svg",
  },
];
