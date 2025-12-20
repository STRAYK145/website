const quizData = [
    {
        question: "Какой город является духовным центром России и входит в Золотое кольцо?",
        options: ["Сергиев Посад", "Ярославль", "Кострома", "Иваново"],
        answer: 0
    },
    {
        question: "Какой город называют городом-музеем под открытым небом?",
        options: ["Суздаль", "Владимир", "Ростов Великий", "Переславль-Залесский"],
        answer: 0
    },
    {
        question: "В каком городе расположен Ростовский кремль?",
        options: ["Ростов Великий", "Ярославль", "Кострома", "Владимир"],
        answer: 0
    },
    {
        question: "Какой город был столицей Владимиро-Суздальского княжества?",
        options: ["Владимир", "Суздаль", "Иваново", "Сергиев Посад"],
        answer: 0
    },
    {
        question: "Какой город расположен на слиянии рек Волги и Которосли?",
        options: ["Ярославль", "Кострома", "Ростов Великий", "Переславль-Залесский"],
        answer: 0
    },
    {
        question: "Какой город связан с династией Романовых?",
        options: ["Кострома", "Иваново", "Суздаль", "Владимир"],
        answer: 0
    },
    {
        question: "Какой город является родиной князя Александра Невского?",
        options: ["Переславль-Залесский", "Ростов Великий", "Суздаль", "Ярославль"],
        answer: 0
    },
    {
        question: "Какой город известен конструктивистской архитектурой?",
        options: ["Иваново", "Кострома", "Сергиев Посад", "Суздаль"],
        answer: 0
    },
    {
        question: "Какие памятники Владимира и Суздаля входят в список ЮНЕСКО?",
        options: ["Белокаменные", "Деревянные", "Готические", "Барочные"],
        answer: 0
    },
    {
        question: "Какой тип туризма преобладает на маршруте Золотого кольца?",
        options: ["Экскурсионный и познавательный", "Пляжный", "Горнолыжный", "Экстремальный"],
        answer: 0
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
