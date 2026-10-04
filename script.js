const images = {
  default:
    "https://i.pinimg.com/736x/ff/34/a2/ff34a224fdcf72a3306a3cbdd0a6e8de.jpg",
  failed:
    "https://i.pinimg.com/736x/10/99/60/109960e099e0442bef56d000d4841196.jpg",
  passed:
    "https://i.pinimg.com/736x/6e/cf/4d/6ecf4d48aec9676e0ee0e77118d9f1f3.jpg",
  excellent:
    "https://i.pinimg.com/736x/5d/c2/27/5dc227e04153e79e474a93939d03ab3c.jpg",
};

const remarkEl = document.getElementById("remark");
const nameEl = document.getElementById("name");
const scoreEl = document.getElementById("score");
const catEl = document.getElementById("cat");

// show the starting design when the page opens
catEl.src = images.default;

// Function that evaluates the score using conditional branching
function evaluateScore(score) {
  if (score >= 90) {
    return {
      remark: "EXCELLENT!",
      color: "#a020f0",
      image: images.excellent,
    };
  } else if (score >= 75) {
    return {
      remark: "YOU PASSED!",
      color: "#00c853",
      image: images.passed,
    };
  } else {
    return {
      remark: "YOU FAILED!",
      color: "#ff4d4d",
      image: images.failed,
    };
  }
}

// Shows the result on the webpage
function showResult(remark, color, image, name, score) {
  remarkEl.textContent = remark;
  remarkEl.style.color = color;
  nameEl.textContent = name;
  scoreEl.textContent = score;
  scoreEl.style.color = color;
  catEl.src = image;
}

// Back to the starting design
function resetDisplay() {
  showResult(
    "PRESS THE BLUE BUTTON TO START AGAIN",
    "#4dcaff",
    images.default,
    "",
    "",
  );
}

function runProgram() {
  // 1. Welcome message
  alert("Welcome to the Score Evaluation!");

  // 2. Ask for the name
  let name = prompt("Enter your name:");

  // Pressing Cancel stops the program
  if (name === null) {
    return "done";
  }

  // Validation when name is empty
  if (name.trim() === "") {
    alert("Invalid input: please enter your name. Starting again...");
    return "restart";
  }
  name = name.trim();

  // 3. Ask for the score
  let scoreInput = prompt("Enter your score (1 to 100):");

  // Pressing Cancel stops the program
  if (scoreInput === null) {
    return "done";
  }

  //VALIDATIONS
  //empty score
  if (scoreInput.trim() === "") {
    alert("Invalid input: please enter your score. Starting again...");
    return "restart";
  }

  const score = Number(scoreInput.trim());

  //not a number
  if (isNaN(score)) {
    alert("Invalid input: the score must be a number. Starting again...");
    return "restart";
  }

  //zero
  if (score === 0) {
    alert("Invalid input: the score cannot be zero. Starting again...");
    return "restart";
  }

  // negative
  if (score < 0) {
    alert("Invalid input: the score cannot be negative. Starting again...");
    return "restart";
  }

  //beyond 100
  if (score > 100) {
    alert(
      "Invalid input: the score cannot be more than 100. Starting again...",
    );
    return "restart";
  }

  // 4. Ask if the user wants to continue
  const proceed = confirm(
    "Hi " + name + "! Do you want to continue and see your result?",
  );
  if (!proceed) {
    alert("Okay, maybe next time!");
    return "done";
  }

  // 5. Evaluate and display the result
  const result = evaluateScore(score);

  showResult(
    result.remark,
    result.color,
    result.image,
    name.toUpperCase(),
    score,
  );
  return "done";
}

function startProgram() {
  resetDisplay();

  // keep starting over until there is no invalid input
  while (runProgram() === "restart") {
    resetDisplay();
  }
}

document.getElementById("startBtn").addEventListener("click", startProgram);
