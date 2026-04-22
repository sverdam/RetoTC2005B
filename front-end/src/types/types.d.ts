declare module "clas-types" {
    export interface Category {
        id: number;
        name: string;
    }
    
    export enum MemberType {
        AFFILIATE = 'Afiliado',
        ASSOCIATE = 'Asociado',
        ADMIN = 'Admin',
    }

    interface Certification {
        name: string;
    }

    export interface Company {
        id: number;
        name: string;
        description: string;
        tier: number;
        logo: FileModule;
        catalogo: FileModule;
        memberType: MemberType;
        location: Location;
        contact: Contact[];
        user: User[];
        textModules: TextModule[]; 
        fileModules: FileModule[];
        certifications: Certification[];
    }

    export enum ContactType {
        EMAIL = 'email',
        PHONE = 'phone',
    }

    export interface Contact {
        id: number; 
        type: ContactType; 
        position: String;
        contactInfo: string;
        companyId: number; 
    }

    export enum FileType {
        LOGO = 'logo',
        IMAGE = 'image',
        DOCUMENT = 'document'
    }

    export interface FileModule{
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

    interface Filter{ 
        id: number; 
        name: string; 
        tier: number;
        category: Category;
    } 
    
    interface Location{ 
        id: number; 
        address: string;
        link: string;
        companyId: number;
    }

    interface TextModule{ 
        id: number; 
        text: Text; 
        tier: number;
        companyId: number;
    } 

    export const UserRole = {
        ADMIN: 'admin',
        USER: 'user',
    } as const;
    export type UserRole = typeof Color[keyof typeof UserRole]

    export interface User{ 
        id: number; 
        name: string; 
        email: string; 
        password: string; 
        role: UserRole;
        companyId: number;
        company?: CompanyLite
    } 

    export interface NewUserInput{
        name: string; 
        email: string; 
        password: string; 
        role: UserRole;
        companyId: number;
    }

    interface CompanyLite{
        id: number,
        name: string
    }
}