import { Storage } from './storage.js';
import { initSTT } from './stt.js';

document.addEventListener('DOMContentLoaded', () => {
    const recordBtn = document.getElementById('recordBtn');
    const resultText = document.getElementById('resultText');

    const recognition = initSTT(
        (text) => {
            resultText.innerText = text;
            Storage.save('seniorVoice', text); // 방금 말한 내용 저장
            recordBtn.innerText = "🎤 마이크 켜기";
            recordBtn.style.backgroundColor = ""; 
        },
        () => {
            recordBtn.innerText = "🔴 녹음 중... (말씀하세요)";
            recordBtn.style.backgroundColor = "#ffcccc";
        }
    );

    recordBtn.addEventListener('click', () => {
        if (recognition) recognition.start();
    });
});
// (기존 마이크 코드 아래에 이어서 작성)

    /* =========================================
       [임산부 화면] 고민 입력 및 가짜 AI 호출
       ========================================= */
    const submitWorryBtn = document.getElementById('submitWorryBtn');
    const worryInput = document.getElementById('worryInput');
    const loadingText = document.getElementById('loadingText');
    const aiResultText = document.getElementById('aiResultText');

    if (submitWorryBtn) {
        submitWorryBtn.addEventListener('click', () => {
            const worryText = worryInput.value;
            
            // 1. 빈칸이면 경고
            if (!worryText) {
                alert("고민을 입력해주세요!");
                return;
            }

            // 2. 고민 내용을 브라우저 주머니에 저장
            Storage.save('pregnantWorry', worryText);

            // 3. 로딩 글자 켜기 (AI가 분석하는 척)
            loadingText.style.display = "block";
            aiResultText.innerText = "";
            submitWorryBtn.disabled = true;

            // 4. 2초 뒤에 가짜 결과 보여주기 (C팀원의 진짜 API가 붙기 전 임시 조치)
            setTimeout(() => {
                loadingText.style.display = "none";
                submitWorryBtn.disabled = false;
                
                // C팀원이 API를 만들어주기 전까지 쓸 가짜 데이터
                aiResultText.innerText = "✅ AI 추천 태그: [첫 출산], [육아 부담]\n👴 추천 멘토: 김정희 어르신";
            }, 2000);
        });
    }