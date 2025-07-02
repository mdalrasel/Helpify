require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://helpify1.netlify.app',
        'https://helpify-d8cda.firebaseapp.com',
        'https://helpify-d8cda.web.app',
    ],
    credentials: true,
}));
app.use(express.json());


const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const uri = process.env.DB_MONGODB_URI;

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
        await client.connect();
        const serviceCollection = client.db("serviceManegmentDB").collection("service");
        const bookingsCollection = client.db("serviceManegmentDB").collection("bookings");

        const verifyFirebaseToken = async (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) { 
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send({ message: 'unauthorized access' });
            }

            try {
                const decoded = await admin.auth().verifyIdToken(token);
                req.decoded = decoded;
                req.tokenEmail = decoded.email; 
                next();
            } catch (error) {
                console.error('Token verification failed:', error); 
                return res.status(403).send({ message: 'forbidden access' });
            }
        };


        //Add Service (Requires authentication)
        app.post('/services', verifyFirebaseToken, async (req, res) => {
            const service = req.body;
            if (req.tokenEmail !== service.providerEmail) {
                return res.status(403).send({ message: 'Forbidden: Email mismatch for service creation' });
            }
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });

        // Get all services
        app.get('/services', async (req, res) => {
            const services = await serviceCollection.find().toArray();
            res.send(services);
        });

        // Get categories
        app.get('/categories', async (req, res) => {
            const services = await serviceCollection.find().toArray(); 
            const categories = [...new Set(services.map(service => service.category))];
            res.send(categories);
        });

        // Get service details by ID
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // Book a Service (Requires authentication)
        app.post('/bookings', verifyFirebaseToken, async (req, res) => {
            const booking = req.body;
            if (req.tokenEmail !== booking.userEmail) {
                return res.status(403).send({ message: 'Forbidden: Email mismatch for booking' });
            }
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/my-services', verifyFirebaseToken, async (req, res) => {
            const providerEmail = req.query.email;

            if (req.tokenEmail !== providerEmail) {
                return res.status(403).send({ message: 'Forbidden: Email mismatch' });
            }
            const query = { providerEmail: providerEmail };
            const myServices = await serviceCollection.find(query).toArray();
            res.send(myServices);
        });

        //  Update a Service
        app.put('/update/:id', verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
            const updatedServiceData = req.body;
            const existingService = await serviceCollection.findOne({ _id: new ObjectId(id) });
            if (!existingService) {
                return res.status(404).send({ message: 'Service not found' });
            }
            if (req.tokenEmail !== existingService.providerEmail) {
                return res.status(403).send({ message: 'Forbidden: You are not authorized to update this service' });
            }
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: updatedServiceData,
            };
            const result = await serviceCollection.updateOne(query, updateDoc);
            res.send(result);
        });

        // Delete a Service
        app.delete('/delete/:id', verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
            const existingService = await serviceCollection.findOne({ _id: new ObjectId(id) });
            if (!existingService) {
                return res.status(404).send({ message: 'Service not found' });
            }
            if (req.tokenEmail !== existingService.providerEmail) {
                return res.status(403).send({ message: 'Forbidden: You are not authorized to delete this service' });
            }

            const query = { _id: new ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/my-booked-services', verifyFirebaseToken, async (req, res) => {
            const userEmail = req.query.email;
            if (req.tokenEmail !== userEmail) {
                return res.status(403).send({ message: 'Forbidden: Email mismatch' });
            }
            const query = { userEmail: userEmail };
            const myBookedServices = await bookingsCollection.find(query).toArray();
            res.send(myBookedServices);
        });

        app.get('/my-provider-bookings', verifyFirebaseToken, async (req, res) => {
            const providerEmail = req.query.email;
            if (req.tokenEmail !== providerEmail) {
                return res.status(403).send({ message: 'Forbidden: Email mismatch' });
            }
            const query = { providerEmail: providerEmail };
            const receivedBookings = await bookingsCollection.find(query).toArray();
            res.send(receivedBookings);
        });

        // Update the status of a specific booking
        app.patch('/bookings/:id/status', verifyFirebaseToken, async (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ID format' });
            }
            const { status } = req.body;
            const existingBooking = await bookingsCollection.findOne({ _id: new ObjectId(id) });
            if (!existingBooking) {
                return res.status(404).send({ message: 'Booking not found' });
            }
            if (req.tokenEmail !== existingBooking.providerEmail) {
                return res.status(403).send({ message: 'Forbidden: You are not authorized to update this booking status' });
            }
            const query = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: { serviceStatus: status },
            };
            const result = await bookingsCollection.updateOne(query, updateDoc);
            res.send({ message: 'Booking status updated successfully!', result });
        });


    } finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Helpify Server Running!')
});

app.listen(port, () => {
    console.log(`Helpify Server listening on port ${port}`);
});
