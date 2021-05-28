import { idj } from "./config.js";
import IDJItemSheet from "./sheet/IDJItemSheet.js";
import IDJActorSheet from "./sheet/IDJActorSheet.js";

//Carregando Templates para modularidade
import { preloadHandlebarsTemplates } from "./templates.js";
import { registerHandlebarsHelpers } from "./handlebars.js";

Hooks.once("init", function () {
    console.log("IDJ | Iniciando o sistema Império de Jade");
    CONFIG.idj = idj;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("idj", IDJItemSheet, { makeDefault: true });
    
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("idj", IDJActorSheet, { makeDefault: true });

    preloadHandlebarsTemplates();
    registerHandlebarsHelpers();
});

Hooks.once("setup", function() {

  // Localize CONFIG objects once up-front
  const toLocalize = [
    "tipoArma", "atributos", "atributosAbr",
    "pericias", "weaponProperties", "listaAtivacao", "listaAlcance", "listaDuracoes", "tipoChacra", "grauJutsu", "tipoChacraAttr", "jutsuDescritores", "tipoTalento"
  ];

  // Exclude some from sorting where the default order matters
  const noSort = [
      "tipoArma", "atributos", "atributosAbr", "pericias", "listaAtivacao", "listaAlcance", "listaDuracoes", "tipoChacra", "grauJutsu", "tipoChacraAttr", "jutsuDescritores", "tipoTalento"
  ];

  // Localize and sort CONFIG objects
  for ( let o of toLocalize ) {
    const localized = Object.entries(CONFIG.idj[o]).map(e => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if ( !noSort.includes(o) ) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.idj[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
    console.log("IDJ | Localizando "+o);
  }
});