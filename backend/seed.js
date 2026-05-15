require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Student = require('./models/Student');
const Company = require('./models/Company');
const Drive = require('./models/Drive');
const Application = require('./models/Application');
const Notice = require('./models/Notice');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected for Seeding...');
    } catch (error) {
        console.error('Connection error:', error.message);
        process.exit(1);
    }
};

const firstNames = ['Rahul', 'Priya', 'Amit', 'Neha', 'Rohan', 'Sneha', 'Vikram', 'Pooja', 'Karan', 'Aditi', 'Suresh', 'Kavita', 'Gaurav', 'Anjali', 'Manish', 'Ritu', 'Rajesh', 'Swati', 'Deepak', 'Aarti'];
const lastNames = ['Sharma', 'Singh', 'Kumar', 'Patel', 'Gupta', 'Verma', 'Yadav', 'Joshi', 'Chauhan', 'Rajput', 'Das', 'Mishra', 'Pandey', 'Shukla', 'Reddy'];
const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];
const skillsList = ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'Java', 'C++', 'SQL', 'AWS', 'Docker', 'Machine Learning', 'Data Structures'];
const companiesList = [
    { name: 'Amazon', ind: 'E-commerce', web: 'amazon.jobs', desc: 'Earth\'s most customer-centric company.' },
    { name: 'TCS', ind: 'IT Services', web: 'tcs.com', desc: 'Tata Consultancy Services is an IT services, consulting and business solutions organization.' },
    { name: 'Infosys', ind: 'IT Services', web: 'infosys.com', desc: 'A global leader in next-generation digital services and consulting.' },
    { name: 'Google', ind: 'Technology', web: 'careers.google.com', desc: 'Organizing the world\'s information and making it universally accessible and useful.' },
    { name: 'Microsoft', ind: 'Technology', web: 'careers.microsoft.com', desc: 'Empowering every person and every organization on the planet to achieve more.' }
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const seedDB = async () => {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany();
    await Student.deleteMany();
    await Company.deleteMany();
    await Drive.deleteMany();
    await Application.deleteMany();
    await Notice.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('password123', salt);

    console.log('Seeding TPO Admin...');
    await User.create({ email: 'tpo@uiet.edu', password: defaultPassword, role: 'admin' });

    console.log('Seeding Companies...');
    const createdCompanies = [];
    for (let c of companiesList) {
        const user = await User.create({ email: `${c.name.toLowerCase()}@hr.com`, password: defaultPassword, role: 'company' });
        const company = await Company.create({
            userId: user._id,
            companyName: c.name,
            industry: c.ind,
            website: `https://www.${c.web}`,
            description: c.desc,
            logoUrl: `https://logo.clearbit.com/${c.web}`
        });
        createdCompanies.push(company);
    }

    console.log('Seeding Drives...');
    const createdDrives = [];
    for (let company of createdCompanies) {
        const drive = await Drive.create({
            companyId: company._id,
            jobRole: 'Software Development Engineer',
            packageLPA: Math.floor(Math.random() * 30) + 5,
            eligibilityCriteria: 'B.Tech with 60% throughout',
            branchEligibility: ['CSE', 'ECE', 'IT'],
            cgpaCriteria: 7.0,
            jobDescription: `Looking for skilled SDEs to join ${company.companyName}.`,
            lastDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            interviewDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            numberOfOpenings: Math.floor(Math.random() * 20) + 1,
            requiredSkills: getRandomSubset(skillsList, 3),
            status: 'Active'
        });
        createdDrives.push(drive);
    }

    console.log('Seeding 50 Students...');
    const createdStudents = [];
    for (let i = 0; i < 50; i++) {
        const fName = getRandom(firstNames);
        const lName = getRandom(lastNames);
        const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@uiet.edu`;
        const user = await User.create({ email, password: defaultPassword, role: 'student' });
        
        const cgpa = (Math.random() * 4 + 6).toFixed(2); // 6.00 to 10.00
        const isPlaced = Math.random() > 0.6;
        
        const student = await Student.create({
            userId: user._id,
            fullName: `${fName} ${lName}`,
            rollNumber: `2023${Math.floor(1000 + Math.random() * 9000)}`,
            branch: getRandom(branches),
            year: 2024,
            cgpa: parseFloat(cgpa),
            skills: getRandomSubset(skillsList, Math.floor(Math.random() * 3) + 2),
            phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
            resumeStatus: Math.random() > 0.2 ? 'Uploaded' : 'Not Uploaded',
            placementStatus: isPlaced ? 'Placed' : 'Unplaced',
            backlogs: Math.random() > 0.8 ? 1 : 0
        });
        createdStudents.push(student);
    }

    console.log('Seeding Applications...');
    for (let student of createdStudents) {
        if (student.cgpa >= 7.0) {
            // Apply to 1-3 random drives
            const numApplications = Math.floor(Math.random() * 3) + 1;
            const appliedDrives = getRandomSubset(createdDrives, numApplications);
            
            for (let drive of appliedDrives) {
                const statuses = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Rejected'];
                let status = 'Applied';
                if (student.placementStatus === 'Placed') {
                    status = 'Selected';
                    student.selectedCompany = drive.companyId;
                    await student.save();
                } else {
                    status = getRandom(statuses);
                }

                await Application.create({
                    studentId: student._id,
                    driveId: drive._id,
                    status: status
                });
            }
        }
    }

    console.log('Seeding Notices...');
    const noticeCategories = ['Placement Drive', 'Exam Notice', 'Important Announcement'];
    for(let i=0; i<5; i++) {
        await Notice.create({
            title: `Important Notice ${i+1}`,
            content: `This is the detailed content for notice ${i+1}. Please read carefully.`,
            category: getRandom(noticeCategories),
            isPinned: i === 0
        });
    }

    console.log('Database Seeding Completed Successfully!');
    process.exit();
};

seedDB();
