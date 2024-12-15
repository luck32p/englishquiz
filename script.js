// Sample vocabulary data
const vocabulary = [
    { english: 'add', translation: '加入' },
    { english: 'agree', translation: '同意、贊同' },
    { english: 'angry', translation: '生氣、憤怒的' },
    { english: 'arrive', translation: '到達、抵達、到來、到達點' },
    { english: 'attack', translation: '攻擊、襲擊、攻擊' },
    { english: 'bottom', translation: '底部、最下方、底下' },
    { english: 'clever', translation: '聰明的、靈巧的' },
    { english: 'cruel', translation: '殘酷的、殘忍的、兇殘的' },
    { english: 'finally', translation: '最後、終於' },
    { english: 'hide', translation: '躲藏、隱藏' },
    { english: 'hunt', translation: '打獵、狩獵' },
    { english: 'lot', translation: '很多、許多' },
    { english: 'middle', translation: '中間、中央、中心' },
    { english: 'moment', translation: '片刻、瞬間、時刻' },
    { english: 'pleased', translation: '高興、滿意的' },
    { english: 'promise', translation: '承諾、許諾' },
    { english: 'reply', translation: '回答' },
    { english: 'safe', translation: '安全的' },
    { english: 'shake', translation: '搖動、搖晃' },
    { english: 'spell', translation: '拼字、拼寫' },
    { english: 'surprise', translation: '驚訝、驚喜、驚奇的事物' },
    { english: 'tell', translation: '告訴、講述、說明、辨認' },
    { english: 'unusual', translation: '不尋常、特別的' },
    { english: 'worry', translation: '擔心、發愁' },
    { english: 'almost', translation: '幾乎、差不多、將近' },
    { english: 'bad', translation: '壞的、不好的、有害的' },
    { english: 'bear', translation: '忍受、承受、負擔' },
    { english: 'bright', translation: '明亮的、聰明的、歡快的' },
    { english: 'dance', translation: '跳舞、舞蹈' },
    { english: 'drive', translation: '開車、駕駛' },
    { english: 'guess', translation: '猜測、推測' },
    { english: 'list', translation: '清單、名單' },
    { english: 'opportunity', translation: '機會' },
    { english: 'pass', translation: '通過、經過' },
    { english: 'quit', translation: '放棄、離開' },
    { english: 'save', translation: '節省、儲蓄、拯救' }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

// DOM Elements
const vocabSection = document.getElementById('vocab-section');
const testSection = document.getElementById('test-section');
const startTestBtn = document.getElementById('start-test');
const showVocabBtn = document.getElementById('show-vocab');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timeLeftSpan = document.getElementById('time-left');
const scoreValue = document.getElementById('score-value');

// Initialize vocabulary list
function initVocabList() {
    const vocabList = document.getElementById('vocab-list');
    vocabList.innerHTML = '';
    vocabulary.forEach(item => {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        vocabItem.innerHTML = `
            <div class="english-word">${item.english}</div>
            <div class="translation">${item.translation}</div>
        `;
        vocabList.appendChild(vocabItem);
    });
}

// Start the test
function startTest() {
    currentQuestion = 0;
    score = 0;
    scoreValue.textContent = score;
    vocabSection.classList.add('hidden');
    testSection.classList.remove('hidden');
    showQuestion();
}

// Show a question
function showQuestion() {
    if (currentQuestion >= vocabulary.length) {
        endTest();
        return;
    }

    const current = vocabulary[currentQuestion];
    questionContainer.textContent = `What is the English word for "${current.translation}"?`;
    
    // Create options
    const options = generateOptions(current);
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option.english;
        button.onclick = () => checkAnswer(option.english === current.english, button);
        optionsContainer.appendChild(button);
    });

    // Start timer
    startTimer();
}

// Generate options for the question
function generateOptions(correct) {
    let options = [correct];
    while (options.length < 4) {
        const random = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        if (!options.find(opt => opt.english === random.english)) {
            options.push(random);
        }
    }
    return shuffleArray(options);
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start timer for question
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timeLeftSpan.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

// Handle timeout
function timeOut() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.textContent === vocabulary[currentQuestion].english) {
            option.classList.add('correct');
        }
    });
    setTimeout(nextQuestion, 1000);
}

// Check answer
function checkAnswer(isCorrect, button) {
    clearInterval(timer);
    
    if (isCorrect) {
        button.classList.add('correct');
        score++;
        scoreValue.textContent = score;
    } else {
        button.classList.add('incorrect');
        const correctButton = Array.from(document.querySelectorAll('.option')).find(
            opt => opt.textContent === vocabulary[currentQuestion].english
        );
        correctButton.classList.add('correct');
    }
    
    setTimeout(nextQuestion, 1000);
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// End the test
function endTest() {
    testSection.innerHTML = `
        <h2>Test Complete!</h2>
        <p>Your final score: ${score} out of ${vocabulary.length}</p>
    `;
}

// Event listeners
startTestBtn.addEventListener('click', startTest);
showVocabBtn.addEventListener('click', () => {
    testSection.classList.add('hidden');
    vocabSection.classList.remove('hidden');
});

// Initialize the app
initVocabList();
