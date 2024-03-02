//Les écrans et ce qui va avec
const ecran1 = document.getElementById("ecran1");
const ecran2 = document.getElementById("ecran2");
const ecran3 = document.getElementById("ecran3");
const ecran4 = document.getElementById("ecran4");
let EcranActu = 0;
const ecrans = document.getElementsByClassName("container"); //(pzas oublier de faire comme avec caroussel)

//Les boutons Ok
const btnOk1 = document.getElementById("btEcran1");
btnOk1.addEventListener("click", ecranSuivant);
const btnOk2 = document.getElementById("btEcran2");
btnOk2.addEventListener("click", ecranSuivant);
const btnOk3 = document.getElementById("btEcran3");
btnOk3.addEventListener("click", ecranSuivant);
btnOk3.addEventListener("click", recapitulatif);

//Les boutons Retour
const btRetour2 = document.getElementById("btRetour2");
btRetour2.addEventListener("click", ecranPrecedent);
const btRetour3 = document.getElementById("btRetour3");
btRetour3.addEventListener("click", ecranPrecedent);
const btRetour4 = document.getElementById("btRetour4");
btRetour4.addEventListener("click", ecranPrecedent);

//Les éléments des pages à recup
//De la page 1
const forfaits = ecran1.getElementsByClassName("card"); //Toutes les card de l'écran 1. Une card = un forfait
//De la page 2
const nbrAnnonces = document.getElementById("inputNb"); //On récupère la valeur de l'input
//De la page 3
const Options = ecran3.querySelectorAll("div"); //On récupère toutes les options de l'écran 3 qui sont dans des div
//De la plage Recap
const recapPrix = document.getElementById("recapPrix"); //On recup le span recapPrix, c'est là où on mettra le prix/annonce
const recapDuree = document.getElementById("recapDuree"); //On recup le span recapDuree, c'est là où on mettra la durée de l'annonce
const recapDuree2 = document.getElementById("recapDuree2"); //La même chose
const recapDuree3 = document.getElementById("recapDuree3"); //Pareil
const recapQuantite = document.getElementById("recapQuantite"); //La quantité totale de posts
const finalQuantite = document.getElementById("finalQuantite"); //Pareil
const optionRecap = document.getElementById("optionrecap"); //On récupère l'option Recap
const recapOption1 = document.getElementById("recapOption1");
const recapOption2 = document.getElementById("recapOption2");
const recapOption3 = document.getElementById("recapOption3");
const dateDebut = document.getElementById("dateDebut"); //On récupère les dates de début et de fin
const dateFin = document.getElementById("dateFin");
const prixTotal = document.getElementById("prixTotal"); //Le prix total

//Mes variables
let forfaitSelect = null; //Le forfait qu'on va sélectionner
let forfaitPrix = 0; //Le prix du forfait pour le calcul du prix total
let optionChoisie = 0;
let prixOption = 0; //Le prix de pour le calcul du prix total
let mois = 0;

///////////////////////////////////////////////////////////////////////////

//Fonction pour passer à l'écran suivant
function ecranSuivant() {
  for (let num = 0; num < parseInt(ecrans[0].children.length); num++) {
    //On parcout les écrans
    ecrans[0].children[num].style.display = "none"; // On les désactive
  }
  EcranActu++; //On ajoute 1 à l'écran courant, c'est à dire qu'on passe à l'écran suivant car on appelle cette fonction quand on clique sur un bouton ok
  ecrans[0].children[EcranActu].style.display = "block"; //On active l'écran courant
}
// c'est l'inverse
function ecranPrecedent() {
  for (let num = 0; num < parseInt(ecrans[0].children.length); num++) {
    ecrans[0].children[num].style.display = "none";
  }
  EcranActu--;
  ecrans[0].children[EcranActu].style.display = "block";
}

///////////////////////////////////////////////////////////////////////////

//Là on gère la sélection des options au niveau de l'écran 1
for (let i = 0; i < forfaits.length; i++) {
  //On parcourt les éléments de l'écran1
  let element = forfaits[i];
  //Si on clique sur l'élément on affiche le bouton ok
  element.addEventListener("click", () => {
    if (forfaitSelect == element) {
      //Si on sélectionne l'élément déjà sélectionné
      element.style.backgroundColor = ""; //On enlève le fond rouge
      forfaitSelect = null; //On l'enlève de l'élément sélectionné
      btnOk1.disabled = true; //On désactive le bouton ok
    } else {
      //Sinon
      for (let forfait of forfaits) {
        //On parcout les forfaits
        forfait.style.backgroundColor = ""; //On met le fond du forfait en normal
      }

      element.style.backgroundColor = "red"; //Ensuite on met le fond de l'élément sélectionné en rouge
      forfaitSelect = element; //On place dans notre variable l'élément qu'on a sélectionné
      btnOk1.style.display = "block"; //On affiche notre bouton
      btnOk1.disabled = false; //On active notre bouton Ok

      //On récupère la durée de l'option qui est placée dans la balise H3 et on la met dans les 3 éléments de durée pour le récap plus tard
      time = element.getElementsByTagName("h3");
      recapDuree.textContent = time[0].textContent;
      recapDuree2.textContent = time[0].textContent;
      recapDuree3.textContent = time[0].textContent;
      //On récupère le prix du forfait sélectionné qui est placé dans le td
      let td = element.getElementsByTagName("td");
      recapPrix.textContent = td[0].children[0].innerText; //On récupère le texte du td et on el place dans le recapPrix pour
      //Enfin en fonction du prix, on change notre variable forfaitPrix avec le prix correspondant (on ne peut pas prendre la valeur du textContent directement car il y a le symbole € dedans )
      if (recapPrix.textContent == "1,90€") {
        forfaitPrix = 1.9;
        mois = 1; //On change aussi la valeur du nbr de mois
      } else {
        if (recapPrix.textContent == "1,80€") {
          forfaitPrix = 1.8;
          mois = 3;
        }
        if (recapPrix.textContent == "1,70€") {
          forfaitPrix = 1.7;
          mois = 6;
        }
        if (recapPrix.textContent == "1,60€") {
          forfaitPrix = 1.6;
          mois = 9;
        }
        if (recapPrix.textContent == "1,50€") {
          forfaitPrix = 1.5;
          mois = 12;
        }
      }
    }
  });
}

///////////////////////////////////////////////////////////////////////////

//Là on gère le nombre de d'annonces de l'écran 2
nbrAnnonces.addEventListener("change", () => {
  //Fonction qui s'active lorsque l'on change l'input
  if (nbrAnnonces.value > 0) {
    //Si la valeur de l'input est supérieure à 0
    btnOk2.disabled = false; //On active le bouton Ok
    recapQuantite.textContent = nbrAnnonces.value; //On donne la valeur du nbr de post à l'élément quantité de la page recap
    finalQuantite.textContent = nbrAnnonces.value; //Pareil
  } else {
    //Sinon
    btnOk2.disabled = true; //On désactive le bouton Ok
  }
});

///////////////////////////////////////////////////////////////////////////

//Gestion de l'écran 3
//On s'occupe des cas avec les premières otpions
for (let i = 0; i < Options.length - 1; i++) {
  //On parcourt toutes les options
  let option = Options[i]; //On met dans une variable l'option
  option.addEventListener("click", () => {
    //Si cette option est cliquée
    if (colorer(option)) {
      //On regarde si elle a déjà été cliquée (donc si elle a un fond rouge avec la fonction colorer)
      option.style.backgroundColor = "white"; //Si oui on passe son fond en blanc
      optionChoisie = 0;
      AfficherOptions();
    } else {
      //Sinon
      optionChoisie = i + 1;
      option.style.backgroundColor = "red"; //On la sélectionne
      Options[2].style.backgroundColor = "white"; //On passe l'option duo en blanc
      AfficherOptions();
    }
    if (colorer(Options[0]) && colorer(Options[1])) {
      //Si les 2 options sont colorées on les passe en blanc et on sélectionne l'option duo
      Options[0].style.backgroundColor = "white";
      Options[1].style.backgroundColor = "white";
      Options[2].style.backgroundColor = "red";
      optionChoisie = 3;
      AfficherOptions();
    }
  });
}
// Puis on s'occupe des cas de la 3ème option
Options[2].addEventListener("click", () => {
  //Si elle est cliquée
  if (colorer(Options[2])) {
    //Si elle est déjà sélectionnée
    Options[2].style.backgroundColor = "white"; // On la déselectionne
    optionChoisie = 0;
    AfficherOptions();
  } else {
    //Sinon on la sélectionne et déselectionne les autres
    Options[0].style.backgroundColor = "white";
    Options[1].style.backgroundColor = "white";
    Options[2].style.backgroundColor = "red";
    optionChoisie = 3;
    AfficherOptions();
  }
});

//Fonction qui permet de regarder si une option a le fond en rouge
function colorer(option) {
  return option.style.backgroundColor == "red";
}

//Fonction qui permet d'appeler l'affichage de la bonne option en fonction de celle qui a été choisie 
function AfficherOptions(){
  if (optionChoisie == 0) {
    prixOption = 0;
    optionRecap.textContent = "Aucun";
    recapOption1.style.display = "none";
    recapOption2.style.display = "none";
    recapOption3.style.display = "none";
  }
  if (optionChoisie == 1) {
    prixOption = 9.9;
    optionRecap.textContent = "Duplique";
    recapOption1.style.display = "block";
    recapOption2.style.display = "none";
    recapOption3.style.display = "none";
  }
  
  if (optionChoisie == 2) {
    prixOption = 9.9;
    optionRecap.textContent = "Auto 96H";
    recapOption1.style.display = "none";
    recapOption2.style.display = "block";
    recapOption3.style.display = "none";
  }
  if (optionChoisie == 3) {
    prixOption = 15.9;
    optionRecap.textContent = "Pack Option Duo Duplique + Auto 96H";
    recapOption1.style.display = "none";
    recapOption2.style.display = "none";
    recapOption3.style.display = "block";
  }
}

///////////////////////////////////////////////////////////////////////////

//La page Recap
//La fonction qui calcule les éléments pour le récapitulatif
function recapitulatif() {
  let debut = new Date(); //La date du jour
  var fin = new Date();
  fin.setMonth(fin.getMonth() + mois); //On ajoute le ombre de mois de l'option à la date du jour
  //On ajoute dans les 2 variables du recap, les dates correspondantes
  dateDebut.textContent = debut.toLocaleDateString(); 
  dateFin.textContent = fin.toLocaleDateString();
  //On met dans la variable prixTotal, le calcul du prix -> le nombre de post * le prix du forfait + le nombre de mois * le prix de l'option
  prixTotal.textContent = Math.round((parseInt(recapQuantite.textContent) * forfaitPrix + mois * prixOption));
}