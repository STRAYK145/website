const quizData = [
    {
        question: "Какой город известен Олимпийским парком и Красной Поляной?",
        options: ["Сочи", "Казань", "Владимир", "Карелия"],
        answer: 0
    },
    {
        question: "Какая область России славится историческими городами Суздаль, Владимир, Ярославль?",
        options: ["Золотое кольцо", "Алтай", "Камчатка", "Сочи"],
        answer: 0
    },
    {
        question: "Где можно увидеть вулканы и гейзеры в России?",
        options: ["Камчатка", "Карелия", "Сочи", "Казань"],
        answer: 0
    },
    {
        question: "Где расположены многочисленные озёра и водопады на северо-западе России?",
        options: ["Карелия", "Алтай", "Байкал", "Владимир"],
        answer: 0
    },
    {
        question: "Какой город известен Белыми ночами и Эрмитажем?",
        options: ["Санкт-Петербург", "Москва", "Казань", "Сочи"],
        answer: 0
    },
    {
        question: "Где находятся горные маршруты и экологический туризм Алтая?",
        options: ["Алтай", "Карелия", "Камчатка", "Золотое кольцо"],
        answer: 0
    },
    {
        question: "Какое озеро является крупнейшим пресноводным в мире?",
        options: ["Байкал", "Ладога", "Онега", "Селигер"],
        answer: 0
    },
    {
        question: "Какая столица России известна Кремлём и Красной площадью?",
        options: ["Москва", "Санкт-Петербург", "Казань", "Сочи"],
        answer: 0
    },
    {
        question: "В каком регионе России проходят зимние олимпийские игры 2014 года?",
        options: ["Сочи", "Казань", "Санкт-Петербург", "Владимир"],
        answer: 0
    },
    {
        question: "Где можно заняться каякингом и походами среди озёр и лесов?",
        options: ["Карелия", "Камчатка", "Алтай", "Байкал"],
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
            <label class="form-check-label" for="option${index}">${option}</label>
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
        div.innerHTML = `<strong>Вопрос ${i+1}:</strong> ${q.question}<br>`;
        q.options.forEach((opt, idx) => {
            let text = opt;
            if (idx === q.answer) text += " ✅"; // правильный вариант
            if (idx === userAnswers[i] && idx !== q.answer) text += " ❌"; // выбранный неверный
            div.innerHTML += `<div>${text}</div>`;
        });
        reviewEl.appendChild(div);
    });
}

// Загрузка первого вопроса при старте
loadQuestion();