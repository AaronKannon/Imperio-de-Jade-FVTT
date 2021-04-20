import { idj } from "./config.js";
import IDJItemSheet from "./sheet/IDJItemSheet.js";
//import IDJActorSheet from "./module/sheet/IDJActorSheet.js";

//Carregando Templates para modularidade
import { preloadHandlebarsTemplates } from "./templates.js"

Hooks.once("init", function () {
    console.log("IDJ | Iniciando o sistema Império de Jade");
    CONFIG.idj = idj;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("idj", IDJItemSheet, { makeDefault: true });

    preloadHandlebarsTemplates();
});