export default class IDJItemSheet extends ItemSheet {
    
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
			classes: ["idj", "sheet", "item"],
			width: 620,
			height: 480
		});
    }
    
    get template() {
        return `systems/imperiodejade/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.idj;

        return data;
    }
}