// mentor.js (내일 작성할 뼈대 미리보기)
export async function loadMentors() {
    // 1. JSON 파일 불러오기
    const response = await fetch('./dummy_mentors.json');
    const mentors = await response.json();
    return mentors;
}

export function findMatchingMentors(mentors, targetTag) {
    // 2. AI가 뽑아준 태그(targetTag)와 일치하는 멘토만 걸러내기
    return mentors.filter(mentor => mentor.tags.includes(targetTag));
}