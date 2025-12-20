const quizData = [
    {
        question: "Какой регион России славится многочисленными озёрами и водопадами?",
        options: ["Алтай", "Карелия", "Сочи", "Байкал"],
        answer: 1
    },
    {
        question: "Какой город Карелии известен крепостью и историческим центром?",
        options: ["Костомукша", "Петрозаводск", "Олонец", "Сортавала"],
        answer: 1
    },
    {
        question: "Какое озеро является крупнейшим в Карелии?",
        options: ["Селигер", "Ильмень", "Онежское", "Ладожское"],
        answer: 2
    },
    {
        question: "Какой город знаменит музеем-заповедником «Кижи»?",
        options: ["Сортавала", "Петрозаводск", "Медвежьегорск", "Кижи"],
        answer: 3
    },
    {
        question: "Где в Карелии можно увидеть живописные скалы и каньоны?",
        options: ["Петрозаводск", "Рускеала", "Олонец", "Сортавала"],
        answer: 1
    },
    {
        question: "Какой город Карелии находится на побережье Ладожского озера?",
        options: ["Кондопога", "Медвежьегорск", "Сортавала", "Петрозаводск"],
        answer: 2
    },
    {
        question: "Какое озеро Карелии знаменитое своими кристально чистыми водами?",
        options: ["Ладожское", "Селигер", "Онежское", "Ильмень"],
        answer: 2
    },
    {
        question: "Где расположен природный парк с известняковыми пещерами и водопадами?",
        options: ["Кондопога", "Рускеала", "Кижи", "Сортавала"],
        answer: 1
    },
    {
        question: "Какой город Карелии является административным центром республики?",
        options: ["Кондопога", "Костомукша", "Петрозаводск", "Сортавала"],
        answer: 2
    },
    {
        question: "Какой вид туризма особенно популярен в Карелии?",
        options: ["Пляжный", "Экотуризм и походы по озёрам", "Деловой", "Горнолыжный"],
        answer: 1
    }
];


let currentQuestion = 0;
let userAnswers = [];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const scoreEl = document.getElementById('score');
const reviewEl = document.getElementById('review');

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'form-check mb-2';
        div.innerHTML = `
            <input class="form-check-input" type="radio" name="option" id="option${index}" value="${index}">
            <label class="form-check-label" for="option${index}">
                ${option}
            </label>
        `;
        optionsEl.appendChild(div);
    });
}

nextBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert('Пожалуйста, выберите ответ!');
        return;
    }

    userAnswers.push(parseInt(selected.value));
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.classList.add('d-none');
    resultContainer.classList.remove('d-none');

    let correctCount = 0;
    quizData.forEach((q, i) => {
        if (q.answer === userAnswers[i]) correctCount++;
    });

    scoreEl.textContent = `Вы ответили правильно на ${correctCount} из ${quizData.length} вопросов.`;

    reviewEl.innerHTML = '';
    quizData.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'mb-3 p-3 border rounded';
        div.innerHTML = `<strong>Вопрос ${i + 1}:</strong> ${q.question}<br>`;

        q.options.forEach((opt, idx) => {
            let text = opt;
            if (idx === q.answer) text += " ✅";
            if (idx === userAnswers[i] && idx !== q.answer) text += " ❌";
            div.innerHTML += `<div>${text}</div>`;
        });

        reviewEl.appendChild(div);
    });
}

// Загрузка первого вопроса
loadQuestion();
