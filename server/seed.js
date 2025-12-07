const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/userModel');
const Course = require('./models/courseModel');
const Lesson = require('./models/lessonModel');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name');
        console.log('✅ MongoDB Connected...');
    } catch (err) {
        console.error('❌ DB Connection Error:', err.message);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        console.log('🗑️  Cleaning database...');
        await Lesson.deleteMany({});
        await Course.deleteMany({});
        await User.deleteMany({});

        const password = 'Password123!'; 

        console.log('👥 Creating Users...');

        const usersData = [
            {
                name: 'Super Admin',
                email: 'admin@school.com',
                password: password,
                role: 'admin',
                headline: 'System Administrator',
                isVerified: true
            },
            {
                name: 'Mr. Ayman',
                email: 'ayman@school.com',
                password: password,
                role: 'teacher',
                headline: 'Senior Full Stack Engineer',
                bio: 'Expert in MERN stack with 10 years of experience.',
                isVerified: true
            },
            {
                name: 'Mr. Chbobo',
                email: 'chbobo@school.com',
                password: password,
                role: 'teacher',
                headline: 'Data Scientist & Python Expert',
                bio: 'Passionate about AI and Machine Learning.',
                isVerified: true
            },
            // --- STUDENTS ---
            {
                name: 'Abigael',
                email: 'abigael@student.com',
                password: password,
                role: 'student',
                headline: 'Aspiring Developer',
                isVerified: true
            },
            {
                name: 'Method',
                email: 'method@student.com',
                password: password,
                role: 'student',
                headline: 'Computer Science Student',
                isVerified: true
            }
        ];

        // We use User.create() so the pre-save hook runs and hashes the password
        const users = await Promise.all(usersData.map(user => User.create(user)));
        
        // Extract Users for reference
        const mrAyman = users.find(u => u.name === 'Mr. Ayman');
        const mrChbobo = users.find(u => u.name === 'Mr. Chbobo');

        console.log(`✅ Created ${users.length} users.`);

        // 3. CREATE COURSES
        console.log('📚 Creating Courses...');

        const coursesData = [
            {
                title: 'The Ultimate MERN Stack Guide',
                description: 'Learn MongoDB, Express, React, and Node.js from scratch. This course covers everything from authentication to deployment.',
                price: 49.99,
                estimatedPrice: 199.99,
                isPublished: true,
                tags: ['MERN', 'JavaScript', 'Web Dev'],
                teacherId: mrAyman._id,
                benefits: ['Build Real Projects', 'Master Backend', 'React Hooks']
            },
            {
                title: 'Advanced Node.js Architecture',
                description: 'Deep dive into streams, buffers, and system design patterns in Node.js.',
                price: 0, // Free course
                isPublished: true,
                teacherId: mrAyman._id,
                benefits: ['Scalability', 'Performance']
            },
            {
                title: 'Python for Beginners',
                description: 'Start your journey into programming with Python. Easy to learn and powerful.',
                price: 29.99,
                estimatedPrice: 50.00,
                isPublished: true,
                teacherId: mrChbobo._id,
                benefits: ['Data Analysis', 'Automation', 'Scripting']
            }
        ];

        // Use create to trigger slug generation
        const courses = await Promise.all(coursesData.map(course => Course.create(course)));
        
        const mernCourse = courses.find(c => c.title.includes('MERN'));
        const pythonCourse = courses.find(c => c.title.includes('Python'));

        console.log(`✅ Created ${courses.length} courses.`);

        // 4. CREATE LESSONS
        // NOTE: We create these sequentially because they update the Course `lessonCount`
        // running them in parallel might cause race conditions on the counter.
        console.log('📝 Creating Lessons...');

        const lessonsData = [
            // Lessons for MERN Course (Mr. Ayman)
            {
                courseId: mernCourse._id,
                title: 'Introduction to MERN',
                content: 'Welcome to the course! Here is what we will learn...',
                section: 'Getting Started',
                order: 1,
                type: 'notes'
            },
            {
                courseId: mernCourse._id,
                title: 'Setting up MongoDB',
                content: 'Download MongoDB Compass and set up your local database.',
                section: 'Database Setup',
                order: 2,
                type: 'notes'
            },
            {
                courseId: mernCourse._id,
                title: 'React Components Quiz',
                content: 'Test your knowledge on Functional vs Class components.',
                section: 'React Basics',
                order: 3,
                type: 'quiz'
            },
            // Lessons for Python Course (Mr. Chbobo)
            {
                courseId: pythonCourse._id,
                title: 'Variables and Data Types',
                content: 'In Python, variables are dynamic...',
                section: 'Basics',
                order: 1,
                type: 'notes'
            },
            {
                courseId: pythonCourse._id,
                title: 'Loops and Conditions',
                content: 'Learn about If, Else, For, and While loops.',
                section: 'Control Flow',
                order: 2,
                type: 'notes'
            }
        ];

        for (const lesson of lessonsData) {
            await Lesson.create(lesson);
        }

        console.log(`✅ Created ${lessonsData.length} lessons.`);

        // 5. ENROLL STUDENTS (Optional but good for testing)
        // Let's enroll Abigael in MERN and Method in Python
        const abigael = users.find(u => u.name === 'Abigael');
        const method = users.find(u => u.name === 'Method');

        abigael.courses.push(mernCourse._id);
        await abigael.save();

        method.courses.push(pythonCourse._id);
        await method.save();

        console.log('🎓 Enrolled students in courses.');

        console.log('-----------------------------------');
        console.log('🌱 DATABASE SEEDING COMPLETED');
        console.log('-----------------------------------');
        process.exit();

    } catch (err) {
        console.error('❌ Seeding Failed:', err);
        process.exit(1);
    }
};

// Run the script
connectDB().then(() => {
    seedData();
});