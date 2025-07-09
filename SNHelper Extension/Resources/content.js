// --- 関数定義 ---

// <tbody>を<thead>に置換するメインの関数
function replaceTbodyWithThead() {
    // まだ処理されていないtbodyのみを対象とする
    const tbodies = document.querySelectorAll('tbody:not([data-snhelper-processed])');
    if (tbodies.length === 0) {
        return; // 置換対象がなければ何もしない
    }

    console.log(`Found ${tbodies.length} tbody element(s) to replace.`);
    tbodies.forEach(tbody => {
        // 処理済みマークを付ける
        tbody.setAttribute('data-snhelper-processed', 'true');

        const thead = document.createElement('thead');
        for (const attr of tbody.attributes) {
            thead.setAttribute(attr.name, attr.value);
        }
        while (tbody.firstChild) {
            thead.appendChild(tbody.firstChild);
        }

        const table = tbody.parentNode;
        table.replaceChild(thead, tbody);

        // テーブルのボーダーをスタイルする
        if (table.tagName === 'TABLE') {
            table.style.border = '3px solid blue';
            console.log("Applied blue border to the table.");
        }
    });
}

// デバウンス関数：関数の連続実行を防ぐ
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// --- イベントリスナーと監視 ---

// 1. ポップアップからのメッセージを受け取って実行
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceTbodyWithThead") {
        replaceTbodyWithThead();
        sendResponse({result: "success"});
    }
    // `true`を返して、非同期的にsendResponseを呼び出すことを示す
    return true;
});

// 2. DOMの変更を監視して自動実行
const debouncedReplace = debounce(replaceTbodyWithThead, 500);

// MutationObserverのインスタンスを作成
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            debouncedReplace();
            return;
        }
    }
});

// 監視を開始
function startObserver() {
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        console.log("MutationObserver is now watching for DOM changes.");
    } else {
        setTimeout(startObserver, 100);
    }
}

// --- 初期実行 ---

// 最初のページ読み込み時に一度実行
replaceTbodyWithThead();
// 監視を開始
startObserver();
