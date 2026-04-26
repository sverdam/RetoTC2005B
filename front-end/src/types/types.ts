export interface Category {
    id: number;
    name: string;
}

export const MemberType = {
    AFFILIATE: 'Affiliate',
    ASSOCIATE: 'Associate',
} as const;

export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export interface Company {
    id: number;
    name: string;
    description: string;
    tier: number;
    logo?: FileModule | null;
    memberType: MemberType;
    location?: Location;
}

export const ContactType = {
    EMAIL: 'email',
    PHONE: 'phone',
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];

export interface Contact {
    id: number;
    type: ContactType;
    contactInfo: string;
    companyId: number;
}

export const FileType = {
    LOGO: 'logo',
    IMAGE: 'image',
    DOCUMENT: 'document',
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];

export interface FileModule {
    id: number;
    companyId: number;
    position: number;
    type: FileType;
    storedName: string | null;
    originalName: string | null;
    path: string | null;
    mimeType: string | null;
    size: number | null;
}

export interface Filter {
    id: number;
    name: string;
    tier: number;
    categoryId: number;
}

export interface Location {
    id: number;
    address: string;
    link: string;
    companyId: number;
}

export interface TextModule {
    id: number;
    title: string;
    text: Text;
    tier: number;
    companyId: number;
}

export const UserRole = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    companyId: number;
}
