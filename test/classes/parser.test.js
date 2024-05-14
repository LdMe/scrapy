import Parser from "../../src/classes/parser.js"
import fs from "fs";

describe("tests para comprobar el parser",()=>{
    let parser = null;
    beforeAll(()=>{
        const html = fs.readFileSync("test/html/tecnoempleo.html");
        parser = new Parser(html);
    })
    test("Conseguir tarjetas de las ofertas",()=>{
        const items = parser.getItems();
        expect(items.length).toBe(30);
        expect(items[0].textContent).toContain("Junior Software Engineer");
        expect(items[1].textContent).toContain("Junior Java Developer");
    })

    test("Conseguir el título de una oferta",()=>{
        const items= parser.getItems();
        const title = parser.getTitle(items[0]);
        expect(title).toBe("Junior Software Engineer");
        const title1 = parser.getTitle(items[1]);
        expect(title1).toBe("Junior Java Developer");
    })
    test("Conseguir la empresa de la oferta",()=>{
        const items= parser.getItems();
        const companyName = parser.getCompany(items[0]);
        expect(companyName).toBe("SENSOFAR TECH")
        const companyName1 = parser.getCompany(items[1]);
        expect(companyName1).toBe("Michael Page")
         
    })
    test("Conseguir la seccion de info de la oferta",()=>{
        const items = parser.getItems();
        const infoSections = parser.getInfoSections(items[0]);
        expect(infoSections.length).toBe(4);
    })
    test("Conseguir el salario de la oferta",()=>{
        const items = parser.getItems();
        const infoSections = parser.getInfoSections(items[0]);
        const salary = parser.getSalary(infoSections);
        expect(salary).toBe("No especificado");
        const infoSections1 = parser.getInfoSections(items[1]);
        const salary1 = parser.getSalary(infoSections1);
        expect(salary1).toBe("24.000€ - 30.000€ b/a");
    })
    test("Conseguir el array de datos de las ofertas",()=>{
        const results = parser.getOffers();
        expect(results[0].title).toBe("Junior Software Engineer")
        expect(results.length).toBe(30)
    })
});