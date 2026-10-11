import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'universityDB';

async function main() {
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db(dbName);

    // Clean up existing collections for clean execution
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).drop();
    }

    // =========================================================================
    // TASK 1: SCHEMA VALIDATION & COLLECTION CREATION
    // =========================================================================
    console.log('\n--- Task 1: Setting up Schema Validation ---');

    await db.createCollection('students', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['studentNumber', 'name', 'gpa', 'isEnrolled'],
          properties: {
            studentNumber: { bsonType: 'string' },
            name: { bsonType: 'string' },
            gpa: {
              bsonType: ['double', 'int'],
              minimum: 0.0,
              maximum: 4.0
            },
            isEnrolled: { bsonType: 'bool' }
          }
        }
      }
    });

    const studentsCol = db.collection('students');
    const departmentsCol = db.collection('departments');
    const instructorsCol = db.collection('instructors');
    const coursesCol = db.collection('courses');

    // =========================================================================
    // TASK 2: DATA POPULATION
    // =========================================================================
    console.log('--- Task 2: Populating Documents ---');

    // 1. Insert Departments
    const csDeptId = new ObjectId();
    const dsDeptId = new ObjectId();
    await departmentsCol.insertMany([
      { _id: csDeptId, deptCode: 'CS', name: 'Computer Science' },
      { _id: dsDeptId, deptCode: 'DS', name: 'Data Science' }
    ]);

    // 2. Insert Instructors
    const inst1Id = new ObjectId();
    const inst2Id = new ObjectId();
    await instructorsCol.insertMany([
      { _id: inst1Id, name: 'Dr. Alan Turing', email: 'turing@univ.edu', departmentId: csDeptId, rank: 'Professor', salary: 110000 },
      { _id: inst2Id, name: 'Dr. Grace Hopper', email: 'hopper@univ.edu', departmentId: dsDeptId, rank: 'Associate Professor', salary: 98000 }
    ]);

    // 3. Insert Students
    const student1Id = new ObjectId();
    const student2Id = new ObjectId();
    const student3Id = new ObjectId();
    const student4Id = new ObjectId();
    const student5Id = new ObjectId();

    await studentsCol.insertMany([
      {
        _id: student1Id,
        studentNumber: 'STU-101',
        name: 'SpongeBob SquarePants',
        age: 20,
        gpa: 3.8,
        isEnrolled: true,
        registerDate: new Date('2023-09-01'),
        contact: { email: 'spongebob@bikini.edu', phone: '555-0101', address: '124 Conch Street' },
        academicRecord: [
          { courseCode: 'CS101', semester: 'Fall 2023', grade: 'A' },
          { courseCode: 'MATH101', semester: 'Fall 2023', grade: 'B' }
        ]
      },
      {
        _id: student2Id,
        studentNumber: 'STU-102',
        name: 'Patrick Star',
        age: 22,
        gpa: 2.1,
        isEnrolled: true,
        registerDate: new Date('2023-09-01'),
        contact: { email: 'patrick@bikini.edu', phone: '555-0102', address: 'Under a Rock' },
        academicRecord: [
          { courseCode: 'CS101', semester: 'Fall 2023', grade: 'C' }
        ]
      },
      {
        _id: student3Id,
        studentNumber: 'STU-103',
        name: 'Sandy Cheeks',
        age: 21,
        gpa: 4.0,
        isEnrolled: true,
        registerDate: new Date('2022-09-01'),
        contact: { email: 'sandy@bikini.edu', phone: '555-0103', address: 'Treedome' },
        academicRecord: [
          { courseCode: 'CS101', semester: 'Fall 2022', grade: 'A' },
          { courseCode: 'DS101', semester: 'Spring 2023', grade: 'A' }
        ]
      },
      {
        _id: student4Id,
        studentNumber: 'STU-104',
        name: 'Squidward Tentacles',
        age: 25,
        gpa: 2.8,
        isEnrolled: false,
        registerDate: new Date('2021-09-01'),
        contact: { email: 'squidward@bikini.edu', phone: '555-0104', address: '122 Conch Street' },
        academicRecord: [
          { courseCode: 'CS101', semester: 'Fall 2021', grade: 'B' }
        ]
      },
      {
        _id: student5Id,
        studentNumber: 'STU-105',
        name: 'Sheldon Plankton',
        age: 24,
        gpa: 3.5,
        isEnrolled: false,
        registerDate: new Date('2022-01-15'),
        contact: { email: 'plankton@chumbucket.edu', phone: '555-0105', address: 'Chum Bucket' },
        academicRecord: [
          { courseCode: 'DS101', semester: 'Spring 2022', grade: 'A' }
        ]
      }
    ]);

    // 4. Insert Courses
    await coursesCol.insertMany([
      {
        courseCode: 'CS101',
        title: 'Introduction to Computer Science',
        credits: 4,
        departmentId: csDeptId,
        instructorId: inst1Id,
        prerequisites: [],
        enrolledStudentIds: [student1Id, student2Id, student3Id, student4Id]
      },
      {
        courseCode: 'CS201',
        title: 'Data Structures and Algorithms',
        credits: 4,
        departmentId: csDeptId,
        instructorId: inst1Id,
        prerequisites: ['CS101'],
        enrolledStudentIds: [student1Id, student3Id]
      },
      {
        courseCode: 'DS101',
        title: 'Fundamentals of Data Science',
        credits: 3,
        departmentId: dsDeptId,
        instructorId: inst2Id,
        prerequisites: ['CS101'],
        enrolledStudentIds: [student3Id, student5Id]
      }
    ]);

    // =========================================================================
    // TASK 3: QUERIES & PAGINATION
    // =========================================================================
    console.log('\n--- Task 3: Query Execution ---');

    // Query 1: Students with grade "A" in CS101
    const gradeAStudents = await studentsCol.find({
      academicRecord: { $elemMatch: { courseCode: 'CS101', grade: 'A' } }
    }).toArray();
    console.log('Students with Grade A in CS101:', gradeAStudents.map(s => s.name));

    // Query 2: Pagination (Page 2, 2 items per page)
    const paginatedStudents = await studentsCol.find()
      .sort({ gpa: -1 })
      .skip(2)
      .limit(2)
      .toArray();
    console.log('Paginated Students (Page 2):', paginatedStudents.map(s => ({ name: s.name, gpa: s.gpa })));

    // =========================================================================
    // TASK 4: AGGREGATION PIPELINE
    // =========================================================================
    console.log('\n--- Task 4: Aggregation Pipeline ---');

    const analyticsPipeline = [
      {
        $group: {
          _id: '$isEnrolled',
          totalStudents: { $sum: 1 },
          avgGpa: { $avg: '$gpa' },
          maxGpa: { $max: '$gpa' }
        }
      },
      {
        $project: {
          _id: 0,
          isEnrolled: '$_id',
          totalStudents: 1,
          averageGpa: { $round: ['$avgGpa', 2] },
          highestGpa: '$maxGpa'
        }
      }
    ];

    const analyticsResult = await studentsCol.aggregate(analyticsPipeline).toArray();
    console.log('Enrollment Analytics:', analyticsResult);

    // =========================================================================
    // TASK 5: INDEXES & ATOMIC UPDATES
    // =========================================================================
    console.log('\n--- Task 5: Indexing & Document Update ---');

    // Create Compound Index
    await studentsCol.createIndex({ isEnrolled: 1, gpa: -1 });
    console.log('Compound Index on (isEnrolled, gpa) created.');

    // Atomic Push to Array & GPA Update
    await studentsCol.updateOne(
      { studentNumber: 'STU-101' },
      {
        $push: { academicRecord: { courseCode: 'DS201', semester: 'Fall 2024', grade: 'A' } },
        $set: { gpa: 3.9 }
      }
    );
    console.log("Updated STU-101's GPA to 3.9 and appended new course record.");

  } catch (error) {
    console.error('Execution Error:', error);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

main();