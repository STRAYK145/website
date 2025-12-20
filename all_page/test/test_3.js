const quizData = [
    {
        question: "Какой природный объект является символом Камчатки?",
        options: ["Вулканы", "Пустыни", "Степи", "Ледники Кавказа"],
        answer: 0
    },
    {
        question: "Как называется знаменитая долина с гейзерами на Камчатке?",
        options: ["Долина гейзеров", "Долина вулканов", "Камчатская впадина", "Авачинская долина"],
        answer: 0
    },
    {
        question: "Какой вулкан является одним из самых активных на Камчатке?",
        options: ["Ключевская Сопка", "Эльбрус", "Белуха", "Ай-Петри"],
        answer: 0
    },
    {
        question: "Какой вид туризма наиболее развит на Камчатке?",
        options: ["Экологический и экстремальный", "Пляжный", "Экскурсионный городской", "Деловой"],
        answer: 0
    },
    {
        question: "Какое природное явление можно наблюдать в горячих источниках Камчатки?",
        options: ["Термальные воды", "Северное сияние", "Песчаные бури", "Приливы"],
        answer: 0
    },
    {
        question: "Какое животное является одним из символов Камчатки?",
        options: ["Бурый медведь", "Белый медведь", "Тигр", "Верблюд"],
        answer: 0
    },
    {
        question: "Какой океан омывает побережье Камчатки?",
        options: ["Тихий океан", "Северный Ледовитый океан", "Атлантический океан", "Индийский океан"],
        answer: 0
    },
    {
        question: "Как называется крупнейший город Камчатского края?",
        options: ["Петропавловск-Камчатский", "Магадан", "Южно-Сахалинск", "Хабаровск"],
        answer: 0
    },
    {
        question: "Какой вид активного отдыха популярен на Камчатке?",
        options: ["Восхождение на вулканы", "Сафари", "Парусный спорт", "Дайвинг в тропиках"],
        answer: 0
    },
    {
        question: "Почему Камчатку называют регионом дикой природы?",
        options: [
            "Большие территории практически не затронуты человеком",
            "Отсутствуют города",
            "Регион полностью покрыт льдами",
            "Здесь нет дорог"
        ],
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
