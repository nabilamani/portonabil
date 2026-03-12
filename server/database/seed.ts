import { db } from './index';
import * as s from './schema';
import { sql } from 'drizzle-orm';

async function seed() {
    console.log('--- FINAL SEEDING: MUHAMMAD NABIL AMANI ---');

    try {
        // Clear existing data (optional but recommended for clean seed)
        console.log('Cleaning up existing data...');
        await db.delete(s.profile);
        await db.delete(s.experiences);
        await db.delete(s.skills);
        await db.delete(s.education);
        await db.delete(s.organizations);
        await db.delete(s.certifications);
        await db.delete(s.projects);

        // 1. Profile
        console.log('Seeding Profile...');
        await db.insert(s.profile).values({
            id: 1,
            name: "MUHAMMAD NABIL AMANI",
            role: "Web & Mobile Developer",
            email: "nabilamani2304@gmail.com",
            phone: "+62 857 2885 3831",
            address: "Palur Wetan, Mojolaban, Sukoharjo, Jawa Tengah",
            description: "Web & Mobile Developer dengan pengalaman di bidang Full-Stack Development dan UI/UX Design. Terbiasa mengembangkan aplikasi menggunakan PHP, JavaScript, TypeScript, dan Dart dengan library maupun framework seperti jQuery, React.js, Tailwind CSS, Bootstrap, Laravel, CodeIgniter, dan Flutter.",
            bio: "Menguasai pengembangan REST API menggunakan Laravel dan integrasinya dengan aplikasi mobile berbasis Flutter, serta mampu mengelola dan mengoptimasi basis data menggunakan MySQL dan layanan Firebase. Berpengalaman dalam membangun sistem informasi, aplikasi manajemen data, company profile, hingga aplikasi mobile terintegrasi, serta dapat mengembangkan arsitektur web monolith maupun microservices sesuai kebutuhan proyek.",
            github: "https://github.com/nabilamani",
            linkedin: "https://ungu.in/linkedin_nabilamani1"
        });

        // 2. Experiences
        console.log('Seeding Experiences...');
        await db.insert(s.experiences).values([
            {
                id: 1,
                company: "AirNav Indonesia",
                role: "IT Development (Internship)",
                period: "Oktober 2025 - Sekarang",
                description: "Developed and maintained Restful API for internal event management system at AirNav Indonesia. Implemented database indexing and query optimization to increase performance and reduce application load. Designed and exposed API endpoints to support integration with front-end and data consumption. Ensured API reliability through testing, debugging, and documentation.",
                order: 1
            },
            {
                id: 2,
                company: "Dinas Komunikasi dan Informatika Sukoharjo",
                role: "Web Programmer (Magang)",
                period: "September 2024 - Januari 2025",
                description: "Analyzed system requirements for KONI Sukoharjo database management system through interviews. Created business processes/flowcharts for workflow. Built the system using Laravel (Breeze & Spatie) and Bootstrap with +15 related tables in MySQL. Developed data visualization dashboards (Apexcharts) and event calendars. Built +20 features for database and public view.",
                order: 2
            },
            {
                id: 3,
                company: "Forum Asisten (Univ. Amikom Yogyakarta)",
                role: "Asisten Dosen (Pemrograman Web)",
                period: "Februari 2024 - Juli 2024",
                description: "Assisted lecturers in preparing lab materials (HTML, CSS, JS, Jquery). Guided students through practical procedures and troubleshooting. Graded assignments and provided constructive feedback.",
                order: 3
            }
        ]);

        // 3. Skills
        console.log('Seeding Skills...');
        const skillsList = [
            // Hard Skills
            { name: "PHP", category: "hard" },
            { name: "JavaScript", category: "hard" },
            { name: "Dart", category: "hard" },
            { name: "TypeScript", category: "hard" },
            { name: "Node.js", category: "hard" },
            { name: "jQuery", category: "hard" },
            { name: "React.js", category: "hard" },
            { name: "Bootstrap", category: "hard" },
            { name: "Tailwind CSS", category: "hard" },
            { name: "Laravel", category: "hard" },
            { name: "CodeIgniter", category: "hard" },
            { name: "Flutter", category: "hard" },
            { name: "MySQL", category: "hard" },
            { name: "Firebase", category: "hard" },
            { name: "Wireframing", category: "hard" },
            // Software Skills
            { name: "VS Code", category: "software" },
            { name: "phpMyAdmin", category: "software" },
            { name: "Postman", category: "software" },
            { name: "GitHub", category: "software" },
            { name: "Figma", category: "software" },
            { name: "Canva", category: "software" },
            { name: "MS Office", category: "software" },
            { name: "FlowiseAI", category: "software" }
        ];
        await db.insert(s.skills).values(skillsList);

        // 4. Education
        console.log('Seeding Education...');
        await db.insert(s.education).values([
            {
                id: 1,
                institution: "Universitas Amikom Yogyakarta",
                degree: "D3 Teknik Informatika",
                period: "2022 - 2025",
                gpa: "3.89 / 4.00"
            },
            {
                id: 2,
                institution: "SMA Science Plus Baitul Qur'an",
                degree: "Saintek",
                period: "2018 - 2021"
            }
        ]);

        // 5. Certifications & Non-formal Education
        console.log('Seeding Certifications...');
        await db.insert(s.certifications).values([
            { title: "Mobile UI/UX Competition", issuer: "IFest Atma Jaya", date: "April 2024" },
            { title: "Fundamental Web Programming", issuer: "Hacktiv8", date: "Mei 2024" },
            { title: "Basic JavaScript Programming", issuer: "Dicoding", date: "April 2024" },
            { title: "Building Back-End Applications", issuer: "Dicoding", date: "2024" },
            { title: "Building Front-End Web", issuer: "Dicoding", date: "2024" },
            { title: "Basic Web Programming", issuer: "Dicoding", date: "Februari 2023" },
            { title: "Online Store Visual Design with Figma", issuer: "Skill Academy", date: "Mei 2024" },
            { title: "ASEAN Data Science Explorers", issuer: "ASEAN Foundation", date: "2024" },
            { title: "Bootcamp Front-End Developer", issuer: "AMCC", date: "2022 - 2023" },
            { title: "Film Division Bootcamp", issuer: "KOMA", date: "Januari - Juli 2024" }
        ]);

        // 6. Organizations
        console.log('Seeding Organizations...');
        await db.insert(s.organizations).values([
            { id: 1, org: "IMADIKOM", role: "Departemen PSDM", period: "2024 - 2025" },
            { id: 2, org: "AMCC", role: "Sie Liaison Officer", period: "2023" },
            { id: 3, org: "Kapal Ekspedisi Yogyakarta", role: "Divisi Media", period: "2024" }
        ]);

        // 7. Projects
        console.log('Seeding Projects...');
        await db.insert(s.projects).values([
            {
                id: 1,
                title: "Electronic Medical Records – Clinic F21 Minomartani",
                description: "This web-based Electronic Medical Record System was developed for the F21 Minomartani Pharmacy Clinic with the goal of assisting doctors in managing patient data digitally. This system simplifies health counseling documentation, data retrieval, and supports the efficiency and accuracy of medical services.",
                stats: JSON.stringify([
                    { label: "Total Database", value: "6", icon: "database" },
                    { label: "Total Fitur", value: "9", icon: "layers" }
                ]),
                techs: "PHP, LARAVEL, TAILWIND CSS, LIVEWIRE, FLUX, MYSQL",
                demoUrl: "https://demo.example.com",
                githubUrl: "https://github.com/nabilamani",
                credentials: "Login Admin: Email: nabil@moon.id • Password: 123123123",
                features: JSON.stringify([
                    "Progressive Web App (PWA) support for installable & offline access",
                    "Input and management of patient data",
                    "Medical examination and treatment history (medical records)",
                    "Auto chat for patient confirmation of accept/reject appointments"
                ]),
                imageUrl: "",
                order: 6
            },
            {
                id: 2,
                title: "Website & Mobile App RS UMS",
                description: "The RS UMS Website and Mobile App is a comprehensive digital health management system designed to streamline hospital operations. This platform enables online doctor scheduling, patient registration, and electronic medical record management. Built with Laravel/Livewire and Flutter, ensuring seamless access across devices with Firebase and MySQL synchronization.",
                stats: JSON.stringify([
                    { label: "Total Database Tables", value: "15", icon: "database" },
                    { label: "Main Features", value: "12", icon: "layers" }
                ]),
                techs: "LARAVEL, LIVEWIRE, PHP, MYSQL, FLUTTER, DART, FIREBASE",
                demoUrl: "https://ums.ac.id",
                githubUrl: "https://github.com/nabilamani",
                features: JSON.stringify([
                    "Doctor Schedule Management",
                    "Article & Health Blog Management",
                    "Service & Department Management",
                    "Room Availability Monitoring",
                    "Mobile App Integration API (Flutter)",
                    "Online Recruitment System",
                    "Patient Medical Record Management"
                ]),
                imageUrl: "",
                order: 5
            },
            {
                id: 3,
                title: "Task Management System",
                description: "Collaborative project and task management application helping teams record tasks, manage schedules, and visualize progress. Features role-based access control, deadline management, and automated report generation to improve team productivity.",
                stats: JSON.stringify([
                    { label: "Total Database", value: "2", icon: "database" },
                    { label: "Total Fitur", value: "5", icon: "layers" }
                ]),
                techs: "REACT, NODE.JS, EXPRESS, MONGODB",
                demoUrl: "https://demo.example.com",
                githubUrl: "https://github.com/nabilamani",
                features: JSON.stringify([
                    "Input and management of task and project data",
                    "Graphical visualization of performance and completion stats",
                    "Team schedule and project member deadline management",
                    "To-Do List for each project to keep progress organized",
                    "Excel report generation using ExcelJs",
                    "Role-based access control (admin & member)"
                ]),
                imageUrl: "",
                order: 4
            },
            {
                id: 4,
                title: "KONI Sukoharjo Database Management System",
                description: "Internal and external data management for KONI Sukoharjo. Administrators can manage athletes, coaches, referees, and achievements. Provides data visualization and structured report recording for administrative efficiency.",
                stats: JSON.stringify([
                    { label: "Total Database", value: "15+", icon: "database" },
                    { label: "Total Fitur", value: "20+", icon: "layers" }
                ]),
                techs: "LARAVEL, PHP, MYSQL, BREEZE, JQUERY",
                demoUrl: "https://demo.example.com",
                githubUrl: "https://github.com/nabilamani",
                features: JSON.stringify([
                    "Management of athlete, coach, and referee data per sport",
                    "Sports venue data management",
                    "Achievement recap for athletes from each sport",
                    "Role-based access for sport organization admins",
                    "KONI activity news and publications management",
                    "Photo gallery for event documentation",
                    "Export reports in PDF format"
                ]),
                imageUrl: "",
                order: 3
            },
            {
                id: 5,
                title: "E-Commerce F21-Minomartani",
                description: "Online marketing system for Apotek F21-Minomartani. Supports efficient stock management, customer orders, and transactions. Integrated with Midtrans for secure payments and features an educational health blog.",
                stats: JSON.stringify([
                    { label: "Total Database", value: "5+", icon: "database" },
                    { label: "Total Fitur", value: "5+", icon: "layers" }
                ]),
                techs: "WORDPRESS, ELEMENTOR, WOOCOMMERCE, PLUGIN, MIDTRANS",
                demoUrl: "https://demo.example.com",
                features: JSON.stringify([
                    "Product and medicine stock management",
                    "Shopping cart and checkout features",
                    "Transaction history and sales reports",
                    "Integrated payment method using Midtrans",
                    "Health articles blog and product promotions",
                    "Contact form and simple consultations"
                ]),
                imageUrl: "",
                order: 2
            },
            {
                id: 6,
                title: "Semester Learning Plan Management",
                description: "Platform for lecturers to draft, update, view, and print RPS (Rencana Pembelajaran Semester) documents. Features a simple dashboard for monitoring learning activities, making the process faster and more structured.",
                stats: JSON.stringify([
                    { label: "Total Database", value: "7", icon: "database" },
                    { label: "Total Fitur", value: "5", icon: "layers" }
                ]),
                techs: "CODEIGNITER, PHP, MYSQL",
                demoUrl: "https://demo.example.com",
                githubUrl: "https://github.com/nabilamani",
                features: JSON.stringify([
                    "Create RPS",
                    "Update RPS",
                    "View RPS",
                    "Print RPS",
                    "Simple Dashboard"
                ]),
                imageUrl: "",
                order: 1
            }
        ]);

        console.log('--- SEED COMPLETED SUCCESSFULLY ---');
    } catch (err) {
        console.error('SEEDING ERROR:', err);
    }
}

seed();
