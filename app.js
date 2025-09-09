// get array of letter buttons and create event listeners for each
const letters = document.querySelectorAll(".letter");

letters.forEach((letter) => {
  letter.addEventListener("click", () => {
    highlightLetter(letter);
  });
});

// store current word being created (each element in a button)
let currentWord = [];

const currentDisplay = document.getElementById("current-word");

// store answer words
const answerWords = [
  "share",
  "consider",
  "apologize",
  "respect",
  "thank",
  "listen",
];
const spangram = "bepolite";

// update progress 'bar'
let found = 0;
const numFound = document.getElementById("numFound");
const numTotal = document.getElementById("numTotal");
numTotal.innerHTML = answerWords.length + 1; // adding spangram

/**
 * update the progress 'bar' to show how many words have been found
 */
const updateFound = () => {
  numFound.innerHTML = found;
};
updateFound();

/**
 * highlights corresponding bubble of button that was clicked
 * @param {*} button
 */
const highlightLetter = (button) => {
  // get id of letter button to find corresponding bubble
  const id = button.getAttribute("id").substring(1);
  const bubble = document.getElementById("b" + id);
  // makes sure button hasn't already been verified as a word
  if (
    bubble.style.background === "lightblue" ||
    bubble.style.background === "yellow"
  ) {
    return;
  }
  // toggle button background color
  if (bubble.style.background === "") {
    // checks whether the button clicked is adjacent to the previous button
    if (
      currentWord.length > 0 &&
      !adjacent(
        id,
        currentWord[currentWord.length - 1].getAttribute("id").substring(1)
      )
    ) {
      select(currentWord, "");
      currentWord.length = 0;
      updateCurrent();
    }
    bubble.style.background = "grey";
    currentWord.push(bubble);
    updateCurrent();
  } else {
    // user is clicking on an already grey square to submit the word
    // check to make sure user clicked on last letter again
    if (
      bubble.getAttribute("id") ===
      currentWord[currentWord.length - 1].getAttribute("id")
    ) {
      const submittedWord = concatWord(currentWord);
      // see if submittedWord is in answerWords
      if (!inAnswer(submittedWord)) {
        select(currentWord, "");
        // reset update text
        currentWord.length = 0;
        updateCurrent();
      } else {
        found++;
        updateFound();
        // reset currentWord since word has been checked already
        currentWord.length = 0;
        // update display text if you win
        if (found === answerWords.length + 1) {
          currentDisplay.innerHTML = "You Won!";
          return;
        }
      }
    }
  }
};

/**
 * returns true if word is in answerWords or spangram
 * @returns
 */
const inAnswer = (word) => {
  for (let i = 0; i < answerWords.length; i++) {
    if (answerWords[i] === word.toLowerCase()) {
      select(currentWord, "lightblue");
      // update display showing that a word was found
      currentDisplay.style.fontSize = "3rem";
      currentDisplay.innerHTML = "Word Found!";
      return true;
    }
  }
  if (word.toLowerCase() === spangram) {
    select(currentWord, "yellow");
    // update display showing that spangram was found
    currentDisplay.innerHTML = "SPANGRAM!";
    currentDisplay.style.fontSize = "3rem";
    currentDisplay.style.color = "yellow";
    return true;
  }
  return false;
};

/**
 * Concatenates the letters of all the bubbles in bubbleList
 * @param {*} bubbleList
 */
const concatWord = (bubbleList) => {
  let word = "";
  for (let i = 0; i < bubbleList.length; i++) {
    word += bubbleList[i].textContent.trim();
  }
  return word;
};

/**
 * updates the display of the current word based on current word
 */
const updateCurrent = () => {
  // update font size
  let word = concatWord(currentWord);
  if (word.length > 12) {
    currentDisplay.style.fontSize = "2rem";
  } else if (word.length > 8) {
    currentDisplay.style.fontSize = "3rem";
  } else {
    currentDisplay.style.fontSize = "5rem";
  }
  currentDisplay.style.color = "black";
  currentDisplay.innerHTML = word;
};

/**
 * Sets the background of all items in bubbleList to color
 * @param {*} bubbleList
 */
const select = (bubbleList, color) => {
  bubbleList.forEach((bubble) => {
    bubble.style.background = color;
  });
};

/**
 * returns true if idx1 and idx2 are adjacent in a 6x8 2D array of letter buttons, including diagonals
 * @param {*} idx1
 * @param {*} idx2
 */
const adjacent = (idx1, idx2) => {
  // row
  if (Math.floor(idx1 / 6) == Math.floor(idx2 / 6)) {
    if (Math.abs(idx2 - idx1) == 1) {
      return true;
    } else {
      return false;
    }
  }
  // column
  if (idx1 % 6 == idx2 % 6) {
    if (Math.abs(Math.floor(idx1 / 6) - Math.floor(idx2 / 6)) == 1) {
      return true;
    } else {
      return false;
    }
  }
  // diagonal
  if (Math.abs(Math.floor(idx1 / 6) - Math.floor(idx2 / 6)) == 1) {
    if (Math.abs((idx2 % 6) - (idx1 % 6)) == 1) {
      return true;
    }
  }
  return false;
};
