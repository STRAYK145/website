const quizData = [
    {
        question: "Какой природный объект является символом Камчатки?",
        options: ["Пустыни", "Вулканы", "Ледники Кавказа", "Степи"],
        answer: 1
    },
    {
        question: "Как называется знаменитая долина с гейзерами на Камчатке?",
        options: ["Авачинская долина", "Долина вулканов", "Долина гейзеров", "Камчатская впадина"],
        answer: 2
    },
    {
        question: "Какой вулкан является одним из самых активных на Камчатке?",
        options: ["Эльбрус", "Ключевская Сопка", "Ай-Петри", "Белуха"],
        answer: 1
    },
    {
        question: "Какой вид туризма наиболее развит на Камчатке?",
        options: ["Пляжный", "Экскурсионный городской", "Экологический и экстремальный", "Деловой"],
        answer: 2
    },
    {
        question: "Какое природное явление можно наблюдать в горячих источниках Камчатки?",
        options: ["Северное сияние", "Приливы", "Термальные воды", "Песчаные бури"],
        answer: 2
    },
    {
        question: "Какое животное является одним из символов Камчатки?",
        options: ["Тигр", "Бурый медведь", "Верблюд", "Белый медведь"],
        answer: 1
    },
    {
        question: "Какой океан омывает побережье Камчатки?",
        options: ["Атлантический океан", "Тихий океан", "Индийский океан", "Северный Ледовитый океан"],
        answer: 1
    },
    {
        question: "Как называется крупнейший город Камчатского края?",
        options: ["Хабаровск", "Магадан", "Петропавловск-Камчатский", "Южно-Сахалинск"],
        answer: 2
    },
    {
        question: "Какой вид активного отдыха популярен на Камчатке?",
        options: ["Сафари", "Парусный спорт", "Восхождение на вулканы", "Дайвинг в тропиках"],
        answer: 2
    },
    {
        question: "Почему Камчатку называют регионом дикой природы?",
        options: [
            "Здесь нет дорог",
            "Регион полностью покрыт льдами",
            "Большие территории практически не затронуты человеком",
            "Отсутствуют города"
        ],
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
