# MongoDB Cheat Sheet (`note.md`)

## 1. Installation & Environment Setup

### Installation Steps

1. **Download MongoDB Community Server:**
   - Go to the official [MongoDB Download Center](https://www.mongodb.com/try/download/community).
   - Select your platform (Windows / macOS / Linux) and download the package installer (`.msi` for Windows, `.dmg` / `brew` for macOS).
2. **Download MongoDB Shell (`mongosh`):**
   - Download the standalone **MongoDB Shell** (`mongosh`) from MongoDB's official download tools section.
3. **Set Environment Variable (Windows):**
   - Copy the path to the `bin` directory of your `mongosh` installation (e.g., `C:\Program Files\mongosh\bin`).
   - Open **System Properties** > **Environment Variables**.
   - Edit the `Path` variable under **System variables** and add the path.
4. **Verify Installation:**
   ```bash
   mongosh --version
   ```

### Connecting to MongoDB

```bash
# Connect to default local instance (localhost:27017)
mongosh

```

---

## 2. Database & Collection Management

```javascript
// Display current database
db

// Show all available databases
show dbs

// Switch database (creates it automatically upon inserting data)
use myDatabase

// Delete the currently selected database
db.dropDatabase()

// Show all collections in the current database
show collections

// Create a collection explicitly
db.createCollection("students")

// Drop/Delete a collection
db.students.drop()

```

---

## 3. CRUD Operations

### Insert Commands

```javascript
// Insert a single document
db.students.insertOne({
  name: "SpongeBob",
  age: 30,
  gpa: 3.2,
  isEnrolled: true,
  registerDate: new Date(),
});

// Insert multiple documents
db.students.insertMany([
  { name: "Patrick", age: 37, gpa: 1.5, isEnrolled: false },
  { name: "Sandy", age: 27, gpa: 4.0, isEnrolled: true },
  { name: "Squidward", age: 45, gpa: 2.0, isEnrolled: false },
]);
```

---

### Find / Read Commands

```javascript
// Retrieve all documents
db.students.find();

// Formatted JSON output
db.students.find().pretty();

// Query with exact filter
db.students.find({ name: "SpongeBob" });
db.students.find({ isEnrolled: true });

// Projection (select specific fields to return: 1 = include, 0 = exclude)
db.students.find({}, { name: 1, gpa: 1, _id: 0 });
```

---

### Update Commands

```javascript
// Update a single document
db.students.updateOne(
  { name: "SpongeBob" },
  { $set: { gpa: 3.5, isEnrolled: true } },
);

// Unset/remove a field from a document
db.students.updateOne({ name: "SpongeBob" }, { $unset: { registerDate: "" } });

// Update multiple documents
db.students.updateMany({ isEnrolled: false }, { $set: { isEnrolled: true } });
```

---

### Delete Commands

```javascript
// Delete a single matching document
db.students.deleteOne({ name: "Patrick" });

// Delete all documents matching condition
db.students.deleteMany({ isEnrolled: false });

// Delete ALL documents in a collection
db.students.deleteMany({});
```

---

## 4. Query Operators

### Comparison Operators

```javascript
// $eq (Equal to)
db.students.find({ age: { $eq: 30 } });

// $ne (Not Equal to)
db.students.find({ age: { $ne: 30 } });

// $gt (Greater Than) &$gte (Greater Than or Equal)
db.students.find({ gpa: { $gt: 3.0 } });
db.students.find({ gpa: { $gte: 3.2 } });

// $lt (Less Than) &$lte (Less Than or Equal)
db.students.find({ gpa: { $lt: 2.0 } });
db.students.find({ gpa: { $lte: 2.5 } });

// $in (Value matches any in an array)
db.students.find({ name: { $in: ["SpongeBob", "Sandy"] } });

// $nin (Value does NOT match any in an array)
db.students.find({ name: { $nin: ["Patrick", "Squidward"] } });
```

---

### Logical Operators

```javascript
// $and (Both conditions must be true)
db.students.find({
  $and: [{ isEnrolled: true }, { gpa: { $gte: 3.0 } }],
});

// $or (At least one condition must be true)
db.students.find({
  $or: [{ age: { $lt: 30 } }, { gpa: { $gte: 3.5 } }],
});

// $nor (Returns documents failing both conditions)
db.students.find({
  $nor: [{ isEnrolled: false }, { gpa: { $lt: 2.0 } }],
});

// $not (Negates query condition)
db.students.find({ age: { $not: { $gte: 30 } } });
```

---

## 5. Sorting, Limiting & Pagination

```javascript
// Sort: 1 for Ascending, -1 for Descending
db.students.find().sort({ name: 1 });
db.students.find().sort({ gpa: -1 });

// Limit number of returned results
db.students.find().limit(2);

// Skip results (useful for pagination)
db.students.find().skip(1).limit(2);

// Combine Sorting and Limiting
db.students.find().sort({ gpa: -1 }).limit(1);
```

---

## 6. Indexes

```javascript
// Create a single field index
db.students.createIndex({ name: 1 });

// Get list of existing indexes on collection
db.students.getIndexes();

// Drop an index by field structure or name
db.students.dropIndex({ name: 1 });
```
