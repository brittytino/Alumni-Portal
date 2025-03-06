
# RVS Alumni Portal - Use Case Diagram

## Primary Actors
- Alumni User
- Administrator
- System

## Use Cases

### For Alumni Users
- Register Account
- Login to System
- View Profile
- Edit Personal Information
- Browse News Articles
- View Upcoming Events
- Search Job Opportunities
- Post Job Listings
- Ask Questions in Forum
- Answer Forum Questions
- Upvote Helpful Answers

### For Administrators
- Manage User Accounts
- Create News Articles
- Edit News Content
- Upload News Images
- Create Event Announcements
- Manage Event Details
- Moderate Job Postings
- Oversee Forum Content
- Generate Reports

### For System
- Authenticate Users
- Store User Data
- Maintain Session Information
- Send Notifications

## Use Case Relationships
- Include Relationships:
  - "Edit Profile" includes "Authenticate User"
  - "Post Job" includes "Validate Job Details"

- Extend Relationships:
  - "Login" is extended by "Reset Password"
  - "View News" is extended by "Filter News by Category"

- Generalization Relationships:
  - "Post Content" is generalized into "Post News," "Post Job," and "Post Question"

## Diagram Notes
This diagram illustrates the interactions between users and the system, highlighting the main functions available to different user roles. It serves as a visual contract between stakeholders, outlining the system's functional requirements and user interactions.
