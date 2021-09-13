export class IDJChatSettings extends FormApplication {
    constructor(object, options = {}) {
        super(object, options)
    }

    /**
     * Default Options for this FormApplication
     */
    static get defaultOptions() {
        console.log("IDJ | Iniciando Settings ");
        return mergeObject(super.defaultOptions, {
            id: 'idj-chat-form',
            title: 'Configurações do Chat',
            template: './systems/imperiodejade/templates/apps/settings.hbs',
            classes: ['sheet'],
            width: 640,
            height: "auto",
            closeOnSubmit: true
        })
    }

    getData(options) {
        function prepSetting(key) {
            let data = game.settings.settings.get(`idj.${key}`)
            return {
                value: game.settings.get('idj', key),
                name: data.name,
                hint: data.hint
            }
        }

        return {
            forceSheetTemplate: prepSetting('forceSheetTemplate'),
            disableExperience: prepSetting('disableExperience'),
            disableJournal: prepSetting('disableJournal')
        }
    }

    /**
     * Executes on form submission
     * @param {Event} e - the form submission event
     * @param {Object} d - the form data
     */
    async _updateObject(e, d) {
        const iterableSettings = Object.keys(d);
        for (let key of iterableSettings) {
            game.settings.set('idj', key, d[key]);
        }
    }
}

/*Classe para configurar opções do sistema*/
export const SystemSettings = function() {
    /**
     * Track the system version upon which point a migration was last applied
     */
    game.settings.register("idj", "systemMigrationVersion", {
        name: "System Migration Version",
        scope: "world",
        config: false,
        type: String,
        default: ""
    });

    //Ficha
    game.settings.registerMenu('idj', 'sheetSettings', {
        name: "Configurações das Fichas",
        label: "Configurações das Fichas",
        icon: 'fas fa-scroll',
        type: IDJChatSettings,
        restricted: true
    });

    game.settings.register("idj", "forceSheetTemplate", {
        name: "Forçar Padrão de Ficha",
        hint: "Sobrepõe a opção de Ficha dos jogadores e utiliza a ficha selecionada pelo Mestre. Alterar esta opção irá recarregar a página.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean,
        onChange: () => location.reload()
    });

    /**
     * Option to disable XP bar for session-based or story-based advancement.
     */
    game.settings.register("idj", "disableExperience", {
        name: "Avanço por Marcos",
        hint: "Os personagens não recebem pontos de experiência. Em vez disso, sobem de nível sempre que alcançam um determinado marco na história.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    /**
     * Option to disable XP bar for session-based or story-based advancement.
     */

    game.settings.register("idj", "disableJournal", {
        name: "Desabilitar Diário",
        hint: "Desabilita a aba Diário das fichas de personagem de jogador.",
        scope: "world",
        config: false,
        default: false,
        type: Boolean
    });

    // Gerais
    game.settings.register("idj", "sheetTemplate", {
        name: "Ficha",
        hint: "Opção de layout da ficha, padrão ou com abas",
        scope: game.settings.get("idj", "forceSheetTemplate") ? "world" : "user",
        config: true,
        default: "base",
        type: String,
        choices: {
            "base": "Layout IDJ (padrão)",
            "tabbed": "Layout VTT (abas)"
        }
    });

    /**
     * Gasto Automático de Mana
     */
    game.settings.register("idj", "automaticManaSpend", {
        name: "Gasto de Mana",
        hint: "Ao utilizar um poder ou magia, a mana do personagem é gasta automaticamente",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    /**
     * Register diagonal movement rule setting
     */
    game.settings.register("idj", "diagonalMovement", {
        name: "Movimento Diagonal",
        hint: "Configura qual regra de movimento diagonal será usada no sistema.",
        scope: "world",
        config: true,
        default: "MANHATTAN",
        type: String,
        choices: {
            "MANHATTAN": "Padrão (3m)",
            "EQUIDISTANT": "Equidistante (1,5m)",
            "PATHFINDER": "Pathfinder/3.5 (1,5m/3m/1,5m)",
        },
        onChange: rule => canvas.grid.diagonalRule = rule
    });

    /**
     * Option to automatically collapse Item Card descriptions
     */
    game.settings.register("idj", "autoCollapseItemCards", {
        name: "Esconder Descrições No Chat",
        hint: "Esconder Descrições No Chat. Alterar esta opção irá recarregar a página.",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: s => {
            // ui.chat.render();
            location.reload();
        }
    });
    /**
     * Option to show apply buttons inside chat
     */
    game.settings.register("idj", "applyButtonsInsideChat", {
        name: "Botões de Dano/Gasto",
        hint: "Ao selecionar esta opção, os botões de aplicar dano, cura, gastar mana, etc, serão exibidos embutidos dentro do chat. Alterar esta opção irá recarregar a página.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: s => {
            // ui.chat.render();
            location.reload();
        }
    });
}