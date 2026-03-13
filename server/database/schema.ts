import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const profile = sqliteTable('profile', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    description: text('description').notNull(),
    bio: text('bio').notNull(),
    email: text('email'),
    phone: text('phone'),
    address: text('address'),
    github: text('github'),
    linkedin: text('linkedin'),
    photoUrl: text('photo_url'),
});

export const experiences = sqliteTable('experiences', {
    id: integer('id').primaryKey(),
    company: text('company').notNull(),
    role: text('role').notNull(),
    period: text('period').notNull(),
    description: text('description').notNull(),
    order: integer('order').default(0),
});

export const skills = sqliteTable('skills', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    category: text('category').notNull(), // 'hard' or 'software'
    order: integer('order').default(0),
});

export const education = sqliteTable('education', {
    id: integer('id').primaryKey(),
    institution: text('institution').notNull(),
    degree: text('degree').notNull(),
    period: text('period').notNull(),
    gpa: text('gpa'),
});

export const certifications = sqliteTable('certifications', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    issuer: text('issuer').notNull(),
    date: text('date').notNull(),
});

export const organizations = sqliteTable('organizations', {
    id: integer('id').primaryKey(),
    org: text('org').notNull(),
    role: text('role').notNull(),
    period: text('period').notNull(),
});

export const projects = sqliteTable('projects', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    stats: text('stats'), 
    techs: text('techs'),
    demoUrl: text('demo_url'),
    githubUrl: text('github_url'),
    credentials: text('credentials'),
    features: text('features'), 
    imageUrl: text('image_url'), 
    order: integer('order').default(0),
});

export const chatSessions = sqliteTable('chat_sessions', {
    id: text('id').primaryKey(), // UUID
    visitorName: text('visitor_name').notNull(),
    createdAt: integer('created_at').notNull(), // Unix timestamp
    isOpen: integer('is_open', { mode: 'boolean' }).default(true),
});

export const chatMessages = sqliteTable('chat_messages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sessionId: text('session_id').notNull().references(() => chatSessions.id),
    content: text('content').notNull(),
    senderType: text('sender_type').notNull(), // 'visitor' | 'admin'
    createdAt: integer('created_at').notNull(), // Unix timestamp
});
