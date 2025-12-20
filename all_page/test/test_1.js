const quizData = [
    {
        question: "Какой город является главным курортом Черноморского побережья России?",
        options: ["Анапа", "Геленджик", "Сочи", "Туапсе"],
        answer: 2
    },
    {
        question: "В каком году в Сочи прошли зимние Олимпийские игры?",
        options: ["2008", "2014", "2018", "2020"],
        answer: 1
    },
    {
        question: "Как называется горный курорт рядом с Сочи, популярный для зимнего отдыха?",
        options: ["Домбай", "Архыз", "Эльбрус", "Красная Поляна"],
        answer: 3
    },
    {
        question: "Какое море омывает побережье Сочи?",
        options: ["Азовское", "Каспийское", "Чёрное", "Балтийское"],
        answer: 2
    },
    {
        question: "Какой природный объект находится в Сочинском национальном парке?",
        options: ["Ленские столбы", "Агурские водопады", "Долина гейзеров", "Кунгурская пещера"],
        answer: 1
    },
    {
        question: "Какой климат характерен для побережья Сочи?",
        options: ["Умеренно-континентальный", "Арктический", "Субтропический", "Резко континентальный"],
        answer: 2
    },
    {
        question: "Как называется известный олимпийский объект в прибрежной части Сочи?",
        options: ["Олимпийский парк", "Лужники", "Газпром Арена", "Фишт Парк"],
        answer: 0
    },
    {
        question: "Какой вид отдыха наиболее популярен летом на Черноморском побережье?",
        options: ["Горнолыжный", "Пляжный", "Сафари", "Полярный туризм"],
        answer: 1
    },
    {
        question: "Какой город НЕ относится к Черноморскому побережью России?",
        options: ["Новороссийск", "Сочи", "Ростов-на-Дону", "Геленджик"],
        answer: 2
    },
    {
        question: "Какое растение является символом субтропической природы Сочи?",
        options: ["Берёза", "Пальма", "Ель", "Кедр"],
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