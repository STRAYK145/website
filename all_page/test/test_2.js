const quizData = [
    {
        question: "Какой город является духовным центром России и входит в Золотое кольцо?",
        options: ["Ярославль", "Иваново", "Сергиев Посад", "Кострома"],
        answer: 2
    },
    {
        question: "Какой город называют городом-музеем под открытым небом?",
        options: ["Владимир", "Ростов Великий", "Суздаль", "Переславль-Залесский"],
        answer: 2
    },
    {
        question: "В каком городе расположен Ростовский кремль?",
        options: ["Ярославль", "Ростов Великий", "Владимир", "Кострома"],
        answer: 1
    },
    {
        question: "Какой город был столицей Владимиро-Суздальского княжества?",
        options: ["Суздаль", "Иваново", "Владимир", "Сергиев Посад"],
        answer: 2
    },
    {
        question: "Какой город расположен на слиянии рек Волги и Которосли?",
        options: ["Кострома", "Ростов Великий", "Ярославль", "Переславль-Залесский"],
        answer: 2
    },
    {
        question: "Какой город связан с династией Романовых?",
        options: ["Иваново", "Суздаль", "Кострома", "Владимир"],
        answer: 2
    },
    {
        question: "Какой город является родиной князя Александра Невского?",
        options: ["Ростов Великий", "Суздаль", "Ярославль", "Переславль-Залесский"],
        answer: 3
    },
    {
        question: "Какой город известен конструктивистской архитектурой?",
        options: ["Кострома", "Сергиев Посад", "Иваново", "Суздаль"],
        answer: 2
    },
    {
        question: "Какие памятники Владимира и Суздаля входят в список ЮНЕСКО?",
        options: ["Деревянные", "Белокаменные", "Барочные", "Готические"],
        answer: 1
    },
    {
        question: "Какой тип туризма преобладает на маршруте Золотого кольца?",
        options: ["Пляжный", "Экстремальный", "Экскурсионный и познавательный", "Горнолыжный"],
        answer: 2
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
