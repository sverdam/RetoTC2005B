import { Sequelize } from "sequelize-typescript";
import { Company } from "../models/company";
import { User, UserRole } from "../models/user";
import { LandingPage } from "../models/landingPage";
import { MemberType } from "../models/company";
import { error } from "node:console";

const createLandingPage = async () => {
    await LandingPage.create({
        bannerHeader: "Impulsando el futuro automotriz de Sonora",
        bannerText: "Colaboración que impulsa la innovación, competitividad y el crecimiento sostenible del sector automotriz sonorense.",
        mainText: "Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora.",
        visionText: "Posicionar a Sonora como el principal clúster automotriz de México, destacado por su innovación, sostenibilidad y calidad.",
        missionText: "Ser el motor que fortalece la competitividad del sector, fomentando colaboración y desarrollo continuo.",
        communityText: "La fuerza de CLAS está en su gente: industria, academia y gobierno trabajando juntos para convertir el crecimiento individual en éxito compartido.",
        aboutUsText: "Detrás de CLAS hay un equipo comprometido que impulsa cada iniciativa con visión, experiencia y colaboración. Conoce a las personas que hacen posible el crecimiento de la industria automotriz en Sonora.",
        contactText: "¿Te interesa formar parte del Cluster Automotriz de Sonora? Acércate a nosotros para obtener más información."
    })
}

const createClasCompany = async () => {
    const clas = await Company.findOne({ where: {memberType: "Admin"} })
    if (clas !== null && clas !== undefined) return;
    
    // Create CLAS
    await Company.create({
        name: 'Cluster Automotriz Sonora',
        description: '',
        memberType: MemberType.ADMIN,
        tier: 3,

        website: 'https://clas.com.mx',
        slogan: '',
        employees: 0,
        pieces: 0,
        space: 0,
        capacity: ""
    })   
}

const createAdminUser = async () => {
    const oldAdmin = await User.findOne({ where: {role: "admin"} })
    if (oldAdmin !== null && oldAdmin !== undefined) return;
    const clas = await Company.findOne({ where: {memberType: "Admin"} })
    
    if (clas === null || clas === undefined){
        console.error("No company for admin");
        throw error;
    }
    
    await User.create({
        name: "Default Admin",
        email: `admin@clas.com.mx`,
        // Default password: 111
        password: "$2b$10$KkoksGjekfjuiGfKguXgm.wINA.vu9mH4AviIzzHO6o2ehPBhtjcG",
        role: UserRole.ADMIN,
        companyId: clas.id
    });


}

const setup = async () => {
    const landingPageCount = await LandingPage.count();

    if (landingPageCount === 0){
        createLandingPage();
    }

    await createClasCompany();
    await createAdminUser();
};

export default setup;