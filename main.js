document.addEventListener("DOMContentLoaded", () => {
    createSquares();
  
    let guessedWords = [[]];
    let availableSpace = 1;
  
    let word = "hello";
    let guessedWordCount = 0;
  
    const keys = document.querySelectorAll(".keyboard-row button");
  
   
  
    function getcWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords - 1];
    }
  
    function uGuessedWords(letter) {
      const cWordArr = getcWordArr();
  
      if (cWordArr && cWordArr.length < 5) {
        cWordArr.push(letter);
  
        const availableSpaceEl = document.getElementById(String(availableSpace));
  
        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = letter;
      }
    }
  
    function getTileColor(letter, index) {
      const isCorrectLetter = word.includes(letter);
  
      if (!isCorrectLetter) {
        return "rgb(58, 58, 59)";
      }
  
      const letterInThatPosition = word.charAt(index);
      const isCorrectPosition = letter === letterInThatPosition;
  
      if (isCorrectPosition) {
        return "rgb(83, 141, 77)";
      }
  
      return "rgb(181, 159, 58)";
    }
  
    function handleSubmitWord() {
      const cWordArr = getcWordArr();
      if (cWordArr.length !== 5) {
        window.alert("Word must be 5 letters");
      }
  
      const currentWord = cWordArr.join("");
  
      
     
  
          const firstLetterId = guessedWordCount * 5 + 1;
          const interval = 200;
          cWordArr.forEach((letter, index) => {
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);
  
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });
  
          guessedWordCount += 1;
  
          if (currentWord === word) {
            window.alert("Congratulations!");
          }
  
          if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
          }
  
          guessedWords.push([]);
        
    }
  
    function createSquares() {
      const gameBoard = document.getElementById("board");
  
      for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
      }
    }
  
    function handleDeleteLetter() {
      const cWordArr = getcWordArr();
      const removedLetter = cWordArr.pop();
  
      guessedWords[guessedWords.length - 1] = cWordArr;
  
      const lastLetterEl = document.getElementById(String(availableSpace - 1));
  
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
    }
  
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key");
  
        if (letter === "enter") {
          handleSubmitWord();
          return;
        }
  
        if (letter === "del") {
          handleDeleteLetter();
          return;
        }
  
        uGuessedWords(letter);
      };
    }
  });