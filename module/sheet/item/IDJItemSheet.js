import TraitSelector from "../../apps/trait-selector.js";

export default class IDJItemSheet extends ItemSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["idj", "sheet", "item"],
            width: 620,
            height: 480,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    //get template() {
    //    return `systems/imperiodejade/templates/sheets/${this.item.data.type}-sheet.hbs`;
    //}

    get template() {
        const path = "systems/imperiodejade/templates/sheets/item";
        if (this.item.data.type == "consumivel" || this.item.data.type == "tesouro") {
            return `${path}/item-sheet.hbs`;
        } else if (this.item.data.type == "armadura") {
            return `${path}/equip-sheet.hbs`;
        }
        return `${path}/${this.item.data.type}-sheet.hbs`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.idj;

        if (data.item.type == "classe") {
            data.isGM = game.user.isGM;
        }

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
        // Tooltips TODO DEBUG
        html.mousemove(ev => this._moveTooltips(ev));
        // Roll handlers, click handlers, etc. would go here.

        //html.find('.selArma').change(this._getDataArma.bind(this));
        if (this.isEditable) {
            html.find('.trait-selector.class-skills').click(this._onConfigureClassSkills.bind(this));

            //html.find(".effect-control").click(ev => {
            //	if ( this.item.isOwned ) return ui.notifications.warn("Alteração de Efeitos em itens possuidos por Personagens não é suportada atualmente.")
            //	onManageActiveEffect(ev, this.item)
            //});
        }

        // Controle de Aprimoramentos
        //html.find('.aprimoramento-create').click(this._onAprimoramentoCreate.bind(this));
        //html.find('.aprimoramento-delete').click(this._onAprimoramentoDelete.bind(this));
        //html.find('.aprimoramento-edit').click(this._onAprimoramentoEdit.bind(this));
        //html.find('.aprimoramento-toggle').click(this._onAprimoramentoToggle.bind(this));
        //html.find('.convert').click(this._onAprimoramentoToEffect.bind(this));
    }

    _onConfigureClassSkills(event) {
        event.preventDefault();
        const skills = this.item.data.data.pericias;
        const choices = skills.escolhas;
        const a = event.currentTarget;
        const label = a.parentElement;

        // Render the Trait Selector dialog
        new TraitSelector(this.item, {
            name: a.dataset.target,
            title: label.innerText,
            choices: Object.entries(CONFIG.idj.pericias).reduce((obj, e) => {
                if (choices[e[0]]) obj[e[0]] = e[1];
                return obj;
            }, {}),
            minimum: skills.numero,
            maximum: skills.numero
        }).render(true)
    }

    _moveTooltips(event) {
        $(event.currentTarget).find(".tooltip:hover .tooltipcontent").css("left", `${event.clientX}px`).css("top", `${event.clientY + 24}px`);
    }
}