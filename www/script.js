// State
const state = {
    currentTextbook: null,
    currentGrade: null,
    selectedUnits: [],
    quizQuestions: [],
    currentQuestionIndex: 0,
    score: 0
};

// DOM Elements
const screens = {
    setup: document.getElementById('setup-screen'),
    unitSelection: document.getElementById('unit-selection-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

// --- Initialization & Setup ---
// --- Initialization & Setup ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadUsers(); // Fix: Load users from storage first
        loadState();
        setupEventListeners();
    } catch (e) {
        alert("エラーが発生しました: " + e.message);
        console.error(e);
    }
});

function setupEventListeners() {
    // Textbook Selection
    document.querySelectorAll('.textbook-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectTextbook(btn.dataset.textbook);
        });
    });

    // Grade Selection
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectGrade(btn.dataset.grade);
        });
    });

    // Navigation
    document.getElementById('back-to-setup').addEventListener('click', () => {
        showScreen('setup');
    });

    document.getElementById('goto-unit-btn').addEventListener('click', () => {
        renderUnitSelection();
        showScreen('unitSelection');
    });

    // Removed duplicate listener for back-to-setup

    document.getElementById('start-choice-btn').addEventListener('click', () => startQuiz('choice'));
    document.getElementById('start-sort-btn').addEventListener('click', () => startQuiz('sort'));
    document.getElementById('quit-quiz-btn').addEventListener('click', () => {
        // Reset quiz state logic here if needed, or just go back
        showScreen('unitSelection');
    });
    document.getElementById('audio-btn').addEventListener('click', playCurrentWordAudio);

    // Result
    document.getElementById('retry-btn').addEventListener('click', () => {
        if (state.lastQuizType) startQuiz(state.lastQuizType);
        else showScreen('unitSelection'); // Fallback
    });
    document.getElementById('back-to-units-btn').addEventListener('click', () => showScreen('unitSelection'));

    // --- Cycle 9: Footer & User Listeners ---
    document.getElementById('nav-calendar-btn').addEventListener('click', () => {
        renderCalendar(new Date());
        toggleModal('calendar-modal', true);
    });

    document.getElementById('close-calendar-modal').addEventListener('click', () => toggleModal('calendar-modal', false));
    window.addEventListener('click', (e) => {
        if (e.target.id === 'calendar-modal') toggleModal('calendar-modal', false);
    });

    document.getElementById('prev-month-btn').addEventListener('click', () => offsetCalendarMonth(-1));
    document.getElementById('next-month-btn').addEventListener('click', () => offsetCalendarMonth(1));

    document.getElementById('nav-user-btn').addEventListener('click', (e) => {
        // Toggle user menu
        const menu = document.getElementById('user-menu-popup');
        menu.classList.toggle('hidden');
        e.stopPropagation(); // prevent window click from closing immediately logic if implemented
    });

    // Close user menu if clicked outside
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.user-nav-container')) {
            document.getElementById('user-menu-popup').classList.add('hidden');
        }
    });

    document.getElementById('add-new-user-btn').addEventListener('click', addNewUser);

    document.getElementById('nav-stats-btn').addEventListener('click', () => {
        renderStats();
        showScreen('statsScreen');
    });

    // Usage Guide (Cycle 11)
    const usageBtn = document.getElementById('usage-guide-btn');
    if (usageBtn) {
        usageBtn.addEventListener('click', () => toggleModal('usage-modal', true));
    }

    document.getElementById('back-from-stats').addEventListener('click', () => {
        // Return to unit selection usually? Or last screen. 
        // User asked for "Back" button.
        showScreen('unitSelection');
    });

    document.getElementById('stats-textbook-select').addEventListener('change', renderStats);
    document.getElementById('stats-grade-select').addEventListener('change', renderStats);
}

// --- Navigation Logic ---
function showScreen(screenName) {
    const screensMap = {
        setup: document.getElementById('setup-screen'),
        unitSelection: document.getElementById('unit-selection-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen'),
        statsScreen: document.getElementById('stats-screen') // New
    };

    Object.values(screensMap).forEach(s => {
        if (s) {
            s.classList.remove('active');
            s.classList.add('hidden');
        }
    });

    if (screensMap[screenName]) {
        screensMap[screenName].classList.remove('hidden');
        screensMap[screenName].classList.add('active');
    }
}

function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
}

// --- User Management ---
let users = ['Guest'];
let currentUser = 'Guest';

function loadUsers() {
    const storedUsers = localStorage.getItem('sakusaku_users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        users = ['Guest'];
        localStorage.setItem('sakusaku_users', JSON.stringify(users));
    }

    const storedCurrent = localStorage.getItem('sakusaku_current_user');
    if (storedCurrent && users.includes(storedCurrent)) {
        currentUser = storedCurrent;
    } else {
        currentUser = 'Guest';
        localStorage.setItem('sakusaku_current_user', currentUser);
    }

    updateUserUI();
    renderUserList();
}

function updateUserUI() {
    document.getElementById('current-user-name').textContent = currentUser;
}

function renderUserList() {
    const list = document.getElementById('user-list');
    list.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = u;
        if (u === currentUser) li.classList.add('current');
        li.addEventListener('click', () => switchUser(u));
        list.appendChild(li);
    });
}

function switchUser(name) {
    currentUser = name;
    localStorage.setItem('sakusaku_current_user', currentUser);
    updateUserUI();
    renderUserList();
    document.getElementById('user-menu-popup').classList.add('hidden');

    // Reload State for this user
    loadState();
    // Maybe go back to setup?
    showScreen('setup');
    alert(`${currentUser} さんに切り替えました。`);
}

function addNewUser() {
    const name = prompt("新しいユーザー名を入力してください:");
    if (name && name.trim()) {
        if (users.includes(name)) {
            alert("その名前は既に存在します。");
            return;
        }
        users.push(name);
        localStorage.setItem('sakusaku_users', JSON.stringify(users));
        switchUser(name);
    }
}

// --- Selection Logic ---
// ... (Previous Selection Logic is fine, just need to ensure saveState uses currentUser)

// --- Persistence Overrides ---
function saveState() {
    if (!currentUser) return;
    const dataToSave = {
        currentTextbook: state.currentTextbook,
        currentGrade: state.currentGrade,
        selectedUnits: state.selectedUnits
    };
    localStorage.setItem(`sakusaku_state_${currentUser}`, JSON.stringify(dataToSave));
}

function loadState() {
    // Reset defaults first
    state.currentTextbook = null;
    state.currentGrade = null;
    state.selectedUnits = [];

    // Reset UI
    document.querySelectorAll('.textbook-btn, .grade-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('grade-selection').classList.add('hidden');
    updateGotoButton();

    if (!currentUser) loadUsers(); // Ensure users loaded

    const saved = localStorage.getItem(`sakusaku_state_${currentUser}`);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);

            // Restore context
            if (parsed.currentTextbook) selectTextbook(parsed.currentTextbook);
            if (parsed.currentGrade) selectGrade(parsed.currentGrade);

            // Restore selections
            state.selectedUnits = parsed.selectedUnits || [];

            // Refreshes checkboxes if on unit screen, but we might be on setup
            // We'll rely on renderUnitSelection called by user navigation
        } catch (e) {
            console.error("Failed to load user state", e);
        }
    }
}

// --- Activity & Progress Tracking ---
function saveActivityCount(count) {
    if (!currentUser) return;
    const key = `sakusaku_activity_${currentUser}`;
    const today = new Date().toISOString().split('T')[0];
    let data = JSON.parse(localStorage.getItem(key) || '{}');

    data[today] = (data[today] || 0) + count;
    localStorage.setItem(key, JSON.stringify(data));
}

function saveProgress(unitIndex, mode, wordEn) {
    // progress_User = { textbook_grade_unit: { choice: [word...], sort: [word...] } }
    if (!currentUser || !state.currentTextbook || !state.currentGrade) return;

    const key = `sakusaku_progress_${currentUser}`;
    let data = JSON.parse(localStorage.getItem(key) || '{}');

    // Unique key for unit: "new_crown_1_0" (textbook_grade_unitIndex)
    const unitKey = `${state.currentTextbook}_${state.currentGrade}_${unitIndex}`;

    if (!data[unitKey]) data[unitKey] = { choice: [], sort: [] };

    const modeKey = (mode === 'choice') ? 'choice' : 'sort';

    // Add word if not exists
    if (!data[unitKey][modeKey].includes(wordEn)) {
        data[unitKey][modeKey].push(wordEn);
    }

    localStorage.setItem(key, JSON.stringify(data));
}

// --- Calendar Logic ---
let calendarDate = new Date();

function offsetCalendarMonth(offset) {
    calendarDate.setMonth(calendarDate.getMonth() + offset);
    renderCalendar(calendarDate);
}

function renderCalendar(date) {
    const grid = document.getElementById('calendar-grid');
    const label = document.getElementById('calendar-month-label');
    if (!grid || !label) return;

    grid.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();
    label.textContent = `${year}年 ${month + 1}月`;

    // Get activity data
    const key = `sakusaku_activity_${currentUser}`;
    const activity = JSON.parse(localStorage.getItem(key) || '{}');
    const todayStr = new Date().toISOString().split('T')[0];

    // Days calc
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    days.forEach(d => {
        const div = document.createElement('div');
        div.className = 'calendar-cell calendar-header';
        div.textContent = d;
        grid.appendChild(div);
    });

    // Empties
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-cell';
        grid.appendChild(div);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const div = document.createElement('div');
        div.className = 'calendar-cell';

        const dStr = d.toString().padStart(2, '0');
        const mStr = (month + 1).toString().padStart(2, '0');
        const fullDate = `${year}-${mStr}-${dStr}`;

        div.innerHTML = `<div class="calendar-day-num">${d}</div>`;

        if (activity[fullDate]) {
            div.innerHTML += `<div class="calendar-count">${activity[fullDate]}</div>`;
            div.style.backgroundColor = '#e8f5e9'; // Light green
        }

        if (fullDate === todayStr) {
            div.classList.add('calendar-today');
        }

        grid.appendChild(div);
    }
}

// --- Stats Logic ---
function renderStats() {
    try {
        console.log("renderStats called");
        const textbookSelect = document.getElementById('stats-textbook-select');
        const gradeSelect = document.getElementById('stats-grade-select');

        let textbook = textbookSelect.value;
        let grade = gradeSelect.value;

        // If not set in select (e.g. empty?), fallback to state or defaults
        if (!textbook) textbook = state.currentTextbook || 'new_crown';
        if (!grade) grade = state.currentGrade || '1';

        console.log(`Stats for: ${textbook} ${grade}`);

        // Update selectors to match what we are showing
        textbookSelect.value = textbook;
        gradeSelect.value = grade;

        const container = document.getElementById('stats-content');
        if (!container) {
            console.error("stats-content container not found");
            return;
        }
        container.innerHTML = '';

        if (typeof vocabularyData === 'undefined') {
            container.innerHTML = '<p>データが見つかりません (vocabularyData missing)</p>';
            return;
        }

        if (!vocabularyData[textbook]) {
            container.innerHTML = `<p>データがありません (Textbook: ${textbook} not found)</p>`;
            return;
        }

        if (!vocabularyData[textbook][grade]) {
            container.innerHTML = `<p>データがありません (Grade: ${grade} not found)</p>`;
            return;
        }

        // Get Progress Data
        const key = `sakusaku_progress_${currentUser}`;
        let progressData;
        try {
            progressData = JSON.parse(localStorage.getItem(key) || '{}');
        } catch (e) {
            console.error("Error parsing progress data", e);
            progressData = {};
        }

        const units = vocabularyData[textbook][grade];

        units.forEach((unit, idx) => {
            const card = document.createElement('div');
            card.className = 'stats-card';

            const unitKey = `${textbook}_${grade}_${idx}`;
            const unitProgress = progressData[unitKey] || { choice: [], sort: [] };

            // Calculate %
            const totalWords = unit.words ? unit.words.length : 0;
            const choiceCount = (unitProgress.choice && Array.isArray(unitProgress.choice)) ? unitProgress.choice.length : 0;
            const sortCount = (unitProgress.sort && Array.isArray(unitProgress.sort)) ? unitProgress.sort.length : 0;

            const choicePct = totalWords > 0 ? (choiceCount / totalWords * 100).toFixed(0) : 0;
            const sortPct = totalWords > 0 ? (sortCount / totalWords * 100).toFixed(0) : 0;

            card.innerHTML = `
                <div class="stats-unit-title">${unit.unit}</div>
                
                <div class="progress-row">
                    <div class="progress-label">三択</div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${choicePct}%"></div>
                    </div>
                    <div class="progress-text">${choicePct}%</div>
                </div>
                
                <div class="progress-row">
                    <div class="progress-label">並べ替え</div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill sort" style="width: ${sortPct}%"></div>
                    </div>
                    <div class="progress-text">${sortPct}%</div>
                </div>
            `;

            container.appendChild(card);
        });
        console.log("renderStats completed");
    } catch (e) {
        console.error("Error in renderStats:", e);
        const container = document.getElementById('stats-content');
        if (container) container.innerHTML = `<p>エラーが発生しました: ${e.message}</p>`;
        alert("学習記録の表示中にエラーが発生しました。\n" + e.message);
    }
}

// --- Update Quiz Answer Check to Save Progress ---
// We need to inject logic into checkAnswerChoice and checkAnswerSort
// Since we are replacing the bottom of the file, we should overwrite them if possible
// or append modified versions. 
// Since replace_file_content replaces a block, let's redefine them here if the previous block included them.
// Wait, the previous block I replaced ended at line 676 (end of file).
// But checkAnswerChoice start at line 539. 
// So I need to include those functions in my replacement OR use multi_replace to target them specifically.
// The current replacement targets line 65-676... wait.
// My TargetContent in the previous tool call was based on lines 65-71, the event listeners.
// So I am replacing everything from setupEventListeners downwards!
// That's HUGE. `checkAnswerChoice` is part of that.
// I MUST ensure I include `checkAnswerChoice` and `checkAnswerSort` logic in this replacement or else I lose the quiz logic!

// ... REWRITING CHECK ANSWERS TO INCLUDE SAVING ...

function checkAnswerChoice(btn, selectedAnswer, question) {
    const feedbackArea = document.getElementById('feedback-area');
    const msg = document.getElementById('feedback-message');
    const expl = document.getElementById('feedback-explanation');
    const nextBtn = document.getElementById('next-question-btn');

    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

    if (selectedAnswer === question.answer) {
        btn.classList.add('correct');
        msg.textContent = '正解！ Correct!';
        msg.style.color = 'var(--primary-color)';
        state.score++;
        playAudio(true);

        // Save Progress
        saveActivityCount(1);
        saveProgress(question.correctWord.unitIndex, 'choice', question.correctWord.en);
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.choice-btn').forEach(b => {
            if (b.textContent === question.answer) b.classList.add('correct');
        });
        msg.textContent = '残念... Wrong!';
        msg.style.color = 'var(--error-color)';

        // Save activity count? User: "Solved total". Does incorrect count? usually "solved" implies correct.
        // Let's count attempts? "本日解いた総数" (Total solved today). Solved usually means correct.
        // Reference app counts attempts. 
        // I'll count attempts (activity count) regardless of result? Or just correct?
        // Reference app: `saveActivity(1)` called at end of submit.
        saveActivityCount(1);
    }

    expl.textContent = `${question.correctWord.en} = ${question.correctWord.jp}`;
    feedbackArea.classList.remove('hidden');
    nextBtn.onclick = nextQuestion;
}

function checkAnswerSort(question) {
    const feedbackArea = document.getElementById('feedback-area');
    const msg = document.getElementById('feedback-message');
    const expl = document.getElementById('feedback-explanation');
    const nextBtn = document.getElementById('next-question-btn');
    const actionBtn = document.getElementById('sort-answer-btn');

    let constructed = '';
    const answerStr = question.answer;
    for (let i = 0; i < answerStr.length; i++) {
        if (answerStr[i] === ' ') constructed += ' ';
        else {
            const item = state.sortCurrentState[i];
            constructed += item ? item.char : '_';
        }
    }

    const isCorrect = constructed === question.answer;
    actionBtn.style.display = 'none';

    if (isCorrect) {
        msg.textContent = '正解！ Perfect!';
        msg.style.color = 'var(--primary-color)';
        state.score++;

        saveActivityCount(1);
        saveProgress(question.correctWord.unitIndex, 'sort', question.correctWord.en);
    } else {
        msg.textContent = `正解は: ${question.answer}`;
        msg.style.color = 'var(--error-color)';
        saveActivityCount(1);
    }

    expl.textContent = `${question.correctWord.en} = ${question.correctWord.jp}`;
    feedbackArea.classList.remove('hidden');
    nextBtn.onclick = nextQuestion;
}

// Re-include other functions I might be overwriting...
// I replaced from line 65.
// So I need `showScreen`, `selectTextbook`, `selectGrade`, `updateGotoButton`, `renderUnitSelection`, `updateStartButton`,
// `saveState` (overwritten), `loadState` (overwritten), `startQuiz`, `generateQuestionDisplay`, `createType1`, `getDistractors`,
// `createType2`, `renderQuestion`, `renderSortButtons`, `isCharUsed`, `useChar`, `returnCharToPool`, `updateSortSlots`,
// `checkAnswer...`, `nextQuestion`, `showResult`, `shuffleArray`, `playAudio`, `playCurrentWordAudio`.

// This is too big for one replace call if I have to re-write 600 lines.
// I should use `multi_replace_file_content` to splice in the changes surgically.

// 1. Add Listener logic (insert at end of setupEventListeners)
// 2. Add Helper functions (append to end of file).
// 3. Modify `loadState` / `saveState` (replace existing).
// 4. Modify `checkAnswer...` (replace existing).



// --- Navigation Logic ---
function showScreen(screenName) {
    try {
        console.log(`showScreen called for: ${screenName}`);

        // Screens Map Check
        const screensMap = {
            setup: document.getElementById('setup-screen'),
            unitSelection: document.getElementById('unit-selection-screen'),
            quiz: document.getElementById('quiz-screen'),
            result: document.getElementById('result-screen'),
            statsScreen: document.getElementById('stats-screen')
        };

        // Log map status for debugging
        if (screenName === 'statsScreen' && !screensMap.statsScreen) {
            console.error("CRITICAL: stats-screen element NOT found in DOM!");
            alert("Internal Error: stats-screen broken.");
            return;
        }

        Object.values(screensMap).forEach(s => {
            if (s) {
                s.classList.remove('active');
                s.classList.add('hidden');
            }
        });

        if (screensMap[screenName]) {
            screensMap[screenName].classList.remove('hidden');
            screensMap[screenName].classList.add('active');
            console.log(`Screen ${screenName} activated.`);
        } else {
            console.error(`Screen ${screenName} not found in map.`);
        }
    } catch (e) {
        console.error("showScreen failed:", e);
    }
}

// ... toggleModal ...

// --- Stats Logic ---
function renderStats() {
    try {
        console.log("renderStats: START");
        const textbookSelect = document.getElementById('stats-textbook-select');
        const gradeSelect = document.getElementById('stats-grade-select');

        // Safety check for elements
        if (!textbookSelect || !gradeSelect) {
            throw new Error("Stats selectors missing from DOM");
        }

        let textbook = textbookSelect.value;
        let grade = gradeSelect.value;

        if (!textbook) textbook = state.currentTextbook || 'new_crown';
        if (!grade) grade = state.currentGrade || '1';

        console.log(`renderStats: Target ${textbook} ${grade}`);

        // Update selectors
        textbookSelect.value = textbook;
        gradeSelect.value = grade;

        const container = document.getElementById('stats-content');
        if (!container) throw new Error("stats-content missing");
        container.innerHTML = '';

        if (typeof vocabularyData === 'undefined') {
            container.innerHTML = '<p>Data not loaded</p>';
            return;
        }

        if (!vocabularyData[textbook]) {
            container.innerHTML = `<p>Not found: ${textbook}</p>`;
            return;
        }

        if (!vocabularyData[textbook][grade]) {
            container.innerHTML = `<p>Not found: Grade ${grade}</p>`;
            return;
        }

        // Get Progress Data
        const key = `sakusaku_progress_${currentUser}`;
        console.log(`renderStats: Loading progress from ${key}`);

        let progressData = {};
        try {
            const raw = localStorage.getItem(key);
            if (raw) progressData = JSON.parse(raw);
        } catch (e) {
            console.error("JSON Parse Error for progress:", e);
        }

        const units = vocabularyData[textbook][grade];
        console.log(`renderStats: Processing ${units.length} units`);

        units.forEach((unit, idx) => {
            // Log every unit to find the crasher
            // console.log(`Processing unit ${idx}: ${unit.unit}`); 

            const card = document.createElement('div');
            card.className = 'stats-card';

            const unitKey = `${textbook}_${grade}_${idx}`;
            const unitProgress = progressData[unitKey] || { choice: [], sort: [] };

            // Safe Access
            const totalWords = (unit.words && Array.isArray(unit.words)) ? unit.words.length : 0;
            const choiceCount = (unitProgress.choice && Array.isArray(unitProgress.choice)) ? unitProgress.choice.length : 0;
            const sortCount = (unitProgress.sort && Array.isArray(unitProgress.sort)) ? unitProgress.sort.length : 0;

            const choicePct = totalWords > 0 ? (choiceCount / totalWords * 100).toFixed(0) : 0;
            const sortPct = totalWords > 0 ? (sortCount / totalWords * 100).toFixed(0) : 0;

            card.innerHTML = `
                <div class="stats-unit-title">${unit.unit || 'Unknown Unit'}</div>
                
                <div class="progress-row">
                    <div class="progress-label">三択</div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${choicePct}%"></div>
                    </div>
                    <div class="progress-text">${choicePct}%</div>
                </div>
                
                <div class="progress-row">
                    <div class="progress-label">並べ替え</div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill sort" style="width: ${sortPct}%"></div>
                    </div>
                    <div class="progress-text">${sortPct}%</div>
                </div>
            `;

            container.appendChild(card);
        });
        console.log("renderStats: FINISHED");
    } catch (e) {
        console.error("RENDER CRASH:", e);
        const container = document.getElementById('stats-content');
        if (container) container.innerHTML = `<p style="color:red">Error: ${e.message}</p>`;
        alert("Render Error: " + e.message);
    }
}
// --- Selection Logic ---
function selectTextbook(textbook) {
    state.currentTextbook = textbook;

    // update UI for selection
    document.querySelectorAll('.textbook-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.textbook-btn[data-textbook="${textbook}"]`).classList.add('selected');

    // Show grade selection
    document.getElementById('grade-selection').classList.remove('hidden');
    updateGotoButton();
    saveState();
}

function selectGrade(grade) {
    state.currentGrade = grade;

    document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.grade-btn[data-grade="${grade}"]`).classList.add('selected');

    // Auto-nav removed in Cycle 4
    // renderUnitSelection();
    // showScreen('unitSelection');
    updateGotoButton();
    saveState();
}

function updateGotoButton() {
    const btn = document.getElementById('goto-unit-btn');
    if (state.currentTextbook && state.currentGrade) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

// --- Unit Selection Render ---
function renderUnitSelection() {
    const container = document.getElementById('units-container');
    container.innerHTML = '';

    const units = vocabularyData[state.currentTextbook][state.currentGrade];

    if (!units || units.length === 0) {
        container.innerHTML = '<p>データがありません</p>';
        return;
    }

    units.forEach((unitData, index) => {
        const id = `unit-${index}`;
        const label = document.createElement('label');
        label.className = 'unit-checkbox-label';

        // Compact structure: [Checkbox] [Lesson Name + (Page)]
        // We merged unitInfoDiv logic essentially. 
        // Just append checkbox then text node directly to label is simpler for flex.

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index;

        if (state.selectedUnits && state.selectedUnits.includes(index)) {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', () => {
            updateStartButton();
            saveState();
        });

        label.appendChild(checkbox);

        // Wrap text in a span for better control if needed, or just text node
        const textSpan = document.createElement('span');
        textSpan.className = 'unit-text';
        textSpan.textContent = unitData.unit;

        if (unitData.pages) {
            const pageSpan = document.createElement('span');
            pageSpan.className = 'unit-pages';
            pageSpan.textContent = ` (${unitData.pages})`;
            textSpan.appendChild(pageSpan);
        }

        label.appendChild(textSpan);

        container.appendChild(label);
    });

    updateStartButton();
}

function updateStartButton() {
    const checkboxes = document.querySelectorAll('#units-container input:checked');
    const btnChoice = document.getElementById('start-choice-btn');
    const btnSort = document.getElementById('start-sort-btn');

    // Update state for saving
    state.selectedUnits = Array.from(checkboxes).map(cb => parseInt(cb.value));

    const count = checkboxes.length;
    const isDisabled = count === 0;

    btnChoice.disabled = isDisabled;
    btnSort.disabled = isDisabled;

    // Calculate total words
    let totalWords = 0;
    if (vocabularyData[state.currentTextbook] && vocabularyData[state.currentTextbook][state.currentGrade]) {
        state.selectedUnits.forEach(unitIndex => {
            const unit = vocabularyData[state.currentTextbook][state.currentGrade][unitIndex];
            if (unit) totalWords += unit.words.length;
        });
    }

    // Update Word Count Display
    const wordCountDisplay = document.getElementById('total-words-display');
    if (wordCountDisplay) {
        wordCountDisplay.textContent = `${totalWords} 単語`; // "xx Words"
    }

    // Buttons text (no suffix needed now)
    btnChoice.textContent = `三択に挑戦`;
    btnSort.textContent = `並べ替えに挑戦`;
}

// --- Persistence ---
// (Old saveState removed)

// (Old loadState removed)

// --- Quiz Logic ---
function startQuiz(quizType) { // 'choice' or 'sort'
    const selectedUnitsCols = Array.from(document.querySelectorAll('#units-container input:checked'))
        .map(input => parseInt(input.value));

    if (selectedUnitsCols.length === 0) return;

    // 1. Gather all candidate words
    const allWords = [];
    const unitsData = vocabularyData[state.currentTextbook][state.currentGrade];

    selectedUnitsCols.forEach(unitIndex => {
        const unitWords = unitsData[unitIndex].words.map(w => ({ ...w, unitIndex })); // add unitIndex to help finding distractors
        allWords.push(...unitWords);
    });

    if (allWords.length === 0) return;

    // 2. Select 10 questions (or all if < 10)
    const questionCount = Math.min(10, allWords.length);
    // Shuffle words then pick first N
    const shuffledWords = shuffleArray([...allWords]);
    const selectedWords = shuffledWords.slice(0, questionCount);

    // 3. Generate Question Objects
    state.quizQuestions = selectedWords.map(word => generateQuestionDisplay(word, unitsData, quizType));
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.wrongQuestions = []; // Reset wrong questions
    // Store type if needed for retry
    state.lastQuizType = quizType;

    showScreen('quiz');
    renderQuestion();
}

function startReviewQuiz() {
    if (state.wrongQuestions.length === 0) return;

    // Setup review state
    state.quizQuestions = shuffleArray([...state.wrongQuestions]);
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.wrongQuestions = []; // Reset for the review session itself? 
    // Yes, if they get it wrong AGAIN, it should be added back for yet another review if we wanted endless mode.
    // For now, let's clear it and accumulate new wrongs from this session.

    // Mode? Keep last mode.
    // But questions object already has 'type'. 
    // generateQuestionDisplay created objects with fixed 'type' (choice or sort).
    // Review should likely keep the SAME type as before to practice exactly what they missed.
    // The objects in wrongQuestions are fully formed question objects.
    // We just need to re-render them.

    showScreen('quiz');
    renderQuestion();
}

function generateQuestionDisplay(targetWord, unitsData, forceType) {
    // If forceType is provided, use it. Otherwise random (fallback)
    let type = 0;
    if (forceType === 'choice') type = 0;
    else if (forceType === 'sort') type = 1;
    else type = Math.random() < 0.5 ? 0 : 1;

    if (type === 0) {
        return createType1Question(targetWord, unitsData);
    } else {
        return createType2Question(targetWord);
    }
}

// Type 1: English -> Japanese (3 choices)
function createType1Question(targetWord, unitsData) {
    const distractors = getDistractors(targetWord, unitsData);
    const options = shuffleArray([targetWord.jp, ...distractors]);

    return {
        type: 'choice',
        question: targetWord.en,
        answer: targetWord.jp,
        correctWord: targetWord,
        options: options
    };
}

function getDistractors(targetWord, unitsData) { // Simplified distractor logic
    // Try to get words from same or nearby units
    let candidates = [];

    // Helper to get JP list from simple unit words
    const mapToJp = (words) => words
        .filter(w => w.en !== targetWord.en) // exclude self
        .filter(w => w.jp !== targetWord.jp) // exclude words with SAME meaning (Cycle 2 fix)
        .map(w => w.jp);

    // Look in the same unit first
    if (unitsData[targetWord.unitIndex]) {
        const unitWords = unitsData[targetWord.unitIndex].words;
        candidates = mapToJp(unitWords);
    }

    // If need more, look at other units in same grade
    if (candidates.length < 2) {
        unitsData.forEach((u, idx) => {
            if (idx === targetWord.unitIndex) return; // already checked
            candidates.push(...mapToJp(u.words));
        });
    }

    // De-duplicate candidates themselves
    candidates = [...new Set(candidates)];

    // Shuffle and pick 2
    candidates = shuffleArray(candidates);

    // If absolutely no other words (very edge case), use dummy
    if (candidates.length === 0) candidates = ["(誤答候補なし1)", "(誤答候補なし2)"];
    if (candidates.length === 1) candidates.push("(誤答候補なし)");

    return candidates.slice(0, 2);
}

// Type 2: Japanese -> English Sorting ( _ _ _ )
function createType2Question(targetWord) {
    // Remove spaces for shuffling but keep them for checking/display if needed?
    // User requirement: "take cover" -> "_ _ _ _   _ _ _ _ _"

    const cleanStr = targetWord.en.replace(/[^a-zA-Z]/g, ''); // just for checking length if needed

    // Prepare slots structure based on original string
    // e.g. "take cover" -> [{char:'t', type:'char'}, ..., {type:'space'}, ...]

    return {
        type: 'sort',
        question: targetWord.jp, // Japanese is the prompt
        answer: targetWord.en,
        correctWord: targetWord,
        chars: shuffleArray(targetWord.en.split('').filter(c => c !== ' '))
    };
}

// --- Quiz Rendering ---
function renderQuestion() {
    const question = state.quizQuestions[state.currentQuestionIndex];
    const container = document.getElementById('question-container');
    const textEl = document.getElementById('question-text');
    const sortArea = document.getElementById('sorting-area');
    const optionsGrid = document.getElementById('answer-options');
    const feedbackArea = document.getElementById('feedback-area'); // Ensure this is hidden
    const audioBtn = document.getElementById('audio-btn');

    // Update counter
    document.getElementById('question-counter').textContent =
        `Question ${state.currentQuestionIndex + 1} / ${state.quizQuestions.length}`;

    // Reset areas
    sortArea.innerHTML = '';
    optionsGrid.innerHTML = '';
    feedbackArea.classList.add('hidden');
    textEl.style.color = 'var(--text-color)';

    // Audio button visibility
    audioBtn.classList.remove('hidden');

    if (question.type === 'choice') {
        textEl.textContent = question.question; // English word
        sortArea.classList.add('hidden');

        // Auto play audio for English prompts (optional, maybe distracting? User asked for hint button)
        // Let's just keep the button available.


        question.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => checkAnswerChoice(btn, opt, question));
            optionsGrid.appendChild(btn);
        });

    } else if (question.type === 'sort') {
        textEl.textContent = question.question; // Japanese word
        sortArea.classList.remove('hidden');

        // Draw slots based on answer structure
        // "take cover" -> 4 slots, 1 space, 5 slots
        const answerStr = question.answer;
        let currentSortState = []; // Array to hold filled chars

        for (let i = 0; i < answerStr.length; i++) {
            const char = answerStr[i];
            const slot = document.createElement('div');

            if (char === ' ') {
                slot.style.width = '20px'; // Space
            } else {
                slot.className = 'sort-slot';
                slot.dataset.index = i;
                slot.addEventListener('click', () => returnCharToPool(i));
            }
            sortArea.appendChild(slot);
        }

        // State for managing chips
        state.sortCurrentState = new Array(answerStr.length).fill(null);
        state.sortAvailableChars = [...question.chars]; // To track which are used? 
        // Actually simpler: render buttons for each char. When clicked, move to first empty slot.

        renderSortButtons(question);

        // Add "Answer/Next" button logic for sort? 
        // Requirement: "Answer" button, then "Next"

        const actionBtn = document.createElement('button');
        actionBtn.id = 'sort-answer-btn';
        actionBtn.className = 'primary-btn';
        actionBtn.textContent = '回答する';
        actionBtn.addEventListener('click', () => checkAnswerSort(question));
        optionsGrid.appendChild(actionBtn);
    }
}

// --- Sorting Logic Helpers ---
function renderSortButtons(question) {
    const existingContainer = document.querySelector('.sort-options-container');
    if (existingContainer) existingContainer.remove();

    const container = document.createElement('div');
    container.className = 'sort-options-container options-grid';
    // Style override for grid to look like chips
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '10px';
    container.style.justifyContent = 'center';

    question.chars.forEach((char, idx) => {
        // We need unique IDs because there might be multiple 'e's
        const btn = document.createElement('button');
        btn.className = 'letter-chip';
        btn.textContent = char;
        btn.dataset.charId = idx;

        // If this char is already used in a slot, gray it out
        if (isCharUsed(idx)) {
            btn.classList.add('used');
            btn.disabled = true;
        } else {
            btn.addEventListener('click', () => useChar(char, idx, question));
        }

        container.appendChild(btn);
    });

    const parent = document.getElementById('answer-options');
    // Insert before the answer button
    const actionBtn = document.getElementById('sort-answer-btn');
    parent.insertBefore(container, actionBtn);
}

function isCharUsed(charId) {
    return state.sortCurrentState.some(item => item && item.id === charId);
}

function useChar(char, charId, question) {
    // Find first empty slot
    const answerStr = question.answer;
    let emptyIndex = -1;

    for (let i = 0; i < answerStr.length; i++) {
        if (answerStr[i] !== ' ' && state.sortCurrentState[i] === null) {
            emptyIndex = i;
            break;
        }
    }

    if (emptyIndex !== -1) {
        state.sortCurrentState[emptyIndex] = { char, id: charId };
        updateSortSlots();
        renderSortButtons(question);
    }
}

function returnCharToPool(slotIndex) {
    if (state.sortCurrentState[slotIndex]) {
        state.sortCurrentState[slotIndex] = null;
        updateSortSlots();

        // Re-render buttons to enable the one we just removed
        const question = state.quizQuestions[state.currentQuestionIndex];
        renderSortButtons(question);
    }
}

function updateSortSlots() {
    const slots = document.querySelectorAll('.sort-slot');
    slots.forEach(slot => {
        const idx = parseInt(slot.dataset.index);
        const item = state.sortCurrentState[idx];
        slot.textContent = item ? item.char : '';
    });
}


// --- Answer Checking ---
function checkAnswerChoice(btn, selectedAnswer, question) {
    const feedbackArea = document.getElementById('feedback-area');
    const msg = document.getElementById('feedback-message');
    const expl = document.getElementById('feedback-explanation');
    const nextBtn = document.getElementById('next-question-btn');

    document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

    if (selectedAnswer === question.answer) {
        btn.classList.add('correct');
        msg.textContent = '正解！ Correct!';
        msg.style.color = 'var(--primary-color)';

        // Fix: Only increment score if not already attempted (though buttons are disabled so it should be fine)
        // Ensure robust scoring logic
        state.score++;

        playAudio(true);

        // Save Progress
        saveActivityCount(1);
        saveProgress(question.correctWord.unitIndex, 'choice', question.correctWord.en);
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.choice-btn').forEach(b => {
            if (b.textContent === question.answer) b.classList.add('correct');
        });
        msg.textContent = '残念... Wrong!';
        msg.style.color = 'var(--error-color)';

        // Review Mode: Track wrong question
        state.wrongQuestions.push(question);

        saveActivityCount(1);
    }

    expl.textContent = `${question.correctWord.en} = ${question.correctWord.jp}`;
    feedbackArea.classList.remove('hidden');
    nextBtn.onclick = nextQuestion;
}

function checkAnswerSort(question) {
    const feedbackArea = document.getElementById('feedback-area');
    const msg = document.getElementById('feedback-message');
    const expl = document.getElementById('feedback-explanation');
    const nextBtn = document.getElementById('next-question-btn');
    const actionBtn = document.getElementById('sort-answer-btn');

    let constructed = '';
    const answerStr = question.answer;
    for (let i = 0; i < answerStr.length; i++) {
        if (answerStr[i] === ' ') constructed += ' ';
        else {
            const item = state.sortCurrentState[i];
            constructed += item ? item.char : '_';
        }
    }

    const isCorrect = constructed === question.answer;
    actionBtn.style.display = 'none';

    if (isCorrect) {
        msg.textContent = '正解！ Perfect!';
        msg.style.color = 'var(--primary-color)';
        state.score++;

        saveActivityCount(1);
        saveProgress(question.correctWord.unitIndex, 'sort', question.correctWord.en);
    } else {
        msg.textContent = `正解は: ${question.answer}`;
        msg.style.color = 'var(--error-color)';
        saveActivityCount(1);

        // Review Mode: Track
        state.wrongQuestions.push(question);
    }

    expl.textContent = `${question.correctWord.en} = ${question.correctWord.jp}`;
    feedbackArea.classList.remove('hidden');
    nextBtn.onclick = nextQuestion;
}

function nextQuestion() {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < state.quizQuestions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    showScreen('result');
    // Dynamic denominator
    const total = state.quizQuestions.length;
    // We update the entire HTML to avoid losing the ID reference for potential future selects, 
    // or just rely on this one update.
    const scoreDisplay = document.querySelector('.score-display');
    scoreDisplay.innerHTML = `<span id="score-count">${state.score}</span> / ${total}`;

    const msg = document.getElementById('score-message');
    const wrongSection = document.getElementById('wrong-answer-section');
    const wrongList = document.getElementById('wrong-questions-list');
    const startReviewBtn = document.getElementById('start-review-btn');

    // Message Logic
    if (state.score === total) {
        msg.textContent = "Great Job!! 満点！";
        wrongSection.classList.add('hidden'); // No wrong answers
    } else {
        if (state.score >= total * 0.8) msg.textContent = "Good!! あと少し！";
        else msg.textContent = "Fight!! 次はがんばろう！";

        // Show Review Section
        wrongSection.classList.remove('hidden');
        wrongList.innerHTML = '';

        state.wrongQuestions.forEach(q => {
            const li = document.createElement('li');
            // Show "English = Japanese"
            li.textContent = `${q.correctWord.en} = ${q.correctWord.jp}`;
            wrongList.appendChild(li);
        });

        startReviewBtn.onclick = startReviewQuiz;
    }
}

// Helpers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playAudio(isCorrect) {
    // Placeholder for sound effects (correct/incorrect)
    // We could add beep sounds later if requested.
}

function playCurrentWordAudio() {
    const question = state.quizQuestions[state.currentQuestionIndex];
    if (!question) return;

    // We want to pronounce the English word.
    // Type 1 (Choice): Question is English. 
    // Type 2 (Sort): Question is Japanese, Answer is English.

    const text = question.correctWord.en;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Audio not supported in this browser.");
    }
}

