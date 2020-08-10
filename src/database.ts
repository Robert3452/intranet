import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

const dbOptions: ConnectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true

}

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connection stablished");
})

connection.on("error", err => {
    console.log(err);
    process.exit(0);
})
