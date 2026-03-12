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

        // 1. Profile
        console.log('Seeding Profile...');
        await db.insert(s.profile).values({
            id: 1,
            name: "MUHAMMAD NABIL AMANI",
            role: "Web & Mobile Developer",
            email: "nabilamani2304@gmail.com",
            phone: "+62 857 2885 3831",
            address: "Palur wetan 02/05 Palur, Mojolaban, Sukoharjo, Jawa Tengah",
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

        console.log('--- SEED COMPLETED SUCCESSFULLY ---');
    } catch (err) {
        console.error('SEEDING ERROR:', err);
    }
}

seed();
