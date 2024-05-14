import {JSDOM} from "jsdom";



class Parser{
    constructor(html){
        this.html = html;
        this.dom = new JSDOM(html);
    }
    /**
     * 
     */
    getItems(){
        const results = this.dom.window.document.querySelectorAll(".p-3.border.rounded.mb-3.bg-white")
        return results;
    }
    getTitle(card){
        const title = card.querySelector("h3");
        console.log("title",title);
        const titleText = title.textContent.trim();
        return titleText;
    }

    getCompany(card){
        const companyName = card.querySelector(".text-primary.link-muted");
        const companyNameText = companyName.textContent.trim();
        return companyNameText;
    }
    getInfoSections(card){
        const infoSection = card.querySelector(".col-12.col-lg-3.text-gray-700.pt-2.text-right.hidden-md-down").innerHTML;
        const regex = /<.+?>/ig;
        const infoSections = infoSection.split(regex);
        const trimmedInfoSections = infoSections.map(section => section.trim());
        const filteredInfoSections = trimmedInfoSections.filter(section => section !== "");
        return filteredInfoSections;
    }
    getSalary(infoSections){
        const salarySection = infoSections.find(element => element.includes("€"));
        if(!salarySection){
            return "No especificado";
        }
        return salarySection;
    }
    getOffers(){
        const items = this.getItems();
        const result = Array.from(items).map(item=>{
            const title = this.getTitle(item);
            const company = this.getCompany(item);
            const infoSections = this.getInfoSections(item);
            const salary = this.getSalary(infoSections);
            return {
                title,
                company,
                salary
            }
        })
        return result;
    }
}

export default Parser;