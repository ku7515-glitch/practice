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