// HTMLの要素取得
const startButton = document.getElementById('start-button'); // スタートボタン
const gameContainer = document.getElementById('game-container'); // ゲーム画面
const imageContainer = document.getElementById('image-container'); // 画像コンテナ
const giveUpButton = document.getElementById('give-up-button'); // ギブアップボタン
const resultModal = new bootstrap.Modal(document.getElementById('resultModal')); // モー ダルをJavaScriptで制御
const modalScore = document.getElementById('modal-score'); // モーダル内の正解数を表示す る要素
const modalRestartButton = document.getElementById('modal-restart-button'); // モーダル内の再プレイボタン
const scoreElement = document.getElementById('score'); // 正解数を表示する要素
const correctModal = new bootstrap.Modal(document.getElementById('correctModal')); // 正 解のモーダル
const wrongModal = new bootstrap.Modal(document.getElementById('wrongModal')); // 不正解 のモーダル
const wrongModalScore = document.getElementById('wrong-modal-score'); // 不正解のモーダル内の正解数を表示する要素
const closeButton = document.getElementById('modal-close-button'); // モーダル内の閉じる ボタン
const nextButton = document.getElementById('modal-next-button'); // 正解時の次の問題ボタ ン
const topButton = document.getElementById('modal-top-button'); // 正解時のモーダル内のTOPボタン
const wrongCloseButton = document.getElementById('wrong-modal-close-button'); // 不正解のモーダル内の閉じるボタン
const topPageElement = document.getElementById('top-page'); // 初期画面

// ゲームの状態を表す変数
let correctImageCount = 1;　// 正解画像の表示数
let score = 0; // 正解数
let addImageCount = 1; // 不正解画像の追加数

// 画像のパスを配列で定義
const imagePaths = ['c.png', 'i-1.png', 'i-2.png', 'i-3.png'];

// スタートボタンクリック時（イベントハンドラの設定）
startButton.addEventListener('click', () => {
    // ゲームスタート時の初期設定
    score = 0;  // 正解数を0にリセット
    scoreElement.textContent = score; // 正解数を表示
    imageContainer.innerHTML = '';  // 画像コンテナ内の要素を空にする
    gameContainer.style.display = 'block';  // ゲーム画面を表示
    topPageElement.style.display = 'none'; // TOP画面を非表示

    // 正解画像を表示
    const correctImagePath = 'images/c.png'; // 正解画像を指定
    const correctImg = document.createElement('img'); // img要素を生成
    correctImg.src = correctImagePath; // 画像パスを設定
    correctImg.classList.add('game-image'); // 正解画像のクラスを設定
    correctImg.addEventListener('click', handleCorrectImageClick); // 正解画像のクリック ハンドラを設定
    // correctImg.style.order = Math.floor(Math.random() * 4); // 表示順序をランダムに設 定
    imageContainer.appendChild(correctImg); // 画像コンテナに追加
});

// ギブアップボタンクリック時（イベントハンドラの設定）
giveUpButton.addEventListener('click', () => {
    modalScore.textContent = score; // モーダル内に正解数を表示
    resultModal.show(); // モーダルを表示
});

// モーダル内の再プレイボタンクリック時（イベントハンドラの設定）
modalRestartButton.addEventListener('click', () => {
    resultModal.hide(); // モーダルを非表示
    startButton.click(); // ゲームを再スタート
});

// モーダル内の閉じるボタンクリック時（イベントハンドラの設定）
closeButton.addEventListener('click', () => {
    handleBackToTop(); // TOP画面に戻る
    resultModal.hide(); // モーダルを非表示
});

// 不正解のモーダル内の閉じるボタンクリック時（イベントハンドラの設定）
wrongCloseButton.addEventListener('click', () => {
    handleBackToTop(); // TOP画面に戻る
    wrongModal.hide(); // モーダルを非表示
});

// 正解のモーダル内のTOPボタンクリック時（イベントハンドラの設定）
topButton.addEventListener('click', () => {
    handleBackToTop(); // TOP画面に戻る
    correctModal.hide(); // モーダルを非表示
});

// TOP画面に戻るボタンクリック時（イベントハンドラの設定）
function handleBackToTop() {
    document.getElementById('top-page').style.display = 'block'; // 初期画面に戻る
    gameContainer.style.display = 'none'; // ゲーム画面を非表示
}

// 不正解画像のクリックした時（イベントハンドラの設定）
function handleWrongImageClick() {
    wrongModalScore.textContent = score; // 不正解のモーダル内に正解数を表示
    wrongModal.show(); // 不正解のモーダルを表示
}

// 正解画像のクリックした時（イベントハンドラの設定）
function handleCorrectImageClick(event) {
    const clickedImage = event.target; // クリックした画像を取得
    // 正解画像をクリックした場合
    if (imagePaths.indexOf(clickedImage.src.split('/').pop()) === 0) {
        correctModal.show(); // 正解のモーダルを表示
    }
}

function startNextGame() {
        score++; // 正解数をカウントアップ
        scoreElement.textContent = score; // 正解数を表示
        // A.jpegを除く不正解画像を複数枚追加で表示
        for (let i = 0; i < (addImageCount + score); i++) {
            const randomIndex = getRandomIncorrectIndex(imagePaths); // ランダム数値を生 成
            const imagePath = 'images/' + imagePaths[randomIndex]; // 画像ディレクトリを 指定
            const img = document.createElement('img'); // img要素を生成
            img.src = imagePath; // 画像パスを設定
            img.classList.add('game-image'); // 正解画像のクラスを設定
            img.addEventListener('click', handleWrongImageClick); // 不正解画像のクリックハンドラを設定
            imageContainer.appendChild(img); // 画像コンテナに追加
        }

        // 正解以外のインデックスをランダムに選択する関数
        function getRandomIncorrectIndex(paths) {
            let randomIndex; // ランダム数値を格納する変数
            do {
                randomIndex = Math.floor(Math.random() * paths.length);
            } while (paths[randomIndex] === 'c.png'); // 正解以外の画像を選ぶまでループ
            return randomIndex;
        }

        // 画像コンテナ内の要素をランダムにソート
        const imageElements = Array.from(imageContainer.children); // 画像コンテナ内の要 素を配列に変換
        imageElements.sort(() => Math.random() - 0.5); // 要素をランダムにソート
        // ソートした要素を画像コンテナに追加
        imageElements.forEach(element => {
            imageContainer.appendChild(element);
        });
        correctModal.hide(); // 正解のモーダルを非表示
}