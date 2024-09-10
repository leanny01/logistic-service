/**

Instructions to Run the Script:

1. Save the Script: Save the updated JavaScript code into a file named `seed.js`.

2. Connect to MongoDB: Open a terminal and connect to your MongoDB instance using the `mongo` shell command.

3. Execute the Script: Run the script using the `mongo` shell by executing the following command:

   ```sh
   mongo <path_to_script>/seed.js
 
 */

// Select the database to be used
const dbName = "logistic_db"; // Replace with your actual database name
const db = connect("localhost:27017/" + dbName); // Connect to the MongoDB instance and select the database

// Check if a collection exists
function collectionExists(collectionName) {
  return db.getCollectionNames().includes(collectionName);
}

// Create or update the user collection
function createOrUpdateUserCollection() {
  const collectionName = "user";
  if (!collectionExists(collectionName)) {
    db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "user",
          required: [
            "_id",
            "name",
            "surname",
            "email",
            "phone",
            "role",
            "status",
            "company",
            "position",
          ],
          properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" },
            surname: { bsonType: "string" },
            email: { bsonType: "string" },
            phone: { bsonType: "string" },
            password: { bsonType: "string" },
            whatsapp_phone: { bsonType: "string" },
            role: {
              bsonType: "string",
              enum: ["admin", "user", "manager"],
            },
            status: {
              bsonType: "string",
              enum: ["active", "inactive", "suspended"],
            },
            company: { bsonType: "string" },
            position: { bsonType: "string" },
          },
        },
      },
    });
    print("Created collection 'user'");
  } else {
    db.runCommand({
      collMod: collectionName,
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "user",
          required: [
            "_id",
            "name",
            "surname",
            "email",
            "phone",
            "role",
            "status",
            "company",
            "position",
          ],
          properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" },
            surname: { bsonType: "string" },
            email: { bsonType: "string" },
            phone: { bsonType: "string" },
            password: { bsonType: "string" },
            whatsapp_phone: { bsonType: "string" },
            role: {
              bsonType: "string",
              enum: ["super_admin","admin", "user", "manager"],
            },
            status: {
              bsonType: "string",
              enum: ["active", "inactive", "suspended"],
            },
            company: { bsonType: "string" },
            position: { bsonType: "string" },
          },
        },
      },
      validationLevel: "moderate",
    });
    print("Updated collection 'user' schema");
  }
}

// Create or update the lead collection
function createOrUpdateLeadCollection() {
  const collectionName = "lead";
  if (!collectionExists(collectionName)) {
    db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "lead",
          required: ["_id"],
          properties: {
            _id: { bsonType: "objectId" },
            total_bedroom: { bsonType: "string" },
            move_date: { bsonType: "date" },
            is_qualified: { bsonType: "bool" },
            is_deleted: { bsonType: "bool" },
            category: { bsonType: "string" },
            contact_info: {
              bsonType: "object",
              properties: {
                name: { bsonType: "string" },
                surname: { bsonType: "string" },
                title: { bsonType: "string" },
                email: { bsonType: "string" },
                whatsapp_phone: { bsonType: "string" },
                phone: { bsonType: "string" },
              },
            },
            moving_from: {
              bsonType: "object",
              properties: {
                address: { bsonType: "string" },
                suburb: { bsonType: "string" },
                city: { bsonType: "string" },
                postal_code: { bsonType: "string" },
              },
            },
            moving_to: {
              bsonType: "object",
              properties: {
                address: { bsonType: "string" },
                suburb: { bsonType: "string" },
                city: { bsonType: "string" },
                postal_code: { bsonType: "string" },
              },
            },
            sent_to: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            created_by: { bsonType: "objectId" },
          },
        },
      },
    });
    print("Created collection 'lead'");
  } else {
    db.runCommand({
      collMod: collectionName,
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "lead",
          required: ["_id"],
          properties: {
            _id: { bsonType: "objectId" },
            total_bedroom: { bsonType: "string" },
            move_date: { bsonType: "date" },
            is_qualified: { bsonType: "bool" },
            is_deleted: { bsonType: "bool" },
            category: { bsonType: "string" },
            contact_info: {
              bsonType: "object",
              properties: {
                name: { bsonType: "string" },
                surname: { bsonType: "string" },
                title: { bsonType: "string" },
                email: { bsonType: "string" },
                whatsapp_phone: { bsonType: "string" },
                phone: { bsonType: "string" },
              },
            },
            moving_from: {
              bsonType: "object",
              properties: {
                address: { bsonType: "string" },
                suburb: { bsonType: "string" },
                city: { bsonType: "string" },
                postal_code: { bsonType: "string" },
              },
            },
            moving_to: {
              bsonType: "object",
              properties: {
                address: { bsonType: "string" },
                suburb: { bsonType: "string" },
                city: { bsonType: "string" },
                postal_code: { bsonType: "string" },
              },
            },
            sent_to: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            created_by: { bsonType: "objectId" },
          },
        },
      },
      validationLevel: "moderate",
    });
    print("Updated collection 'lead' schema");
  }
}

// Populate collections with dummy data
function populateCollections() {
  const users = [
    {
      _id: ObjectId("64ed7f2dcbf1c2a9e9f15c01"),
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      password: "hashed_password1",
      whatsapp_phone: "123-456-7890",
      role: "super_admin",
      status: "active",
      company: "ExampleCorp",
      position: "CTO",
    },
    {
      _id: ObjectId("64ed7f2dcbf1c2a9e9f15c02"),
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      password: "hashed_password2",
      whatsapp_phone: "987-654-3210",
      role: "user",
      status: "active",
      company: "AnotherCorp",
      position: "Manager",
    },
    {
      _id: ObjectId("64ed7f2dcbf1c2a9e9f15c03"),
      name: "Alice",
      surname: "Johnson",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      password: "hashed_password3",
      whatsapp_phone: "555-123-4567",
      role: "manager",
      status: "inactive",
      company: "ExampleCorp",
      position: "Operations Manager",
    },
  ];

  const leads = [
    {
      _id: ObjectId("64ed7f2dcbf1c2a9e9f15c04"),
      total_bedroom: "3",
      move_date: new Date("2024-09-15"),
      is_qualified: true,
      is_deleted: false,
      category: "residential",
      contact_info: {
        name: "Michael",
        surname: "Brown",
        title: "Mr.",
        email: "michael.brown@example.com",
        whatsapp_phone: "333-444-5555",
        phone: "333-444-5555",
      },
      moving_from: {
        address: "123 Elm St",
        suburb: "Greenfield",
        city: "Johannesburg",
        postal_code: "2001",
      },
      moving_to: {
        address: "456 Oak St",
        suburb: "Sunnyvale",
        city: "Pretoria",
        postal_code: "0182",
      },
      sent_to: ["john.doe@example.com", "jane.smith@example.com"],
      created_by: ObjectId("64ed7f2dcbf1c2a9e9f15c01"), // Linked to John Doe
    },
    {
      _id: ObjectId("64ed7f2dcbf1c2a9e9f15c05"),
      total_bedroom: "2",
      move_date: new Date("2024-09-20"),
      is_qualified: false,
      is_deleted: false,
      category: "commercial",
      contact_info: {
        name: "Laura",
        surname: "Green",
        title: "Ms.",
        email: "laura.green@example.com",
        whatsapp_phone: "444-555-6666",
        phone: "444-555-6666",
      },
      moving_from: {
        address: "789 Pine St",
        suburb: "Riverside",
        city: "Cape Town",
        postal_code: "8000",
      },
      moving_to: {
        address: "101 Maple St",
        suburb: "Downtown",
        city: "Durban",
        postal_code: "4001",
      },
      sent_to: ["alice.johnson@example.com"],
      created_by: ObjectId("64ed7f2dcbf1c2a9e9f15c03"), // Linked to Alice Johnson
    },
  ];

  // Update or insert data
  users.forEach((user) => {
    db.user.updateOne({ _id: user._id }, { $set: user }, { upsert: true });
  });
  print("Upserted dummy data into ‘user’ collection");

  leads.forEach((lead) => {
    db.lead.updateOne({ _id: lead._id }, { $set: lead }, { upsert: true });
  });
  print("Upserted dummy data into ‘lead’ collection");
}

// Run the functions
createOrUpdateUserCollection();
createOrUpdateLeadCollection();
populateCollections();
