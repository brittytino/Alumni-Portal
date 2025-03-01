
export interface User {
  id: string;
  studentName: string;
  regNo: string;
  mobileNumber: string;
  email: string;
  department: string;
  yearOfPassing: number;
  permanentAddress?: string;
  companyName?: string;
  designation?: string;
  skills?: string;
  isAdmin?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'event' | 'news';
}

export interface Question {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  upvotes: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
  upvotes: number;
}

export interface JobPosting {
  id: string;
  userId: string;
  userName: string;
  company: string;
  title: string;
  description: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship';
  date: string;
  skills: string[];
  experience: string;
}
