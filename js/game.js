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
    drawHangman(0);
    document.getElementById('letter-input').value = '';
    document.getElementById('message').textContent = '';
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayedWord.join(' ');
    document.getElementById('guesses-left').textContent = `Guesses: ${guessesLeft}`;
    document.getElementById('used-letters').textContent = `Used: ${usedLetters.join(', ')}`;
}

function makeGuess() {
    const input = document.getElementById('letter-input');
    const letter = input.value.toLowerCase();
    
    if (!letter || letter.length !== 1 || !/[a-z]/.test(letter)) {
        document.getElementById('message').textContent = 'Enter a single letter!';
        return;
    }
    
    if (usedLetters.includes(letter)) {
        document.getElementById('message').textContent = 'Letter already used!';
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
            document.getElementById('message').textContent = 'You survived! New game?';
        }
    } else {
        guessesLeft--;
        drawHangman(6 - guessesLeft);
        if (guessesLeft === 0) {
            document.getElementById('message').textContent = `Hanged! Word was "${selectedWord}"`;
        }
    }
    
    updateDisplay();
}

document.getElementById('guess-btn').addEventListener('click', makeGuess);
document.getElementById('reset-btn').addEventListener('click', startGame);
document.getElementById('letter-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') makeGuess();
});

window.onload = startGame;
