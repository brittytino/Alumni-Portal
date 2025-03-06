
# RVS Alumni Portal - ER Diagram

## Primary Entities

1. **User**
   - Attributes: id (PK), studentName, regNo, mobileNumber, email, department, yearOfPassing, permanentAddress, companyName, designation, skills, isAdmin
   - Primary Key: id
   - Relationships: Creates News, Creates Events, Creates JobPostings, Asks Questions, Provides Answers

2. **News**
   - Attributes: id (PK), title, content, date, image, userId (FK)
   - Primary Key: id
   - Foreign Key: userId references User.id
   - Relationship: Created by User

3. **Event**
   - Attributes: id (PK), title, description, date, location, image, userId (FK)
   - Primary Key: id
   - Foreign Key: userId references User.id
   - Relationship: Created by User

4. **JobPosting**
   - Attributes: id (PK), userId (FK), userName, company, title, description, location, type, date, skills, experience
   - Primary Key: id
   - Foreign Key: userId references User.id
   - Relationship: Posted by User

5. **Question**
   - Attributes: id (PK), userId (FK), userName, title, content, date, tags, upvotes
   - Primary Key: id
   - Foreign Key: userId references User.id
   - Relationships: Asked by User, Has Answers

6. **Answer**
   - Attributes: id (PK), questionId (FK), userId (FK), userName, content, date, upvotes
   - Primary Key: id
   - Foreign Keys: questionId references Question.id, userId references User.id
   - Relationships: Belongs to Question, Provided by User

## Relationships

1. **User-News Relationship**
   - One-to-Many: A User can create multiple News items, but each News item is created by one User
   - Cardinality: 1:N

2. **User-Event Relationship**
   - One-to-Many: A User can create multiple Events, but each Event is created by one User
   - Cardinality: 1:N

3. **User-JobPosting Relationship**
   - One-to-Many: A User can post multiple Jobs, but each Job is posted by one User
   - Cardinality: 1:N

4. **User-Question Relationship**
   - One-to-Many: A User can ask multiple Questions, but each Question is asked by one User
   - Cardinality: 1:N

5. **Question-Answer Relationship**
   - One-to-Many: A Question can have multiple Answers, but each Answer belongs to one Question
   - Cardinality: 1:N

6. **User-Answer Relationship**
   - One-to-Many: A User can provide multiple Answers, but each Answer is provided by one User
   - Cardinality: 1:N

## Attribute Properties
- Primary keys are unique and non-null
- Foreign keys maintain referential integrity
- Timestamps are used for creation and modification tracking
- Text fields have appropriate length constraints
- Enumerated types are used for categorical data (e.g., job types)
