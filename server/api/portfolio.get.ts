import { db } from '../database';

export default defineEventHandler(async (event) => {
    const profileData = await db.query.profile.findFirst();
    const experiencesData = await db.query.experiences.findMany({
        orderBy: (experiences, { asc }) => [asc(experiences.order)]
    });
    const skillsData = await db.query.skills.findMany();
    const educationData = await db.query.education.findMany();
    const organizationsData = await db.query.organizations.findMany();
    const certificationsData = await db.query.certifications.findMany();

    return {
        profile: profileData,
        experiences: experiencesData,
        skills: skillsData,
        education: educationData,
        organizations: organizationsData,
        certifications: certificationsData
    };
});
