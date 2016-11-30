'use strict'

class Markdown {


    constructor () {
        this.MARK = {
            "DOUBLEMARK": {
                "HIGHLIGHT": "(\\*)[^\\*]+(\\*)",
                "CODE": "(\\`)[^\\`]+(\\`)"
            },
            "LINK": {
                "LINK": "(\\[)([^\\]]+)\\]\\(([\\b]?[\\S]+\\b)[\\s]+[\\\"\\']([^\\\"]+)[\\\"\\']\\)"
            }
        }
        this.MARKELEMENT = {
            "HIGHLIGHT": "em",
            "CODE": "code"
        }
        this.SPLITEEXP = new RegExp("\\<[^\\/\\>]+\\/\\>");

        this.regExp = this.createRegExp(this.MARK.DOUBLEMARK);
        this.linkExp = this.createRegExp(this.MARK.LINK.LINK);
    }

    createRegExp (express) {
        let regExp;
        if (typeof express === "string") {
            regExp = new RegExp(express, "g");
        } else {
            regExp = {};
            Object.keys(express).forEach((value, index) => {
                regExp[value] = new RegExp(express[value], "g");
            });
        }
        return regExp;
    }

    doubleMarkReplace (passage, doublemarkExp) {
        Object.keys(doublemarkExp).forEach((value, index) => {
            let HTMLDOMelement = this.MARKELEMENT[value];
            passage = passage.replace(doublemarkExp[value], function(word, reg1, reg2){
                return word.replace(reg1, "<" + HTMLDOMelement + ">")
                    .replace(reg2, "</" + HTMLDOMelement + ">");
            });
        });
        return passage;
    }

    linkMarkReplace (passage, linkmarkExp) {
        passage = passage.replace(linkmarkExp, (word, reg1, reg2, reg3, reg4) => {
            return "<a href=\"" + reg3 + "\" title=\"" + reg4 + "\">" + reg2 + "</a>";
        });
        return passage;
    }


    markToHTML (passage) {
        passage = this.linkMarkReplace(passage, this.linkExp);
        passage = this.doubleMarkReplace(passage, this.regExp);
        return passage;
    }



}

class ParseMarkdown extends Markdown{

    constructor () {
        super();
        this.passage = "";
    }

    markToHTML (passage) {
        return super.markToHTML(passage);
    }

    setPassage (value) {
        this.passage = value;
    }

    parse () {
        return this.markToHTML(this.passage);
    }
}

module.exports = ParseMarkdown;