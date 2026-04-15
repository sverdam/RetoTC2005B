declare module "clas-types" {
    export interface Category {
        id: number;
        name: string;
    }
    
    export enum MemberType {
        AFFILIATE = 'Afiliado',
        ASSOCIATE = 'Asociado',
    }

    export interface Company {
        id: number;
        name: string;
        description: string;
        tier: number;
        logo: Blob;
        memberType: MemberType;
        location: Location;
    }

    export enum ContactType {
        EMAIL = 'email',
        PHONE = 'phone',
    }

    export interface Contact {
        id: number; 
        type: ContactType; 
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
        categoryId: number;
    } 
    
    interface Location{ 
        id: number; 
        address: string;
        link: string;
        companyId: number;
    }

    interface TextModule{ 
        id: number; 
        title: string; 
        text: Text; 
        tier: number;
        companyId: number;
    } 

    enum UserRole {
        ADMIN = 'admin',
        USER = 'user',
    }

    interface User{ 
        id: number; 
        name: string; 
        email: string; 
        password: string; 
        role: UserRole;
        companyId: number;
    } 
}