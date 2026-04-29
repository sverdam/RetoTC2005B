declare module "clas-types" {
    
    export interface LandingPage {
        banneHeader: string;
        bannerText: string;
        mainText: string;
        visionText: string;
        missionText: string;
        communityText: string;
        aboutUsText: string;
        contactText: string;
    }
    
    export interface Category {
        id: number;
        name: string;
    }
    
    export enum MemberType {
        AFFILIATE = 'Afiliado',
        ASSOCIATE = 'Asociado',
        ADMIN = 'Admin',
    }

    export interface Certification {
        id: Number;
        name: string;
    }

    export interface Company {
        id: number;
        name: string;
        description: string;
        aboutUs: string;
        tier: number;
        logo: FileModule;
        catalog: FileModule;
        memberType: MemberType;
        website: string;
        slogan: string;
        employees: number;
        pieces: number;
        space: number;
        capacity: string;
        color: string;
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
        fileModuleId: number;
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
        DOCUMENT = 'document',
        PRODUCT = 'product'
    }

    export interface FileModule{
        id: number;
        file: File;
        type: FileType;
        position: number;
        companyId: number;
    }

    export interface FileModuleInput{
        companyId: number;
        type: string;
        position: number;
    }

    interface Filter{ 
        id: number; 
        name: string; 
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
        id: number | null;
        name: string;
        description: string;
        aboutUs: string;
        tier: number | null;
        logo: FileBundleInput | null;
        catalog: FileBundleInput | null;
        memberType: MemberType | null;
        website: string;
        slogan: string;
        employees: number | null;
        pieces: number | null;
        space: number | null;
        capacity: string;
        color: string;
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
        id: any;
        name: string;
        description: string;
    }
    
    export interface NewContactInput{
        id: any;
        type: ContactType | null; 
        contactInfo: string;
        position: string;
    }

    export interface NewCertificationInput{
        id: any;
        name:string;
    }
    
    export interface FileBundleInput{
        file: File, // <- Actual file
        type: 'logo' | 'document' | 'product' | 'image', 
        position: number,
        companyId: number
    }
}