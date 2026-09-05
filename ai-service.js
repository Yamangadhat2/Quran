/**
 * ملف خدمة الذكاء الاصطناعي للتفسير والرد على الأسئلة الدينية
 * مدمج به المفتاح الخاص بك
 */

const QURAN_AI_CREDENTIALS = {
    apiKey: "AQ.Ab8RN6K8owh5OQiZeM2aMLOJZYoVsUvv07GxdWR4m2Mwxxehlg",
    // افتراض نقطة النهاية (Endpoint) للنموذج المدعوم (يمكن تعديلها حسب المزود الخاص بالـ API)
    endpoint: "https://api.openai.com/v1/chat/completions" 
};

/**
 * دالة إرسال السؤال للمساعد الذكي واستقبال التفسير أو الإجابة
 * @param {string} userQuestion - سؤال المستخدم أو الآية المراد تفسيرها
 * @returns {Promise<string>} - رد الذكاء الاصطناعي
 */
async function askQuranAI(userQuestion) {
    try {
        const response = await fetch(QURAN_AI_CREDENTIALS.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${QURAN_AI_CREDENTIALS.apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o", // أو الموديل المتوافق مع الـ API الخاص بك
                messages: [
                    {
                        role: "system",
                        content: "أنت عالم تفسير ومساعد إسلامي ذكي، خبير بالقرآن الكريم، علومه، وتفسيره (ابن كثير، السعدي، إلخ). أجب بلغة عربية فصحى، بأسلوب دافئ، علمي، ومبسط."
                    },
                    {
                        role: "user",
                        content: userQuestion
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "عذراً، لم أتمكن من معالجة الطلب حالياً. يجدر التحقق من نقطة النهاية (Endpoint) الخاصة بمزود الـ API.";
        }
    } catch (error) {
        console.error("AI Service Error:", error);
        // في حال فشل الاتصال المباشر (لأسباب تخص مزود الـ API)، نعطي رداً تجريبياً ذكياً للمحاكاة
        return "أهلاً بك. استناداً إلى سؤالك حول القرآن الكريم وتفسيره: تأكد من تفعيل الاتصال بخدمة الـ AI بشكل صحيح. (ملاحظة: هذا رد احتياطي لضمان عمل واجهة الموقع بسلاسة).";
    }
}
