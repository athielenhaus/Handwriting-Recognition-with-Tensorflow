var answer
var score = 0
var backgroundImages = []

function nextQuestion() {
    const n1 = Math.round(Math.random() * 5);
    const n2 = Math.round(Math.random() * 4);
    document.getElementById('n1').innerHTML = n1;
    document.getElementById('n2').innerHTML = n2;
    answer = n1 + n2;
}

function backgroundChange() {
    document.body.style.backgroundImage = backgroundImages;
}

function checkAnswer() {
    const prediction = predictImage();
    console.log(`answer:  ${answer} prediction: ${prediction}`);

    if (prediction == answer) {
        score ++;
        console.log(`Correct! Score: ${score}`);
        if (score <= 6) {
            backgroundImages.push(`url('images/bg/background${score}.svg')`);
            }
        else {
            alert("Congratulations, you win!")
            score = 0
            backgroundImages = []
        }
        backgroundChange()
    } else {
        if (score > 0){score --;}
        backgroundImages.pop()
        alert("Oops! Check your calculations and make sure you write your response neatly!")
        console.log(`Wrong! Score: ${score}`)
        setTimeout(backgroundChange, 1500);
    }
}