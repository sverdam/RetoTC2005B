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
        contacts: Contact[];
        user: User[];
        textModules: TextModule[]; 
        fileModules: FileModule[];
        certifications: Certification[];
        filters: Filter[];
        products: Product[];
        services: Service[];
    }

    export interface Product {
        id: number;
        name: string;
        description: string;
    }

    export interface Service {
        id: number;
        name: string;
        description: string;
    }

    export enum ContactType {
        EMAIL = 'email',
        PHONE = 'phone',
    }

    export interface Contact {
        id: number; 
        type: ContactType; 
        contactInfo: string;
        position: string;
    }

    export enum FileType {
        LOGO = 'logo',
        IMAGE = 'image',
        DOCUMENT = 'document'
    }

    export interface FileModule{
        id: number;
        type: FileType;
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
        mapLink: string;
    }

    interface TextModule{ 
        id: number; 
        text: Text; 
    } 

    enum UserRole {
        ADMIN = 'admin',
        EDITORMASTER = 'CLAS editor',
        EDITORCOMPANY = 'company editor',
        USER = 'user'
    }

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

    interface LoginUser{
        email: string,
        password: string
    }
    
    interface UserProfile {
        id: string;
        email: string;
        companyId: number;
        role: string;
    }  
    
    export interface NewCompanyInput{
        name: string;
        description: string;
        tier: number | null;
        logo: FileModule | null;
        catalogo: FileModule | null;
        memberType: MemberType | null;
        location: Location | null;
        contacts: Contact[];
        user: User[];
        textModules: TextModule[]; 
        fileModules: FileModule[];
        certifications: Certification[];
        filters: Filter[];
        products: Product[];
        services: Service[];
    }
    
    export interface NewProductInput{
        name: string;
        description: string;
    }
    
    export interface NewContactInput{
        type: ContactType; 
        contactInfo: string;
        position: string;
    }
}