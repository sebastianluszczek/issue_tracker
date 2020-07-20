const app = require('./src/app');
const connectDb = require('./src/utils/connection')

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Service running on http://${HOST}:${PORT}`);
});

connectDb().then(() => {
    console.log("MongoDb connected");
});

