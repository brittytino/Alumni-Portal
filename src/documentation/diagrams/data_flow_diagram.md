
# RVS Alumni Portal - Data Flow Diagram

## Level 0 DFD (Context Diagram)
- Single process: RVS Alumni Portal
- External entities: Alumni Users, Administrators
- Data flows:
  - User credentials, profile information, content submissions flowing in
  - Displayed content, notifications, search results flowing out

## Level 1 DFD
Major processes:

1. **User Management Process**
   - Handles registration, authentication, and profile management
   - Data flows: user credentials, profile data
   - Connected to User Data Store

2. **Content Management Process**
   - Manages news, events, and other content
   - Data flows: content submissions, media files, approval status
   - Connected to Content Data Store

3. **Job Portal Process**
   - Handles job listings and applications
   - Data flows: job details, search criteria, application data
   - Connected to Job Data Store

4. **Forum Management Process**
   - Processes questions, answers, and interactions
   - Data flows: questions, answers, votes
   - Connected to Forum Data Store

5. **Notification Process**
   - Manages alerts and communication
   - Data flows: notification triggers, message content
   - Connected to all other processes

## Level 2 DFD
Detailed processes:

### For User Management
- User Registration Process
- Authentication Process
- Profile Update Process
- Password Recovery Process

### For Content Management
- Content Creation Process
- Content Editing Process
- Media Upload Process
- Content Display Process

### For Job Portal
- Job Listing Process
- Job Search Process
- Job Application Process
- Job Management Process

## Data Stores
- User Store: Alumni and administrator profiles
- News Store: College news articles
- Events Store: Alumni gathering information
- Jobs Store: Career opportunities
- Questions Store: Forum discussions
- Answers Store: Forum responses
- Notifications Store: System alerts

## Key Data Flows
- Authentication flows between users and the system
- Content submission flows from administrators to content stores
- Search query flows from users to data stores and results back to users
- Profile data flows between users and the user store
