import mongoose from 'mongoose';
import User from './model/userSchema.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
        await initializeAdminUser();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(0);
    }
};

const initializeAdminUser = async () => {
    try {
        const adminExists = await User.exists({ role: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(process.env.PASSWORD, salt);
            const adminUser = new User({
                name: 'admin',
                email: 'adminEcommerceMongo@mysite.com',
                phone: 'NO need',
                password: hashedPass,
                role: 'admin',
            });

            await adminUser.save();
            console.log('Admin user created successfully');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
        // Consider throwing the error to ensure it's not silently ignored
        throw error;
    }
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

export default connectToDB;
