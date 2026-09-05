/**
 * ملف خدمة الذكاء الاصطناعي المحدث لـ Google Gemini API
 * متوافق تماماً مع مفاتيح الـ AQ. الحديثة
 */

const QURAN_AI_CONFIG = {
    apiKey: "AQ.Ab8RN6K8owh5OQiZeM2aMLOJZYoVsUvv07GxdWR4m2Mwxxehlg",
    // نقطة النهاية الرسمية لنموذج Gemini 1.5 Flash
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
};

/**
 * دالة إرسال السؤال لـ Gemini لتفسير الآيات والرد على الأسئلة الإسلامية
 * @param {string} userQuestion - سؤال المستخدم
 * @returns {Promise<string>} - رد الذكاء الاصطناعي
 */
async function askQuranAI(userQuestion) {
    try {
        const url = `${QURAN_AI_CONFIG.endpoint}?key=${QURAN_AI_CONFIG.apiKey}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{
                        text: "أنت عالم تفسير ومساعد إسلامي ذكي متخصص في القرآن الكريم، علومه، وتفسيره. أجب بلغة عربية فصحى بأسلوب دافئ، علمي، ومبسط."
                    }]
                },
                contents: [
                    {
                        parts: [
                            { text: userQuestion }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        
        // استخراج الإجابة من هيكل بيانات Gemini
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            console.error("Gemini API Error:", data.error);
            return `عذراً، حدث خطأ من الخادم: ${data.error.message || "تأكد من صلاحية مفتاح الـ API."}`;
        } else {
            return "عذراً، لم أتمكن من الحصول على إجابة في الوقت الحالي.";
        }
    } catch (error) {
        console.error("Network Error:", error);
        return "عذراً، حدث خطأ في الاتصال بخدمة الذكاء الاصطناعي. تأكد من اتصالك بالإنترنت.";
    }
}
