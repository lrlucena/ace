define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PotigolHighlightRules = function() {

    var keywords = (
            "caso|então|entao|senao|senão|para|de|ate|até|passo|se|senãose|senaose|"+
            "escolha|enquanto|fim|faça|faca|gere|" +
            "use|var|tipo|mod|div|e|ou|não|nao|formato|" +
            "escreva|imprima"
    );

    var buildinConstants = ("verdadeiro|falso|PI|_");

    var langClasses = (
        "Lista|Matriz|Cubo|" +
        "Unit|Inteiro|Real|Texto|Lógico|Logico|" +
        "Tupla|"+
        "inteiro|arredonde|texto|real|tamanho|posição|posiçao|posicão|posicao|"+
        "contém|contem|maiúsculo|maiusculo|minúsculo|minusculo|inverta|divida|lista|"+
        "cabeça|cabeca|cauda|último|ultimo|pegue|descarte|selecione|mapeie|"+
        "descarte_enquanto|pegue_enquanto|ordene|junte|insira|remova|"+
        "mutável|mutavel|imutável|imutavel|vazia|injete|"+
        "primeiro|segundo|terceiro|quarto|quinto|sexto|sétimo|setimo|oitavo|"+
        "nono|décimo|decimo|"+
        "sen|cos|tg|arcsen|arccos|arctg|abs|raiz|log|log10|aleatório|aleatorio|" +
        "leia_texto|leia_textos|leia_inteiro|leia_inteiros|"+
        "leia_numero|leia_número|leia_numeros|leia_números|leia_real|leia_reais"
    );

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "support.function": langClasses,
        "constant.language": buildinConstants
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "#.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
            }, {
                token : "string",
                regex : '"',
                next : "tstring"
            }, {
                token : "constant.charactere", // single line
                regex : "'[\\w\\d_]'"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "(?:verdadeiro|falso)\\b"
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-ZáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙâêîôûÂÊÎÔÛãõÃÕçÇñÑ_$][a-zA-Z0-9áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙâêîôûÂÊÎÔÛãõÃÕçÇñÑ_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\-|\\+|\\^|\\*|/|==|=|<=|>=|=>|<>|<|>|\\||\\:\\:|\\:=|\\b(?:in)"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],
        "string" : [
            {
                token : "escape",
                regex : '\\\\"'
            }, {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                token : "string.invalid",
                regex : '[^"\\\\]*$',
                next : "start"
            }, {
                token : "string",
                regex : '[^"\\\\]+'
            }
        ],
        "tstring" : [
            {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                defaultToken : "string"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(PotigolHighlightRules, TextHighlightRules);

exports.PotigolHighlightRules = PotigolHighlightRules;
});
