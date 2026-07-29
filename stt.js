export function initSTT(onResult, onStart, onEnd) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("크롬 브라우저를 사용해주세요!");
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR'; 
    recognition.interimResults = false; 

    recognition.onstart = () => { if (onStart) onStart(); };
    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (onResult) onResult(text);
    };
    recognition.onend = () => { if (onEnd) onEnd(); };

    return recognition;
}