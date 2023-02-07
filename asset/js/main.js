let cptEssai = 9;
let mots = ["transformismes", "unicellulaires", "contre-visites", "rétablissement", "réorientations", "charitablement", "sympathisantes", "désensibilisée", "porte-drapeaux", "déconcertantes", "valeureusement", "avant-gardisme", "tripatouillons", "collectivistes", "herboristeries", "chromosomiques", "coïncideraient", "dégripperaient", "franchissables", "diversifièrent", "dénivellations", "estampillèrent", "sous-exploitât", "charbonnerions", "radiodiffusais", "rétrograderait"];
let motAdeviner;
let affichageMot = document.querySelector('#motdeviner');
let nbreTentative = document.querySelector('#nombre-tentative');
let tmotAdeviner;
let affichageDessin = document.querySelector('#affichage-dessin');
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let clavier = document.getElementById("boutons");
let grilleMasquee = "______________".split("");
let tLettreUtilisee = [];
let disable;
let enable;

function afficherBouton() {
    for (let i = 0; i < alphabet.length; i++) {
        clavier.innerHTML += '<button type="button" class="btn" id="btn" onclick="validerSaisi(\'' + alphabet[i] + '\')"><img src="asset/img/' + alphabet[i] + '.jpg" alt=""></button>';
    }
}
afficherBouton();

//générer un nombre aléatoire pour choisir le mot à deviner
function nbreAlea(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// enlever les accents du mot
String.prototype.sansAccent = function () {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
    str = this;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}
motAdeviner = (mots[nbreAlea(mots.length)]).sansAccent().toUpperCase();

//mettre le mot à deviner dans un tableau 
tmotAdeviner = motAdeviner.split("");
affichageDessin.innerHTML = '<img src="asset/img/pendu_' + cptEssai + '.jpg" class="w-100 rounded" alt=""></img>';

function validerSaisi(maValeur) {
    for (let j = 0; j < tmotAdeviner.length; j++) {
        if (tmotAdeviner[j] === '-') {
            grilleMasquee[j] = '-';
        }
    }
    
        if (cptEssai > 1) {
            let valeurInclus = motAdeviner.includes(maValeur);
            if (valeurInclus) {
                for (let i = 0; i < tmotAdeviner.length; i++) {
                    if (tmotAdeviner[i].indexOf(maValeur) != -1) {
                        grilleMasquee[i] = maValeur;
                        affichageMot.innerHTML = grilleMasquee.join(" ");
                    }
                }
            } else {
                cptEssai -= 1;
            }
            nbreTentative.innerHTML = "Il vous reste " + cptEssai + " tentative(s).";
            affichageDessin.innerHTML = '<img src="asset/img/pendu_' + (cptEssai) + '.jpg" class="w-100" alt=""></img>';
            let index = alphabet.indexOf(maValeur);
            alphabet.splice(index, 1);
            clavier.innerHTML = "";
            afficherBouton();
            if (grilleMasquee.includes('_') === false){
                nbreTentative.innerHTML = "Vous avez gagné !";
                clavier.innerHTML = "";
            }
        }

        else if (cptEssai <= 1) {
            affichageDessin.innerHTML = '<img src="asset/img/pendu_0.jpg" class="w-100" alt=""></img>'
            nbreTentative.innerHTML = 'Vous avez perdu, le mot à deviner était "' + motAdeviner + '".';
            clavier.innerHTML = "";
        }
    }


