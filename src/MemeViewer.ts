import IMeme from "./IMeme";

const fetch = require('node-fetch');
// Documentation: https://github.com/bitinn/node-fetch

const parse5 = require('parse5');
// Documentation: https://github.com/inikulin/parse5


export default class MemeViewer {
    constructor() {};

    /**
     * Helper method to download the HTML from a given URL use the fetch libraru
     *
     * NOTE: In c2 we will be using the "http" package directly, fetch is a newer HTTP library
     * that is not installed in your repo.
     *
     * @param link
     * @private
     */
    private downloadHTML(link: string): Promise<string>{
        return fetch(link).then(res => res.text());
    }

    private parseHTML(html: string) : Promise<any>{
        return Promise.resolve(parse5.parse(html));
    }

    private findYear(element: any) : number{
        if(element.nodeName === "a" && element.attrs[0].value.startsWith("/search?query=year")){
            return Number(element.childNodes[0].value);
        }

        if(element.childNodes && element.childNodes.length > 0){
            for(let child of element.childNodes) {
                let possibleYear = this.findYear(child);
                if (possibleYear != -1) {
                    return possibleYear;
                }
            }
        }
        return -1;
    }

    private findImage(element: any) : string{
        if(element.nodeName === "a" && element.attrs.length > 1 && element.attrs[1].value === "full-image"){
            return element.attrs[0].value;
        }

        if(element.childNodes && element.childNodes.length > 0){
            for(let child of element.childNodes) {
                let possibleYear = this.findImage(child);
                if (possibleYear != "") {
                    return possibleYear;
                }
            }
        }
        return "";
    }

    public fetchMemeData(link: string): Promise<IMeme> {
        return this.downloadHTML(link).then(this.parseHTML).then((parsedData) => {
            console.log(parsedData);
            let year = this.findYear(parsedData);
            let image = this.findImage(parsedData);
            return {
                year: year,
                image: image
            };
        });
    }


}
