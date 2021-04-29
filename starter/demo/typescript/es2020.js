/* DONNEES */

/* Variables :
 * - oublier "var"
 * - déclaration obligatoire en mode strict
 * - pas de caractères spéciaux (tirets, espaces, accents...)
 * - en Anglais
 * - camelCase (variables sensible à la casse)
 * - attention aux mots-clés réservés (window, document...)
 */
let myData = 'js';

/* Constantes : pas de réaffectation possible, mais valeur manipulable */
const NEWS_PER_PAGE = 10;

const MY_MODULE = {
  option: 'default',
};
MY_MODULE.option = 'custom';

/* String :
 * - guillements simples ou doubles : texte brut, pas de saut de ligne
 * - backticks : sauts de ligne possibles, interpolation des variables, guillemets multiples possibles
 *               plus de risques d'erreur avec la concaténation
 */
let userFirstName = 'Henri';
let userLastName = 'Bergson';

let userTemplate = `<div id="user">
    <p>Je m'appelle ${userFirstName} ${userLastName}.</p>
</div>`;

/* Number :
 * - pas de types distinctifs
 * - attention aux décimaux
 * - valeurs spéciales : NaN (Not a Number), Infinity
 */
let userAge = 81;

userAge += 1; // 82
userAge++; // Source d'erreur

console.log((0.7 + 0.1) === (0.9 - 0.1)); // false

/* Boolean */
let userMan = true;
let userWoman = false;

/* Valeur vide */
let userUnknownYet = null;

/* Erreur : undefined */

/* Array : liste homogène, indexée numériquement */
const userBooks = [`Livre 1`, `Livre 2`];

userBooks.length; // 2
userBooks.push(`Livre 3`);
userBooks[0]; // `Livre 1`
userBooks[0] = `Modification du premier livre`;

/* Object : liste hétérogène, propriétés indexées manuellement
 * - équivalent des tableaux associatifs en PHP
 * - équivalent des HashMap en Java
 * - équivalent des Dictionnary en C# */
const user = {
  firstName: `Henri`,
  lastName: `Bergson`,
  age: 81,
  man: true,
  books: [`Livre 1`, `Livre 2`],
  family: {
    brothers: 5,
    sisters: 3,
  },
};

user.firstName; // `Henri`
user.firstName = `Modification du prénom`;
user.books[1]; // `Livre 1`
user.family.sisters; // 3

if ('firstName' in user) {
  /* Do something */
}

/* Nouvelles collections :
 * - Set : liste de valeurs uniques
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set
 * - Map : liste homogène de clés / valeurs
 * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map */

/* - Valeurs simples passées par copie
 * - Objects et tableaux passés par référence */
let data1 = 10;
let data2 = data1;
data2 = 20;
data1; // 10

const user2 = user;
user2.firstName = `Nouveau prénom`;
user.firstName; // `Nouveau prénom`



/* CONDITIONS */

/* Préférez les comparaisons strictes */

if (user.age < 18) {
  /* Do something */
} else if ((user.age >= 18) && (user.age < 21)) {
  /* Do something */
} else {
  /* Do something */
}

if (user.man === true) {
  /* Do something */
} else if ((user.age !== 81) || (user.man === false)) {
  /* Do something */
}

/* Raccourcis à éviter, comparaisons simples */
if (user.man) {
  /* Do something */
} else if (!user.man) {
  /* Do something */
}

/* Attention aux valeurs falsy (0, '', etc.) */
let ternary = (user.age >= 1) ? `valeur si vrai` : `sinon`;

/* ES2020 */
let lastName = user?.lastName ?? `valeur par défaut`;


/* Les comparaisons sont strictes */
switch (user.firstName) {
  case `Henri`:
    /* Do something */
    break;
  case `Pierre`:
    /* Do something */
    break;
  default:
    /* Do something */
    break;
}

try {
  throw new Error(`Custom message`);
} catch (error) {
  error.message;
} finally {
  // Facultatif, Se produit dans tous les cas
}

/* BOUCLES */

let i = 0;
while (i < 10) {
  /* Do something */
  i += 1;
}

let j = 0;
do {
  /* Do something */
  j += 1;
} while (j < 10);

/* Grâce à let, la portée de la variable est limitée à ce bloc */
for (let k = 0; k < 10; k += 1) {
  /* Do something */
}

/* ITERATION SUR LES LISTES */

/* Itération simple sur les valeurs, ne pas confondre avec for...in */
for (const book of user.books) {
  book; // `Livre 1`, puis `Livre 2`, etc.
}

/* Itération complexe sur les index et les valeurs, seulement pour les tableaux */
user.books.forEach((book, index) => {
  book; // `Livre 1`, puis `Livre 2`, etc.
});



/* FONCTIONS */

/* Déclaration et valeur de retour */
function userSayHello() {
  return `Hello world`;
}

userSayHello(); // `Hello world`

/* Portée locale, accès aux portées parentes possibles */
function test() {
  let localUserLastName = `local`;
  userFirstName = `global`;
}

/* Paramètres toujours facultatifs, 2 solutions :
 * - vérifier manuellement les paramètres obligatoires
 * - prévoir une valeur par défaut */
function creps(butter, rhum = false) {
  /* La comparaison simple est essentielle ici, car le paramètre peut aussi être undefined */
  if (butter == null) {
    return;
  }
}

creps(true, false);
creps(false, false);
creps(false);

/* Paramètres rest */
function myArrayPush(...values) {
  for (const value of values) {
    /* Do something */
  }
}
myArrayPush(`Livre 1`, `Livre 2`);

/* Paramètres spread */
myArrayPush(...user.books);

/* Fonction anonyme */
user.books.forEach((book, index) => {
  /* Do something */
});

/* Arrow function */
user.books.forEach((book, index) => {
  /* Do something */
});

/* Méthodes dans un objet */
const userWithMethod = {
  name: `Henri Bergson`,
  sayHello() {
    return this.name;
  },
};

userWithMethod.sayHello(); // `Henri Bergson`



/* DECOMPOSITION */

/* Extraction des valeurs d'un tableau */
let [book1, book2] = user.books;

/* Extraction des valeurs d'un objet */
let { firstName: myFirstName } = user;
let { firstName } = user;

/* Extraction des valeurs d'un objet avec valeurs par défaut */
let { books: myBooks = [] } = user;
let { books = [] } = user;

/* Exemple pour gérer les options d'une fonction */
function slideshow({ delay = 5000, speed = 1000 } = {}) {}

slideshow();
slideshow({
  delay: 2000,
});

export const _zzz = {};
