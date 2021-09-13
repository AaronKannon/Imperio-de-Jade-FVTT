/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
    console.log("IDJ | Carregando os templates parciais");
    return loadTemplates([

        // Shared Partials

        // Actor Sheet Partials
        "systems/imperiodejade/templates/sheets/actor/parts/actor-header.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-aviso.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-diario.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-favoritos.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-inventory.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-powers.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-spells.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-skills.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/actor-traits.hbs",
        "systems/imperiodejade/templates/sheets/actor/parts/active-effects.hbs",

        // Item Sheet Partials
        "systems/imperiodejade/templates/sheets/item/parts/item-header.hbs",
        "systems/imperiodejade/templates/sheets/item/parts/item-description.hbs",
        "systems/imperiodejade/templates/sheets/item/parts/item-ativacao.hbs",
        "systems/imperiodejade/templates/sheets/item/parts/item-resistencia.hbs",
        "systems/imperiodejade/templates/sheets/item/parts/item-chatbox.hbs",
        "systems/imperiodejade/templates/sheets/item/parts/item-rolagem.hbs"
    ]);
};