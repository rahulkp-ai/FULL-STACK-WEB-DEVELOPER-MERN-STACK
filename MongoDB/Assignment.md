# MongoDB Practical Assignment: Campus & Learning Management Platform

- **Topic:** MongoDB

- **Instructor: RAHUL KP**

## Objective

Design and implement a production-grade MongoDB database for a university platform. You will implement schema validation, embedded vs. referenced data modeling, multi-stage aggregation pipelines, indexing strategies, and transactional updates.

---

## 1. Schema Design

The system models four main entities:

1. `departments`: Academic departments overseeing courses and faculty.
2. `instructors`: Faculty members assigned to departments and courses.
3. `students`: Enrolled students with embedded contact details, academic history, and course grades.
4. `courses`: Courses offering multiple sections, credits, prerequisites, and student enrollments.

### Schema Diagram

![Schema Diagram](../figs/MongoDB/Schema%20Diagram.png)

---

## 2. Comprehensive Assignment Tasks

### Task 1: Environment Setup & Schema Validation

1. Switch to a database named `universityDB`.
2. Create the `students` collection with strict JSON Schema Validation requiring:

- `studentNumber` (String, required)
- `name` (String, required)
- `gpa` (Double/Number between `0.0` and `4.0`, required)
- `isEnrolled` (Boolean, required)

### Task 2: Multi-Collection Data Population

1. Insert **2 Departments** (`Computer Science`, `Data Science`).
2. Insert **2 Instructors** assigned to these departments.
3. Insert **5 Student Documents** with nested contact information and completed course history arrays.
4. Insert **3 Course Documents** with credits, instructor references, and prerequisite arrays.

### Task 3: Complex Queries & Array Operations

1. Find all students who have achieved a grade of `"A"` in the course `"CS101"` using array query operators (`$elemMatch`).
2. Query courses that require `"CS101"` as a prerequisite **and** carry 3 or more credits.
3. Paginate the student list: Retrieve Page 2 (2 items per page) sorted by `gpa` descending.

### Task 4: Multi-Stage Aggregation Pipelines

1. **Department Analytics Pipeline:** Calculate average GPA, total enrolled students, and highest GPA grouped by enrollment status (`isEnrolled`).
2. **Student-Course Join Pipeline:** Use `$lookup` to join `courses` with `students` using `enrolledStudentIds`, projecting only the course title, credit count, and student names.

### Task 5: Updates, Indexes & Performance Optimization

1. Create a **Compound Index** on `students` for `{ isEnrolled: 1, gpa: -1 }` to optimize high-GPA active student lookup.
2. Create a **Text Index** on `courses` covering `title` for keyword search.
3. Update a student's record by pushing a new completed course `{ courseCode: "DS201", semester: "Fall 2024", grade: "A" }` into their `academicRecord` array while atomically updating their `gpa`.

---
