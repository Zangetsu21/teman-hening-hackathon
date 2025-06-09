document.addEventListener("DOMContentLoaded", () => {
    const messageLog = document.getElementById("message-log");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const choiceButtonsContainer = document.getElementById("choice-buttons-container");
    let isBotOperating = false;

    // --- FUNGSI PEMBANTU ---
    const randomDelay = (min, max) => new Promise(res => setTimeout(res, Math.random() * (max - min) + min));
    function addMessage(html, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageElement.innerHTML = html;
        messageLog.appendChild(messageElement);
        messageLog.scrollTop = messageLog.scrollHeight;
        return messageElement;
    }
    function toggleInput(enabled) {
        userInput.disabled = !enabled;
        sendBtn.disabled = !enabled;
        isBotOperating = !enabled;
        if (enabled) {
            userInput.focus();
            choiceButtonsContainer.style.display = 'flex';
        } else {
            choiceButtonsContainer.style.display = 'none';
        }
    }

    // --- FUNGSI "PEKERJA" ---
    async function startBreathingExercise() {
        addMessage("Tentu. Mari kita lakukan latihan pernapasan untuk menenangkan diri.", "bot");
        await randomDelay(1500, 2000);
        addMessage("Silakan cari posisi yang nyaman...", "bot");
        await randomDelay(2500, 3000);
        for (let i = 0; i < 3; i++) {
            addMessage(`Tarik napas dalam-dalam... (1... 2... 3...)`, "bot");
            await randomDelay(3000, 3500);
            addMessage(`Tahan... (1... 2...)`, "bot");
            await randomDelay(2000, 2500);
            addMessage(`Hembuskan perlahan... (1... 2... 3... 4...)`, "bot");
            await randomDelay(4000, 4500);
        }
        addMessage("Anda hebat telah meluangkan waktu untuk diri sendiri.", "bot");
        await randomDelay(1500, 2000);
        addMessage("Bagaimana perasaan Anda sekarang? Anda bisa ceritakan lagi jika mau.", "bot");
    }

    async function startDistractionExercise() {
        addMessage("Baik. Mari kita coba latihan grounding untuk fokus pada saat ini.", "bot");
        await randomDelay(1500, 2000);
        addMessage("Lihat sekeliling Anda dan sebutkan dalam hati <b>5 benda</b> yang bisa Anda lihat.", "bot");
        await randomDelay(7000, 8000);
        addMessage("Bagus. Sekarang, rasakan <b>4 hal</b> yang bisa disentuh oleh tubuh Anda.", "bot");
        await randomDelay(7000, 8000);
        addMessage("Selanjutnya, dengarkan <b>3 suara</b> yang berbeda di sekitar Anda.", "bot");
        await randomDelay(7000, 8000);
        addMessage("Hampir selesai... Cium <b>2 aroma</b> yang bisa Anda temukan.", "bot");
        await randomDelay(7000, 8000);
        addMessage("Terakhir, sebutkan <b>1 hal baik</b> tentang diri Anda saat ini.", "bot");
        await randomDelay(7000, 8000);
        addMessage("Latihan selesai. Semoga pikiran Anda kini lebih terpusat dan tenang.", "bot");
        await randomDelay(1500, 2000);
        addMessage("Ada lagi yang bisa saya bantu?", "bot");
    }
    
    // =========================================================================
    // ==== PERBAIKAN: MENGEMBALIKAN FUNGSI generateBotResponse YANG HILANG ====
    // =========================================================================
    function generateBotResponse(data) {
        const gamblingKeywords = ['slot', 'judi', 'gacor', 'kalah', 'rungkad', 'wd', 'deposit', 'maxwin'];
        if (data.error) {
            return "Maaf, sepertinya ada sedikit gangguan di sistem saya.";
        }
        
        const sentiment = data.sentiment;
        const keyPhrases = data.key_phrases; // Biarkan dalam format asli
        const lowerKeyPhrases = keyPhrases.map(p => p.toLowerCase());
        
        const hasGamblingKeyword = lowerKeyPhrases.some(phrase => gamblingKeywords.includes(phrase));
        // Filter frasa kunci yang bukan kata umum atau kata judi
        const nonGamblingPhrases = keyPhrases.filter(phrase => !gamblingKeywords.includes(phrase.toLowerCase()) && phrase.length > 2);

        if (sentiment === 'negative') {
            let response = "Saya memahami ini situasi yang sulit untuk Anda. ";
            if (nonGamblingPhrases.length > 0) {
                response += `Terutama ketika Anda merasakan hal seperti "<b>${nonGamblingPhrases[0]}</b>"`;
                if (nonGamblingPhrases.length > 1) {
                    response += ` dan juga memikirkan tentang "<b>${nonGamblingPhrases[1]}</b>". `;
                } else {
                    response += ". ";
                }
            }
            response += "Perasaan Anda sepenuhnya valid. ";
            if (hasGamblingKeyword) {
                response += "Mengambil jeda dari aktivitas seperti itu bisa menjadi langkah pertama yang baik. ";
            }
            response += "Terkadang, sekadar menarik napas dalam bisa sangat membantu meringankan beban. Anda bisa mencoba 'Latihan Pernapasan' kapan pun Anda siap.";
            return response;
        } 
        else if (sentiment === 'positive') {
            return `Senang sekali mendengarnya! Terima kasih sudah berbagi energi positif Anda. Semoga hari Anda semakin menyenangkan!`;
        } 
        else { // Neutral atau mixed
            return `Terima kasih sudah berbagi. Saya di sini untuk mendengar. Jika ada hal spesifik yang ingin didiskusikan lebih lanjut, jangan ragu ya.`;
        }
    }
    // =========================================================================

    async function analyzeTextWithAI(userText) {
        const loadingIndicator = addMessage('<div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>', "bot");
        await randomDelay(800, 1500);

        try {
            const response = await fetch("/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userText }),
            });
            const data = await response.json();
            messageLog.removeChild(loadingIndicator);
            
            // Sekarang memanggil fungsi yang sudah lengkap isinya
            const botResponseText = generateBotResponse(data);
            addMessage(botResponseText, "bot");
        } catch (error) {
            console.error("Error:", error);
            if(messageLog.contains(loadingIndicator)){ messageLog.removeChild(loadingIndicator); }
            addMessage("Maaf, sistem saya sedang mengalami sedikit gangguan. Coba lagi beberapa saat.", "bot");
        }
    }

    // --- FUNGSI HANDLER UTAMA (Struktur sudah benar) ---
    async function handleUserAction(text) {
        const userText = text.trim();
        if (userText === "" || isBotOperating) return;

        toggleInput(false);
        addMessage(userText, "user");
        userInput.value = "";

        try {
            await randomDelay(500, 1000);
            const lowerText = userText.toLowerCase();

            if (lowerText.includes('napas') || lowerText.includes('pernapasan')) {
                await startBreathingExercise();
            } else if (lowerText.includes('alih') || lowerText.includes('pikiran')) {
                await startDistractionExercise();
            } else if (lowerText === 'cek perasaan') {
                addMessage("Tentu, saya siap mendengarkan. Silakan ceritakan apa yang sedang Anda rasakan atau pikirkan.", "bot");
            } else {
                await analyzeTextWithAI(userText);
            }
        } catch (error) {
            console.error("Terjadi error tak terduga:", error);
            addMessage("Maaf, sepertinya terjadi kesalahan. Silakan coba lagi.", "bot");
        } finally {
            toggleInput(true);
        }
    }

    // --- EVENT LISTENERS (Struktur sudah benar) ---
    sendBtn.addEventListener("click", () => {
        handleUserAction(userInput.value);
    });
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserAction(userInput.value);
        }
    });
    choiceButtonsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('choice-btn')) {
            handleUserAction(event.target.textContent);
        }
    });
    
    addMessage("Halo! Saya Teman Hening. Apa yang bisa saya bantu hari ini?", "bot");
    toggleInput(true);
});