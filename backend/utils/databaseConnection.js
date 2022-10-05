import { connect } from 'mongoose';

const url = "mongodb+srv://Naeem:MongoDB123@cluster0.ksn0zz5.mongodb.net/DemoProjectDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url);

const connectDB = async () => {
    try {
        console.log('try block')
        await connect(url);
        console.log("Connected correctly to server");

    } catch (err) {
        console.log('catch block')
        console.log(err.stack);
    }
}

connectDB().catch(console.dir);
export default connectDB;