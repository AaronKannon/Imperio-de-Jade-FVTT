/* global Handlebars */
export function registerHandlebarsHelpers() {
    Handlebars.registerHelper("concat", function () {
    var outStr = "";Chat
    for (var arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper("toLowerCase", function (str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper("toJSONString", function (str) {
    return JSON.stringify(str);
  });

  Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("ifNotEquals", function (arg1, arg2, options) {
    return arg1 != arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("ifGreater", function (arg1, arg2, options) {
    if (arg1 > arg2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper("ifEGreater", function (arg1, arg2, options) {
    if (arg1 >= arg2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper(
    "conditionTip",
    function (context, condition, options) {
      var ret = "";
      for (var prop in context) {
        if (condition == prop) {
          ret = ret + " " + context[prop].tooltip;
        }
      }
      return ret;
    }
  );
	Handlebars.registerHelper("stripTags", function (str) {
    return str.replace(/<[^>]*>?/gm, '');
  });
	
  Handlebars.registerHelper('add', (a, b) => a + b);
	
	Handlebars.registerHelper('divide', (a, b) => a / b);

  Handlebars.registerHelper('multiply', (a, b) => a * b);

  Handlebars.registerHelper("find", function (arr, key, value) {
    return arr.find(i => i[key] == value) ? true : false;
  });

  Handlebars.registerHelper("jutsuDescricao", function (descricao) {
    let result = "";
    let elemental = false;
    if(descricao.acido && descricao.eletricidade && descricao.fogo && descricao.frio && descricao.vento) {
      elemental = true;
    }
    if(descricao.abjuracao) {
      result = stringVazia(result,"Abjuração");
    }
    if(descricao.acido && !elemental) {
      result = stringVazia(result,"Ácido");
    }
    if(descricao.adivinhacao) {
      result = stringVazia(result,"Advinhação");
    }
    if(elemental) {
      result = stringVazia(result,"Elemental");
    }
    if(descricao.eletricidade && !elemental) {
      result = stringVazia(result,"Eletricidade");
    }
    if(descricao.encantamento) {
      result = stringVazia(result,"Encantamento");
    }
    if(descricao.fogo&& !elemental) {
      result = stringVazia(result,"Fogo");
    }
    if(descricao.frio && !elemental) {
      result = stringVazia(result,"Frio");
    }
    if(descricao.ilusao) {
      result = stringVazia(result,"Ilusão");
    }
    if(descricao.invocacao) {
      result = stringVazia(result,"Invocação");
    }
    if(descricao.luz) {
      result = stringVazia(result,"Luz");
    }
    if(descricao.ninja) {
      result = stringVazia(result,"Ninja");
    }
    if(descricao.transmutacao) {
      result = stringVazia(result,"Transmutação");
    }
    if(descricao.trevas) {
      result = stringVazia(result,"Trevas");
    }
    if(descricao.vacuo) {
      result = stringVazia(result,"Vácuo");
    }
    if(descricao.vento && !elemental) {
      result = stringVazia(result,"Vento");
    }
    return result;
  });

  function stringVazia(str,adicionar) {
    if (str.length === 0){
      str +=adicionar
    }else {
      str = str+", "+adicionar
    }
    return str;
  }

}
