const words = [
    "apple", "banana", "cherry", "dragon", "elephant", "flower", "giraffe", "honey", "island", "jungle",
    "kitten", "lemon", "monkey", "nest", "orange", "panda", "queen", "rabbit", "snake", "tiger",
    "umbrella", "violet", "whale", "xylophone", "zebra", "butterfly", "cactus", "dolphin", "eagle", "flamingo",
    "guitar", "hammer", "igloo", "jelly", "koala", "lizard", "mango", "night", "ocean", "penguin",
    "quartz", "rose", "sunset", "turtle", "unicorn", "vulture", "water", "xenon", "yellow", "zipper",
    "avocado", "beetle", "canyon", "desert", "emerald", "forest", "galaxy", "horizon", "insect", "jasmin",
    "kiwi", "lotus", "meadow", "noodle", "oasis", "peacock", "quail", "river", "shadow", "thunder",
    "utopia", "valley", "willow", "xray", "yogurt", "zombie", "bamboo", "coral", "daisy", "energy",
    "fossil", "glacier", "hollow", "ivory", "juice", "kernel", "lantern", "marble", "nectar", "orbit",
    "pearl", "quilt", "reef", "saddle", "trumpet", "velvet", "waffle", "yacht", "zigzag"
];

const hangmanStages = [
    `
   +---+
   |   |
       |
       |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
       |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`
];

let selectedWord = '';
let displayedWord = [];
let guessesLeft = 6;
let usedLetters = [];

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill('_');
    guessesLeft = 6;
    usedLetters = [];
    
    updateDisplay();
    document.getElementById('letter-input').value = '';
    document.getElementById('message').textContent = '';
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayedWord.join(' ');
    document.getElementById('guesses-left').textContent = `Guesses remaining: ${guessesLeft}`;
    document.getElementById('used-letters').textContent = `Used letters: ${usedLetters.join(', ')}`;
    document.getElementById('hangman-figure').innerHTML = `<pre>${hangmanStages[6 - guessesLeft]}</pre>`;
}

function makeGuess() {
    const input = document.getElementById('letter-input');
    const letter = input.value.toLowerCase();
    
    if (!letter || letter.length !== 1 || !/[a-z]/.test(letter)) {
        document.getElementById('message').textContent = 'Please enter a single letter!';
        return;
    }
    
    if (usedLetters.includes(letter)) {
        document.getElementById('message').textContent = 'You already used that letter!';
        return;
    }
    
    usedLetters.push(letter);
    input.value = '';
    
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        
        if (!displayedWord.includes('_')) {
            document.getElementById('message').textContent = 'You won! Click "New Game" to play again.';
        }
    } else {
        guessesLeft--;
        if (guessesLeft === 0) {
            document.getElementById('message').textContent = `Game Over! The word was "${selectedWord}". Click "New Game" to play again.`;
        }
    }
    
    updateDisplay();
}

document.getElementById('guess-btn').addEventListener('click', makeGuess);
document.getElementById('reset-btn').addEventListener('click', startGame);
document.getElementById('letter-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

// Start the game when page loads
window.onload = startGame;
