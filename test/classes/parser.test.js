import Parser from "../../src/classes/parser";
import fs from "fs";

/*
const jobOfferSchema = new mongoose.Schema({
    title: String,
    company: String,
    province: String,
    jobType: String,
    publishingDate:Date,
    description:String,
    contractType:String,
    workHours: String,
    salaryRange: String,
});

*/

describe("Tests de parser de tecnoempleo", () => {
    let parser;
    beforeAll(() => {
        const html = fs.readFileSync("test/html/tecnoempleo.html", "utf-8");
        parser = new Parser(html);
    });

    test("Se consigue la sección del html que contiene todos los anuncios", () => {
        const result = parser.getItems();
        expect(result).not.toBeNull();
        expect(result.length).toBe(14);

    });

    test("Se consigue el título de un anuncio", () => {
        const item = parser.getItems()[0];
        const result = parser.getTitle(item);
        expect(result).toBe("Senior Frontend Developer NuxtJS/VueJS");
    });

    test("Se consigue el nombre de la empresa", () => {
        const item = parser.getItems()[0];
        const result = parser.getCompany(item);
        expect(result).toBe("Michael Page");
    });

    test("Se busca la info de la oferta", () => {
        const item = parser.getItems()[0];
        const result = parser.getJobInfo(item);
        expect(result).toHaveLength(4);

    });

    test("Se busca la fecha de la oferta", () => {
        const item = parser.getItems()[0];
        const data = parser.getJobInfo(item);
        const result = parser.getPublishedDate(data);
        expect(result).toBe("13/05/2024")
    })
    test("Se busca el salario de la oferta", () => {
        const item = parser.getItems()[0];
        const data = parser.getJobInfo(item);
        const result = parser.getSalary(data);
        expect(result).toBe("48.000€ - 60.000€ b/a")
    })

    test("Se busca la provincia de la oferta", () => {
        const item = parser.getItems()[0];
        const data = parser.getJobInfo(item);
        const result = parser.getProvince(data);
        expect(result).toBe("No especificada");

        const item1 = parser.getItems()[1];
        const data1 = parser.getJobInfo(item1);
        const result1 = parser.getProvince(data1);
        expect(result1).toBe("Pontevedra");
    })
    test("Se busca el tipo de trabajo: remoto, híbrido, presencial...", () => {
        const item = parser.getItems()[0];
        const data = parser.getJobInfo(item);
        const result = parser.getJobType(data);
        expect(result).toBe("100% remoto");
        const item1 = parser.getItems()[1];
        const data1 = parser.getJobInfo(item1);
        const result1 = parser.getJobType(data1);
        expect(result1).toBe("Híbrido");
        const item7 = parser.getItems()[7];
        const data7 = parser.getJobInfo(item7);
        const result7 = parser.getJobType(data7);
        expect(result7).toBe("Presencial y otras");
    })

    test("Se busca la descripción de la oferta", () => {
        const item = parser.getItems()[0];
        const result = parser.getDescription(item);
        expect(result).toContain("Perfil buscado (Hombre/Mujer)");
    })
    
    test("Se busca el link de la oferta", () => {
        const item = parser.getItems()[0];
        const result = parser.getLink(item);
        expect(result).toContain("https://www.tecnoempleo.com/senior-frontend-developer-nuxtjs-vuejs-remoto/vuejs-nuxtjs/rf-a4651982f2018356cd4a");
    })

    test("Se buscan los tags de la oferta", () => {
        const item = parser.getItems()[0];
        const result = parser.getTags(item);
        expect(result).toHaveLength(3);
    })



});