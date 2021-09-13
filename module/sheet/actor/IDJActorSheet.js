export default class IDJActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["idj", "sheet", "actor", "character"],
            width: 900,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
        });
    }

    /* @override */
    get template() {
        let layout = game.settings.get("idj", "sheetTemplate");
        if (!game.user.isGM && this.actor.limited) {
            console.log("IDJ | Iniciando template actor-sheet-limited.hbs");
            return "systems/imperiodejade/templates/sheets/actor/actor-sheet-limited.hbs";
        } else if (layout == 'base') {
            console.log("IDJ | Iniciando template actor-sheet-base.hbs");
            return "systems/imperiodejade/templates/sheets/actor/actor-sheet-base.hbs";
        } else if (layout == 'tabbed') {
            console.log("IDJ | Iniciando template actor-sheet-tabbed.hbs");
            return "systems/imperiodejade/templates/sheets/actor/actor-sheet-tabbed.hbs";
        }
    }

    /* -------------------------------------------- */

    /** @override */
    getData() {
        const sheetData = super.getData();
        // Experience Tracking
        //sheetData["disableExperience"] = game.settings.get("idj", "disableExperience");
        //sheetData["disableJournal"] = game.settings.get("idj", "disableJournal");

        // TODO Understand this
        for (let [pc, per] of Object.entries(this.actor.data.data.atributos)) {
            if (per.bonus === undefined || per.penalidade === undefined) {
                let perB = "data.atributos." + pc + ".bonus";
                let perP = "data.atributos." + pc + ".penalidade";
                this.actor.update({
                    [perB]: 0,
                    [perP]: 0
                });
            }
        }

        // FLAGS
        //sheetData["isPreparationCaster"] = this.actor.data.flags.mago;
        //sheetData["mostrarBonusTreino"] = this.actor.data.flags.mostrarTreino;
        sheetData["layout"] = game.settings.get("idj", "sheetTemplate");

        this.actor.data.data.ca.pda = this.actor.data.data.ca.pda ?? 0;
        /* Template SKILLS */
        // TODO Migration function to enforce template data
        if (this.actor.data.data.pericias !== undefined) {
            for (let [pc, per] of Object.entries(this.actor.data.data.pericias)) {
                if (per.bonus === undefined || per.penalidade === undefined) {
                    let perB = "data.pericias." + pc + ".bonus";
                    let perP = "data.pericias." + pc + ".penalidade";
                    this.actor.update({
                        [perB]: 0,
                        [perP]: 0
                    });
                }
            }
        }

        return sheetData;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Item summaries
        // html.find('.item .item-name.rollable h4').click(event => this._onItemSummary(event));
        html.find('.item .item-name h4').click(event => this._onItemSummary(event));

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        if (this.actor.owner) {
            html.find('.item .item-image').click(event => this._onItemRoll(event));

            html.find('.item-fav').click(ev => {
                const li = $(ev.currentTarget).parents(".item");
                const item = this.actor.getOwnedItem(li.data("itemId"));
                item.update({ "flags.favorito": !item.data.flags.favorito });
            });

            // Update Inventory Item
            //html.find('.toggle-armor').click(this._onToggleArmor.bind(this));
            //html.find('.update-cd').click(this._onUpdateCD.bind(this));
            // Prepare spells
            //html.find('.preparation-toggle').click(this._onPrepareSpell.bind(this));

            // Drag events for macros.
            let handler = ev => this._onDragStart(ev);
            html.find('li.skill').each((i, li) => {
                // if (li.classList.contains("inventory-header")) return;
                // if (li.id === "atributo") return;
                if (!li.hasAttribute("data-item-id")) return;
                if (!li.hasAttribute("data-type")) return;
                li.setAttribute("draggable", true);
                li.addEventListener("dragstart", handler, false);
            });
        }

    }
}