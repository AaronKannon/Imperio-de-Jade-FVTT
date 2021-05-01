export default class IDJActorSheet extends ActorSheet {
    static get defaultOptions(){
        return mergeObject(super.defaultOptions, {
            template: "systems/fs2e/templates/sheets/namedCharacter-sheet.hbs",
            classes: ["fs2e", "sheet", "character"]
        });
    }
    

    getData(){
        const data = super.getData();
        data.config = CONFIG.idj;
        
    }
}