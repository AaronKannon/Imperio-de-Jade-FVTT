export default class IDJItemSheet extends ItemSheet {
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
			classes: ["idj", "sheet", "item"],
			width: 620,
			height: 480,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
		});
    }
    
    get template() {
        return `systems/imperiodejade/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.idj;

        if (data.item.type == "classe") {
			data.isGM = game.user.isGM;
		}

        return data;
    }
}