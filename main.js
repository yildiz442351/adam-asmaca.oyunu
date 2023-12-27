// console.log('hello world!')
const wordEl = document.getElementById("word");
const popUp = document.getElementById("popUpContainer");
const messageEl = document.getElementById("successMessage");
const wrongLettersEl = document.getElementById("wrongLetters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const playAgainbtn = document.getElementById("playAgain");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = [
        "pazartesi",
        "salı",
        "çarşamba",
        "perşembe",
        "cuma",
        "cumartesi",
    ];
    return words[Math.floor(Math.random() * words.length)];
}
// console.log(getRandomWord());

function displayWord() {
    wordEl.innerHTML = `
  ${selectedWord
            .split("")
            .map(
                (letter) => `
  <div class="letter">
  ${correctLetters.includes(letter) ? letter : ""}
  </div>
  `
            )
            .join("")}
  `;

    const word = wordEl.innerText.replace(/\n/g, "");
    if (word === selectedWord) {
        // console.log('bildiniz')
        popUp.style.display = "flex";
        messageEl.style.backgroundColor = "green";
        messageEl.innerText = "Tebrikler, Kazandınız..";
    }
}

function uptadeWrongLetters() {
    wrongLettersEl.innerHTML = `
${wrongLetters.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
${wrongLetters.map((letter) => `<span>${letter}<span>`)}
`;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    if (wrongLetters.length === items.length) {
        popUp.style.display = "flex";
        messageEl.style.backgroundColor = "red";
        messageEl.innerText = "Maalesef Kaybettiniz..";
    }
}

function displayMessage() {
    message.classList.add("show");
    setTimeout(function () {
        message.classList.remove("show");
    }, 2000);
}

playAgainbtn.addEventListener("click", function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    uptadeWrongLetters();

    popUp.style.display = 'none'
});

window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 0 && e.keyCode <= 230) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                // console.log(correct)
                displayWord();
            } else {
                displayMessage();
                // bu harfi kullandınız
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                uptadeWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

displayWord();