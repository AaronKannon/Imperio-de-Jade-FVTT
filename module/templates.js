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


		// Item Sheet Partials
		"systems/imperiodejade/templates/item/parts/item-header.hbs",
		"systems/imperiodejade/templates/item/parts/item-description.hbs"
	]);
};
