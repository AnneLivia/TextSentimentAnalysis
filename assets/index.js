document.addEventListener("DOMContentLoaded", () => {
    const img = document.querySelector(".animated-img");
    const text = document.querySelector("#user_feelings");
    const score = document.querySelector("#score");
    const spinner = document.querySelector(".loading");

    spinner.className = "loading loader";

    text.addEventListener("change", (e) => {
        spinner.className = "loading loader";
        predict(e.target.value);
    });

    // para colocar o gif de curious novamente
    text.addEventListener("keydown", ({ key }) => {
        if (["Backspace", "Delete"].includes(key)) {
            img.src = "assets/images/curious.gif";
        }
    });

    const sentiment = ml5.sentiment('movieReviews', () => {
        console.log('Model Loaded!');
        spinner.className = "loading"
    });

    // When the model is loaded
    const predict = (text) => {
        const prediction = sentiment.predict(text);

        spinner.className = "loading";

        if (prediction.score < 0.70) {
            img.src = "assets/images/sad.gif";
        } else {
            img.src = "assets/images/happy.gif";
        }
        score.innerHTML = "<span>Score: </span>" + prediction.score;
    }
});