import { db } from '../database';
import { profile, experiences, skills, education, organizations, certifications, projects } from '../database/schema';
import { desc, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        console.log('--- API: Fetching Portfolio Data ---');
        
        // Menggunakan query builder yang lebih standar untuk Drizzle + LibSQL
        // Menggunakan Promise.all untuk mengambil semua data secara paralel
        const [profileResult, experiencesData, skillsData, educationData, organizationsData, certificationsData, projectsData] = await Promise.all([
            db.select().from(profile).limit(1),
            db.select().from(experiences).orderBy(desc(experiences.order)), // Assuming 'order' column for experiences
            db.select().from(skills).orderBy(skills.category),
            db.select().from(education),
            db.select().from(organizations),
            db.select().from(certifications),
            db.select().from(projects).orderBy(desc(projects.order)) // Assuming 'order' column for projects
        ]);

        const profileData = profileResult[0] || null;

        console.log('Profile found:', profileData?.name || 'NONE');

        return {
            profile: profileData || {
                name: "MUHAMMAD NABIL AMANI", // Default jika DB gagal tarik data
                role: "Developer",
                description: "",
                bio: ""
            },
            experiences: experiencesData || [],
            skills: skillsData || [],
            education: educationData || [],
            organizations: organizationsData || [],
            certifications: certificationsData || [],
            projects: projectsData || [] // Added projects
        };
    } catch (error) {
        console.error('CRITICAL API ERROR:', error);
        // Fallback data agar tidak crash total
        return {
            profile: { name: "Error Loading Data", role: "Please check DB", description: "", bio: "" },
            experiences: [],
            skills: [],
            education: [],
            organizations: [],
            certifications: []
        };
    }
});
