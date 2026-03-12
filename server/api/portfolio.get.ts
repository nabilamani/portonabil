import { db } from '../database';
import { profile, experiences, skills, education, organizations, certifications } from '../database/schema';
import { desc, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        console.log('--- API: Fetching Portfolio Data ---');
        
        // Menggunakan query builder yang lebih standar untuk Drizzle + LibSQL
        const profileResult = await db.select().from(profile).limit(1);
        const profileData = profileResult[0] || null;

        const experiencesData = await db.select().from(experiences).orderBy(asc(experiences.id));
        const skillsData = await db.select().from(skills);
        const educationData = await db.select().from(education);
        const organizationsData = await db.select().from(organizations);
        const certificationsData = await db.select().from(certifications);

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
            certifications: certificationsData || []
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
