const questions = [
    { question: "Dari daerah mana Tari Saman berasal?", options: ["Aceh", "Bali", "Jawa Tengah"], correct: 0 },
    { question: "Rumah adat Tongkonan berasal dari?", options: ["Sunda", "Minang", "Toraja"], correct: 2 },
    { question: "Alat musik tradisional Angklung berasal dari provinsi?", options: ["Jawa Barat", "Jawa Tengah", "Sumatra Utara"], correct: 0 },
    { question: "Upacara Ngaben merupakan tradisi adat dari?", options: ["Lombok", "Bali", "Papua"], correct: 1 },
    { question: "Batik yang terkenal dengan motif Megamendung berasal dari?", options: ["Pekalongan", "Solo", "Cirebon"], correct: 2 },
    { question: "Reog Ponorogo merupakan seni tradisonal dari provinsi?", options: ["Jawa Timur", "Jawa Barat", "Sumatera Barat"], correct: 1 },
    { question: "Wayang kulit biasa dipertunjukan dengan alat musik?", options: ["Gamelan", "Angklung", "Kolintang"], correct: 2 },
    {
        question: "Tebak gambar ini adalah rumah adat dari daerah mana?",
        image: "rumah_gadang.png.jpg", // TAMBAHAN
        options: ["Sumatera Barat", "Sulawesi Selatan", "Kalimantan Tengah"],
        correct: 0
    },
    {
        question: "Alat musik tradisional apakah ini?",
        image: "sasando.png.png", // TAMBAHAN
        options: ["Sasando", "Tifa", "Gendang"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let timeLeft = 45; // Timer mulai dari 45 detik
let timer;
let score = 0; // Track the score

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = `${timeLeft} detik`;
        } else {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    // Reset the timer
    timeLeft = 45;
    document.getElementById("timer").innerText = `${timeLeft} detik`;
    startTimer();

    const q = questions[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").style.opacity = "0";
    document.getElementById("nextBtn").disabled = true;
    
    if (q.image) {
        const img =
        document.createElement("img");
        img.src = q.image;
        img.alt = "Gambar soal";
        img.style.maxWidth = "300%";
        img.style.borderRadius = "30px";
        img.classList.add("mb-3");
        optionsContainer.appendChild(img);
    }



    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-outline-primary");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const q = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");
    if (selectedIndex === q.correct) {
        feedback.innerText = "Jawaban Benar!";
        feedback.classList.add("text-success");
        score++; // Increase score if correct
    } else {
        feedback.innerText = "Jawaban Salah!";
        feedback.classList.add("text-danger");
    }
    feedback.style.opacity = "1";
    document.getElementById("nextBtn").disabled = false;
}

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        // Move to the next question
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // End the quiz if no more questions
        endQuiz();
    }
});

function endQuiz() {
    // Disable the next button and show the final score
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("feedback").innerText = `Waktu Habis atau Kuis Selesai! Skor Anda: ${score}`;
    document.getElementById("feedback").classList.add("text-primary");
    document.getElementById("timer").innerText = "0 detik";
}

// Start the quiz by loading the first question
loadQuestion();
