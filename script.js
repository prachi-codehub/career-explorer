
/* ==========================================
   CAREER SKILL NAVIGATOR - CAREER DNA
   ========================================== */

function getCareerDNAScores() {
    const defaults = {
        problemSolving: 0,
        technology: 0,
        dataThinking: 0,
        communication: 0
    };

    try {
        const saved = localStorage.getItem("careerDNAScores");

        if (!saved) {
            return defaults;
        }

        const scores = JSON.parse(saved);

        return {
            problemSolving: Number(scores.problemSolving) || 0,
            technology: Number(scores.technology) || 0,
            dataThinking: Number(scores.dataThinking) || 0,
            communication: Number(scores.communication) || 0
        };
    } catch (error) {
        console.error("Career DNA: Unable to read saved scores.", error);
        return defaults;
    }
}

function loadCareerDNA() {
    const scores = getCareerDNAScores();

    const values = [
        scores.problemSolving,
        scores.technology,
        scores.dataThinking,
        scores.communication
    ];

    const overall = Math.round(
        values.reduce((total, score) => total + score, 0) /
        values.length
    );

    if (typeof window.updateCareerDNA === "function") {
        window.updateCareerDNA({
            problemSolving: scores.problemSolving,
            technology: scores.technology,
            dataThinking: scores.dataThinking,
            communication: scores.communication,
            careerMatch: overall
        });
    } else {
        console.warn(
            "Career DNA: updateCareerDNA() was not found on this page."
        );
    }
}

function saveCareerDNAScores(scores) {
    const cleanScores = {
        problemSolving: Number(scores.problemSolving) || 0,
        technology: Number(scores.technology) || 0,
        dataThinking: Number(scores.dataThinking) || 0,
        communication: Number(scores.communication) || 0
    };

    localStorage.setItem(
        "careerDNAScores",
        JSON.stringify(cleanScores)
    );

    loadCareerDNA();
}

/* Run automatically when the homepage is ready. */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCareerDNA);
} else {
    loadCareerDNA();
}

/* Allow other scripts to refresh Career DNA. */
window.loadCareerDNA = loadCareerDNA;
window.getCareerDNAScores = getCareerDNAScores;
window.saveCareerDNAScores = saveCareerDNAScores;
