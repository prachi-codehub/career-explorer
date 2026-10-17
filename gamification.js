/* =========================================================
   CAREER SKILL NAVIGATOR
   GAMIFICATION ENGINE
========================================================= */

const XP_REWARDS = {
    profile: 50,
    assessment: 300,
    career: 150,
    roadmapAdd: 50,
    roadmapComplete: 100,
    course: 50,
    internship: 25,
    resume: 150
};


/* =========================================================
   GET CURRENT XP
========================================================= */

function getCareerXP() {

    return Number(
        localStorage.getItem("careerXP")
    ) || 0;

}


/* =========================================================
   ADD XP
========================================================= */

function addCareerXP(amount, reason = "") {

    let currentXP =
        getCareerXP();

    currentXP += Number(amount) || 0;

    currentXP =
        Math.min(
            5000,
            currentXP
        );

    localStorage.setItem(
        "careerXP",
        currentXP
    );

    localStorage.setItem(
        "lastXPReason",
        reason
    );

    return currentXP;

}


/* =========================================================
   PREVENT DUPLICATE REWARDS
========================================================= */

function awardCareerXP(
    action,
    amount,
    reason = ""
) {

    const key =
        "xpAwarded_" + action;

    if (
        localStorage.getItem(key) === "true"
    ) {

        return getCareerXP();

    }

    const total =
        addCareerXP(
            amount,
            reason
        );

    localStorage.setItem(
        key,
        "true"
    );

    return total;

}


/* =========================================================
   LEVEL
========================================================= */

function getCareerLevel() {

    const xp =
        getCareerXP();

    return Math.min(
        50,
        Math.floor(xp / 100) + 1
    );

}


/* =========================================================
   LEVEL PROGRESS
========================================================= */

function getLevelProgress() {

    const xp =
        getCareerXP();

    const level =
        getCareerLevel();

    if (level >= 50) {

        return 100;

    }

    return xp % 100;

}


/* =========================================================
   RESET GAMIFICATION
========================================================= */

function resetCareerGamification() {

    localStorage.removeItem(
        "careerXP"
    );

    Object.keys(
        localStorage
    )
    .filter(
        key =>
            key.startsWith(
                "xpAwarded_"
            )
    )
    .forEach(
        key =>
            localStorage.removeItem(
                key
            )
    );

}