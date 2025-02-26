
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JobPosting } from "@/types/user";

interface JobPostFormProps {
  onClose: () => void;
  existingJob?: JobPosting;
}

const JOB_TYPES = ["full-time", "part-time", "contract", "internship"] as const;
type JobType = typeof JOB_TYPES[number];

const JobPostForm = ({ onClose, existingJob }: JobPostFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: existingJob?.title || "",
    company: existingJob?.company || "",
    description: existingJob?.description || "",
    location: existingJob?.location || "",
    type: (existingJob?.type || "full-time") as JobType,
    experience: existingJob?.experience || "",
    skills: existingJob?.skills?.join(", ") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newJob: JobPosting = {
      id: existingJob?.id || Date.now().toString(),
      userId: user.id,
      userName: user.studentName,
      ...formData,
      date: new Date().toISOString(),
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      type: formData.type as "full-time" | "part-time" | "contract" | "internship",
    };

    const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const updatedJobs = existingJob
      ? existingJobs.map((job: JobPosting) =>
          job.id === existingJob.id ? newJob : job
        )
      : [...existingJobs, newJob];

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast({
      title: "Success",
      description: existingJob
        ? "Job post updated successfully"
        : "Job post created successfully",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as JobType })
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          required
        >
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="experience">Experience Required</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value })
          }
          placeholder="React, TypeScript, Node.js"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {existingJob ? "Update" : "Post"} Job
        </Button>
      </div>
    </form>
  );
};

export const JobFormDialog = ({
  existingJob,
  trigger,
}: {
  existingJob?: JobPosting;
  trigger: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingJob ? "Edit Job Post" : "Create New Job Post"}
          </DialogTitle>
        </DialogHeader>
        <JobPostForm onClose={() => setOpen(false)} existingJob={existingJob} />
      </DialogContent>
    </Dialog>
  );
};

export default JobPostForm;
