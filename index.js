

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 8000;


require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json())




const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9msrz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const todocollection = client.db("todolist").collection("list");
  // perform actions on the collection object
    app.get("/todolist", async (req, res) => {
      const query = {};
      const cursor = todocollection.find(query);
      const tolist = await cursor.toArray();
      res.send(tolist);
    });

    // adding new todo list
      app.post("/todolist", async (req, res) => {
        const newtodolist = req.body;
        const result = await todocollection.insertOne(newtodolist);
        res.send(result);
      });

           app.get("/mytask", async (req, res) => {
      
            const email = req.query.email;
            const query = {email : email};
            const cursor = todocollection.find(query);
            const gettask = await cursor.toArray();
            res.send(gettask);

            // delteting the task

                app.delete("/deletetask/:id", async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) };
                  const result = todocollection.deleteOne(query);
                  res.send(result);
                });
})
});


app.get("/" , (req,res) => {
    res.send("server is running")
})



// async function run(){
//     try{
//            await client.connect();
//            const todocollection = client
//              .db("todolist")
//              .collection("list");
//            console.log("databse connected")

//     }
//     finally{

//     }
// }
// run().catch(console.dir);



app.listen(port , () => {
    console.log("server is connected");
})