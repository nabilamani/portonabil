import { db } from './index';
import { profile, experiences, skills, education, certifications, organizations } from './schema';

async function seed() {
    console.log('Seeding portfolio data...');

    // Profile
    await db.insert(profile).values({
        name: 'MUHAMMAD NABIL AMANI',
        role: 'Web Developer & UI/UX Designer',
        description: 'Web Developer dengan pengalaman di bidang Front-End Development, serta memiliki kemampuan dalam Back-End Development dan UI/UX Design.',
        bio: 'Terbiasa mengembangkan aplikasi menggunakan bahasa pemrograman PHP, JavaScript, dan TypeScript. Menguasai framework Tailwind CSS, Bootstrap, Laravel, dan CodeIgniter.',
        email: 'nabilamani2304@gmail.com',
        github: 'https://github.com/nabilamani',
        linkedin: 'https://ungu.in/linkedin_nabilamani1'
    });

    // Experiences
    await db.insert(experiences).values([
        {
            company: 'Dinas Komunikasi dan Informatika Sukoharjo',
            role: 'Web Programmer, Pegawai Magang',
            period: 'Sep 2024 - Jan 2025',
            description: 'Melakukan interview dengan pihak KONI Sukoharjo... Membangun proyek dengan merancang UI/UX serta mengimplementasikannya ke dalam kode menggunakan Laravel...',
            order: 1
        },
        {
            company: 'Forum Asisten - Universitas Amikom',
            role: 'Asisten Dosen (Matkul Pemrograman Web)',
            period: 'Feb 2024 - Juli 2024',
            description: 'Membantu dosen dalam mempersiapkan materi praktikum... Materi yang diajar: Flexbox, Bootstrap, jQuery, Javascript Dasar, HTML & CSS.',
            order: 2
        }
    ]);

    // Skills
    const hardSkills = ['PHP', 'JavaScript', 'TypeScript', 'Node.JS', 'jQuery', 'React.js', 'Laravel', 'CodeIgniter', 'Express.js', 'Next.js', 'Nuxt.js', 'Bootstrap', 'Tailwind CSS', 'MySQL', 'MongoDB', 'PostgreSQL', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Prompt Engineering'];
    await db.insert(skills).values(hardSkills.map(name => ({ name, category: 'hard' })));

    const softSkills = ['VS Code', 'Git/GitHub', 'Figma', 'Postman', 'phpMyAdmin', 'Canva', 'Office Suite', 'FlowiseAI'];
    await db.insert(skills).values(softSkills.map(name => ({ name, category: 'software' })));

    // Education
    await db.insert(education).values([
        { institution: 'Universitas Amikom Yogyakarta', degree: 'D3 Teknik Informatika', period: '2022 - 2025', gpa: '3.89 / 4.00' },
        { institution: "SMA Science Plus Baitul Qur'an", degree: 'MIPA / Saintek', period: '2018 - 2021' }
    ]);

    console.log('Seed completed!');
}

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
