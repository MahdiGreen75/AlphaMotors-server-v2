const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;


//middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hey, I am still alive.How are you? what a beautiful day!")
})

// const uri = "mongodb+srv://AlphaMotorsDevTeam:<password>@cluster0.8oyrgrw.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8oyrgrw.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect(); //changed

        const brandLogosCollection = client.db("brandLogosDB").collection("brandLogos");
        const toyotaCollection = client.db("toyotaDB").collection("toyota");
        const fordCollection = client.db("fordDB").collection("ford");
        const bmwCollection = client.db("bmwDB").collection("bmw");
        const mercedesBenzCollection = client.db("mercedesBenzDB").collection("mercedes-benz");
        const teslaCollection = client.db("teslaDB").collection("tesla");
        const hondaCollection = client.db("hondaDB").collection("honda");
        const nissanCollection = client.db("nissanDB").collection("nissan");
        const jeepCollection = client.db("jeepDB").collection("jeep");
        //add to cart
        const cartCollection = client.db("cartDB").collection("cart");

        // Get API here for all the products under different brands.
        app.get('/Toyota', async (req, res) => {
            const cursor = toyotaCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/Ford', async (req, res) => {
            const cursor = fordCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/BMW', async (req, res) => {
            const cursor = bmwCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/mercedesBenz', async (req, res) => {
            const cursor = mercedesBenzCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/Tesla', async (req, res) => {
            const cursor = teslaCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/Honda', async (req, res) => {
            const cursor = hondaCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/Jeep', async (req, res) => {
            const cursor = jeepCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/Nissan', async (req, res) => {
            const cursor = nissanCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get Brand logos 
        app.get('/services', async (req, res) => {
            const cursor = brandLogosCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // CRUD functionallity API here.
        app.post('/carts', async (req, res) => {
            const user = req.body;
            // console.log(user);
            //send to server.
            const result = await cartCollection.insertOne(user);
            res.send(result);
        })

        app.get('/getCart', async (req, res) => {
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/addProduct", async (req, res) => {
            const user = req.body;
            console.log(user);
            // Add your logic for processing the request here
          
            // Send a response (you should include appropriate CORS headers here)
            res.json({ message: 'Request received successfully' });
          });
          

        app.patch('/updates/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const filter = { _id: new ObjectId(id) };
            // const options = { upsert: true };
            const updateDoc = {
                $set: {
                    "name": user.productName,
                    "image": user.productImg,
                    "brand_name": user.brandName,
                    "type": user.typeName,
                    "price": user.productPrice,
                    "rating": user.productRating
                }
            }
            // = await fordCollection.updateOne(filter, updateDoc);
            let result

            if (user.brandName === "Ford") {
                result = await fordCollection.updateOne(filter, updateDoc);
            } else if (user.brandName === "BMW") {
                result = await bmwCollection.updateOne(filter, updateDoc);
            }
            else if (user.brandName === "Mercedes-Benz") {
                result = await mercedesBenzCollection.updateOne(filter, updateDoc);
            }
            else if (user.brandName === "Nissan") {
                result = await nissanCollection.updateOne(filter, updateDoc);
            }
            else if (user.brandName === "Honda") {
                result = await hondaCollection.updateOne(filter, updateDoc);
            }
            else if (user.brandName === "Jeep") {
                result = await jeepCollection.updateOne(filter, updateDoc);
            }
            else if (user.brandName === "Tesla") {
                result = await teslaCollection.updateOne(filter, updateDoc);
            }
            else {
                result = await toyotaCollection.updateOne(filter, updateDoc);
            }

            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });//changed
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`AlphaMotors server is running on port, ${port}`)
})