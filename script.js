const quizData = [
    {
        question: "Human behavior is mainly influenced by?",
        options: [
            "Environment and experiences",
            "Weather only",
            "Clothing style",
            "Food color"
        ],
        answer: 0
    },
    {
        question: "Which part of the brain controls emotions?",
        options: [
            "Heart",
            "Lungs",
            "Limbic system",
            "Kidneys"
        ],
        answer: 2
    },
    {
        question: "Body language is an example of?",
        options: [
            "Verbal communication",
            "Non-verbal communication",
            "Written communication",
            "Technical communication"
        ],
        answer: 1
    },
    {
        question: "Empathy means?",
        options: [
            "Ignoring others",
            "Understanding others' feelings",
            "Arguing loudly",
            "Giving orders"
        ],
        answer: 1
    },
    {
        question: "Stress can affect human behavior by?",
        options: [
            "Improving memory always",
            "Changing mood and reactions",
            "Stopping communication",
            "Increasing height"
        ],
        answer: 1
    },
    {
        question: "Positive reinforcement helps to?",
        options: [
            "Encourage good behavior",
            "Punish mistakes",
            "Stop learning",
            "Reduce confidence"
        ],
        answer: 0
    },
    {
        question: "Peer pressure mostly influences?",
        options: [
            "Plants",
            "Animals only",
            "Human decisions",
            "Weather"
        ],
        answer: 2
    },
    {
        question: "Self-control helps a person to?",
        options: [
            "Act without thinking",
            "Manage emotions and actions",
            "Ignore responsibilities",
            "Avoid communication"
        ],
        answer: 1
    },
    {
        question: "Motivation is important because it?",
        options: [
            "Stops progress",
            "Drives goal achievement",
            "Reduces effort",
            "Causes confusion"
        ],
        answer: 1
    },
    {
        question: "Habits are formed through?",
        options: [
            "One-time action",
            "Repeated behavior",
            "Random thinking",
            "Sudden change"
        ],
        answer: 1
    }
];
const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Create timer display
const timerDisplay = document.createElement("h3");
quizBox.insertBefore(timerDisplay, questionElement);

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function shuffleQuestions() {
    quizData.sort(() => Math.random() - 0.5);
}
function startQuiz() {
    shuffleQuestions();  // shuffle questions every time

    currentQuestion = 0;
    score = 0;

    startBtn.parentElement.classList.add("hide");
    quizBox.classList.remove("hide");

    loadQuestion();
}

function loadQuestion() {
    resetState();
    startTimer();

    const data = quizData[currentQuestion];

    questionElement.innerText = data.question;

    // Combine options with their index
    let optionsArray = data.options.map((option, index) => {
        return { text: option, originalIndex: index };
    });

    // Shuffle options
    optionsArray.sort(() => Math.random() - 0.5);

    // Display shuffled options
    optionsArray.forEach((optionObj) => {
        const button = document.createElement("button");
        button.innerText = optionObj.text;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectAnswer(optionObj.originalIndex);
        });

        optionsElement.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    nextBtn.classList.add("hide");
    optionsElement.innerHTML = "";
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.innerText = "Time Left: " + timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = "Time Left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoNext();
        }
    }, 1000);
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);

    const correctIndex = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add("correct");
        }
        if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextBtn.classList.remove("hide");
}

function autoNext() {
    const correctIndex = quizData[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreElement.innerText = score + " / " + quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hide");
    startBtn.parentElement.classList.remove("hide");
}
const certificateBtn = document.getElementById("certificate-btn");

certificateBtn.onclick = function () {

    const studentName = prompt("Enter Student Name:");
    const department = prompt("Enter Department:");

    if (!studentName || !department) {
        alert("Please enter all details!");
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 700;

    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#fdf6e3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer Border
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Inner Border
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Title
    ctx.fillStyle = "#000";
    ctx.font = "bold 48px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", canvas.width / 2, 150);

    // Subtitle
    ctx.font = "24px Arial";
    ctx.fillText("This is to certify that", canvas.width / 2, 220);

    // Student Name
    ctx.font = "bold 40px Georgia";
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 280);

    // Department
    ctx.font = "24px Arial";
    ctx.fillText("from the Department of " + department, canvas.width / 2, 330);

    // Description
    ctx.font = "24px Arial";
    ctx.fillText(
        "has successfully completed the Interactive Quiz Application",
        canvas.width / 2,
        390
    );

    ctx.fillText(
        "with an outstanding performance.",
        canvas.width / 2,
        430
    );

    // Score
    ctx.font = "bold 26px Arial";
    ctx.fillText(
        "Final Score: " + score + " / " + quizData.length,
        canvas.width / 2,
        480
    );

    // Motivational Line
    ctx.font = "italic 22px Arial";
    ctx.fillText(
        "Keep Learning • Keep Growing • Keep Achieving",
        canvas.width / 2,
        530
    );

    // Signature Area
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Instructor Signature", 120, 630);
    ctx.textAlign = "right";
    ctx.fillText("Date: " + new Date().toLocaleDateString(), 880, 630);

    // Download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "Professional_Quiz_Certificate.png";
    link.click();
};