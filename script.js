// ==========================================
// 元素マスターチャレンジ Ver.3
// script.js
// Part 1
// ==========================================

// ---------- 元素データ ----------

const elements = [

    { number:1, name:"水素", symbol:"H" },
    { number:2, name:"ヘリウム", symbol:"He" },
    { number:3, name:"リチウム", symbol:"Li" },
    { number:4, name:"ベリリウム", symbol:"Be" },
    { number:5, name:"ホウ素", symbol:"B" },
    { number:6, name:"炭素", symbol:"C" },
    { number:7, name:"窒素", symbol:"N" },
    { number:8, name:"酸素", symbol:"O" },
    { number:9, name:"フッ素", symbol:"F" },
    { number:10, name:"ネオン", symbol:"Ne" },

    { number:11, name:"ナトリウム", symbol:"Na" },
    { number:12, name:"マグネシウム", symbol:"Mg" },
    { number:13, name:"アルミニウム", symbol:"Al" },
    { number:14, name:"ケイ素", symbol:"Si" },
    { number:15, name:"リン", symbol:"P" },
    { number:16, name:"硫黄", symbol:"S" },
    { number:17, name:"塩素", symbol:"Cl" },
    { number:18, name:"アルゴン", symbol:"Ar" },
    { number:19, name:"カリウム", symbol:"K" },
    { number:20, name:"カルシウム", symbol:"Ca" }

];

// ---------- ゲーム設定 ----------

const TOTAL_QUESTIONS = 100;

let score = 0;
let questionCount = 0;

let currentElement = null;
let currentAnswer = "";
let currentMode = "";

// 直前の問題（同じ問題が続かないようにする）
let lastQuestionKey = "";

// ---------- HTML取得 ----------

const questionNumber =
    document.getElementById("questionNumber");

const questionType =
    document.getElementById("questionType");

const question =
    document.getElementById("question");

const answer =
    document.getElementById("answer");

const submitButton =
    document.getElementById("submitButton");

const message =
    document.getElementById("message");

const scoreText =
    document.getElementById("score");

// ---------- 初期化 ----------

submitButton.addEventListener("click", checkAnswer);

answer.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        checkAnswer();

    }

});

// 最初の問題を表示
nextQuestion();
// ==========================================
// Part 2
// 問題を作る
// ==========================================

function nextQuestion(){

    // 100問終わったら終了
    if(questionCount >= TOTAL_QUESTIONS){

        finishGame();
        return;

    }

    message.textContent = "";
    answer.value = "";
    answer.focus();

    let questionKey = "";

    // 同じ問題が連続しないようにする
    do{

        // 元素をランダムに選ぶ
        currentElement =
            elements[Math.floor(Math.random()*elements.length)];

        // 出題形式をランダムに選ぶ
        if(Math.random() < 0.5){

            currentMode = "symbol";

            questionType.textContent =
                "【元素記号を書きなさい】";

            question.textContent =
                currentElement.name;

            currentAnswer =
                currentElement.symbol;

            questionKey =
                currentElement.name + "_symbol";

        }

        else{

            currentMode = "name";

            questionType.textContent =
                "【元素名を書きなさい】";

            question.textContent =
                currentElement.symbol;

            currentAnswer =
                currentElement.name;

            questionKey =
                currentElement.symbol + "_name";

        }

    }while(questionKey === lastQuestionKey);

    lastQuestionKey = questionKey;

    questionNumber.textContent =
        `問題 ${questionCount + 1} / ${TOTAL_QUESTIONS}`;

}
// ==========================================
// Part 3
// 判定処理
// ==========================================

function checkAnswer(){

    const input = answer.value.trim();

    // 空欄なら何もしない
    if(input === ""){
        return;
    }

    // -------------------------------
    // 元素記号問題
    // -------------------------------
    if(currentMode === "symbol"){

        // 完全一致
        if(input === currentAnswer){

            score++;

            message.textContent = "⭕ 正解！";
            message.style.color = "green";

        }

        // 大文字・小文字だけ違う
        else if(input.toUpperCase() === currentAnswer.toUpperCase()){

            message.textContent =
                `⚠ 大文字・小文字が違います！（正解：${currentAnswer}）`;

            message.style.color = "orange";

        }

        // 不正解
        else{

            message.textContent =
                `❌ 不正解！（正解：${currentAnswer}）`;

            message.style.color = "red";

        }

    }

    // -------------------------------
    // 元素名問題
    // -------------------------------
    else{

        if(input === currentAnswer){

            score++;

            message.textContent = "⭕ 正解！";
            message.style.color = "green";

        }

        else{

            message.textContent =
                `❌ 不正解！（正解：${currentAnswer}）`;

            message.style.color = "red";

        }

    }

    questionCount++;

    scoreText.textContent =
        `得点：${score}`;

    setTimeout(nextQuestion,1200);

}
// ==========================================
// Part 4
// 終了画面
// ==========================================

function finishGame(){

    const percent =
        Math.round(score / TOTAL_QUESTIONS * 100);

    let rank = "";

    if(percent >= 95){

        rank = "🏆 Sランク";

    }

    else if(percent >= 80){

        rank = "🥇 Aランク";

    }

    else if(percent >= 60){

        rank = "🥈 Bランク";

    }

    else if(percent >= 40){

        rank = "🥉 Cランク";

    }

    else{

        rank = "📖 もう一度チャレンジ！";

    }

    document.querySelector(".container").innerHTML = `

        <h1>🎉 ゲーム終了！</h1>

        <h2>${score} / ${TOTAL_QUESTIONS} 点</h2>

        <h2>正答率 ${percent}%</h2>

        <h1>${rank}</h1>

        <br>

        <button onclick="location.reload()">
            もう一度遊ぶ
        </button>

    `;

}
