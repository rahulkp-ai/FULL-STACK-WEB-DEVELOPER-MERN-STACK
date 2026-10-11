## 3. Answer Key (`mongosh` Execution Script)

```javascript
// ============================================================================
// TASK 1: DATABASE & SCHEMA VALIDATION SETUP
// ============================================================================

use universityDB

// Create students collection with JSON Schema Validation
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentNumber", "name", "gpa", "isEnrolled"],
      properties: {
        studentNumber: {
          bsonType: "string",
          description: "Must be a string and is required"
        },
        name: {
          bsonType: "string",
          description: "Must be a string and is required"
        },
        gpa: {
          bsonType: ["double", "int"],
          minimum: 0.0,
          maximum: 4.0,
          description: "Must be a number between 0.0 and 4.0"
        },
        isEnrolled: {
          bsonType: "bool",
          description: "Must be a boolean and is required"
        }
      }
    }
  }
})

db.createCollection("departments")
db.createCollection("instructors")
db.createCollection("courses")


// ============================================================================
// TASK 2: MULTI-COLLECTION DATA POPULATION
// ============================================================================

// 1. Insert Departments
const csDeptId = new ObjectId()
const dsDeptId = new ObjectId()

db.departments.insertMany([
  { _id: csDeptId, deptCode: "CS", name: "Computer Science" },
  { _id: dsDeptId, deptCode: "DS", name: "Data Science" }
])

// 2. Insert Instructors
const inst1Id = new ObjectId()
const inst2Id = new ObjectId()

db.instructors.insertMany([
  { _id: inst1Id, name: "Dr. Alan Turing", email: "turing@univ.edu", departmentId: csDeptId, rank: "Professor", salary: 110000 },
  { _id: inst2Id, name: "Dr. Grace Hopper", email: "hopper@univ.edu", departmentId: dsDeptId, rank: "Associate Professor", salary: 98000 }
])

// 3. Insert Students
const student1Id = new ObjectId()
const student2Id = new ObjectId()
const student3Id = new ObjectId()
const student4Id = new ObjectId()
const student5Id = new ObjectId()

db.students.insertMany([
  {
    _id: student1Id,
    studentNumber: "STU-101",
    name: "SpongeBob SquarePants",
    age: 20,
    gpa: 3.8,
    isEnrolled: true,
    registerDate: new Date("2023-09-01"),
    contact: { email: "spongebob@bikini.edu", phone: "555-0101", address: "124 Conch Street" },
    academicRecord: [
      { courseCode: "CS101", semester: "Fall 2023", grade: "A" },
      { courseCode: "MATH101", semester: "Fall 2023", grade: "B" }
    ]
  },
  {
    _id: student2Id,
    studentNumber: "STU-102",
    name: "Patrick Star",
    age: 22,
    gpa: 2.1,
    isEnrolled: true,
    registerDate: new Date("2023-09-01"),
    contact: { email: "patrick@bikini.edu", phone: "555-0102", address: "Under a Rock" },
    academicRecord: [
      { courseCode: "CS101", semester: "Fall 2023", grade: "C" }
    ]
  },
  {
    _id: student3Id,
    studentNumber: "STU-103",
    name: "Sandy Cheeks",
    age: 21,
    gpa: 4.0,
    isEnrolled: true,
    registerDate: new Date("2022-09-01"),
    contact: { email: "sandy@bikini.edu", phone: "555-0103", address: "Treedome" },
    academicRecord: [
      { courseCode: "CS101", semester: "Fall 2022", grade: "A" },
      { courseCode: "DS101", semester: "Spring 2023", grade: "A" }
    ]
  },
  {
    _id: student4Id,
    studentNumber: "STU-104",
    name: "Squidward Tentacles",
    age: 25,
    gpa: 2.8,
    isEnrolled: false,
    registerDate: new Date("2021-09-01"),
    contact: { email: "squidward@bikini.edu", phone: "555-0104", address: "122 Conch Street" },
    academicRecord: [
      { courseCode: "CS101", semester: "Fall 2021", grade: "B" }
    ]
  },
  {
    _id: student5Id,
    studentNumber: "STU-105",
    name: "Sheldon Plankton",
    age: 24,
    gpa: 3.5,
    isEnrolled: false,
    registerDate: new Date("2022-01-15"),
    contact: { email: "plankton@chumbucket.edu", phone: "555-0105", address: "Chum Bucket" },
    academicRecord: [
      { courseCode: "DS101", semester: "Spring 2022", grade: "A" }
    ]
  }
])

// 4. Insert Courses
db.courses.insertMany([
  {
    courseCode: "CS101",
    title: "Introduction to Computer Science",
    credits: 4,
    departmentId: csDeptId,
    instructorId: inst1Id,
    prerequisites: [],
    enrolledStudentIds: [student1Id, student2Id, student3Id, student4Id]
  },
  {
    courseCode: "CS201",
    title: "Data Structures and Algorithms",
    credits: 4,
    departmentId: csDeptId,
    instructorId: inst1Id,
    prerequisites: ["CS101"],
    enrolledStudentIds: [student1Id, student3Id]
  },
  {
    courseCode: "DS101",
    title: "Fundamentals of Data Science",
    credits: 3,
    departmentId: dsDeptId,
    instructorId: inst2Id,
    prerequisites: ["CS101"],
    enrolledStudentIds: [student3Id, student5Id]
  }
])


// ============================================================================
// TASK 3: COMPLEX QUERIES & ARRAY OPERATIONS
// ============================================================================

// 1. Find students with grade "A" in "CS101"
db.students.find({
  academicRecord: {
    $elemMatch: { courseCode: "CS101", grade: "A" }
  }
})

// 2. Query courses requiring "CS101" prerequisite and >= 3 credits
db.students.find() // helper verify
db.courses.find({
  $and: [
    { prerequisites: "CS101" },
    { credits: { $gte: 3 } }
  ]
})

// 3. Pagination: Page 2 (Limit: 2, Skip: 2) sorted by GPA descending
db.students.find()
  .sort({ gpa: -1 })
  .skip(2)
  .limit(2)


// ============================================================================
// TASK 4: AGGREGATION PIPELINES
// ============================================================================

// 1. Group analytics by enrollment status
db.students.aggregate([
  {
    $group: {
      _id: "$isEnrolled",
      totalStudents: { $sum: 1 },
      avgGpa: { $avg: "$gpa" },
      maxGpa: { $max: "$gpa" },
      minGpa: { $min: "$gpa" }
    }
  },
  {
    $project: {
      _id: 0,
      isEnrolledStatus: "$_id",
      totalStudents: 1,
      averageGPA: { $round: ["$avgGpa", 2] },
      highestGPA: "$maxGpa",
      lowestGPA: "$minGpa"
    }
  }
])

// 2. Lookup join between Courses and Students
db.courses.aggregate([
  {
    $lookup: {
      from: "students",
      localField: "enrolledStudentIds",
      foreignField: "_id",
      as: "enrolledStudentsDetails"
    }
  },
  {
    $project: {
      _id: 0,
      courseCode: 1,
      title: 1,
      credits: 1,
      "enrolledStudentsDetails.name": 1,
      "enrolledStudentsDetails.gpa": 1
    }
  }
])


// ============================================================================
// TASK 5: INDEXES & ATOMIC ARRAY UPDATES
// ============================================================================

// 1. Create Compound Index
db.students.createIndex({ isEnrolled: 1, gpa: -1 })

// 2. Create Text Index on course title
db.courses.createIndex({ title: "text" })

// Verify indexes
db.students.getIndexes()
db.courses.getIndexes()

// 3. Atomic array push and GPA update
db.students.updateOne(
  { studentNumber: "STU-101" },
  {
    $push: {
      academicRecord: {
        courseCode: "DS201",
        semester: "Fall 2024",
        grade: "A"
      }
    },
    $set: { gpa: 3.9 }
  }
)

```
