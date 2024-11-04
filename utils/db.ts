import mongoose from 'mongoose'

export default async function db() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("✅ connected to mongodb")

    } catch (err) {
        console.log("❌ DB connection error", err);
    }
}