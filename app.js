fetch("quiz.json")
.then(function(response) {
    return response.json();
})
.then(function(data) {
    const infos = data;

    // MODIFIER LA MARGE TOP DU  TITRE QUAND ON PASSE SUR LE QUESTIONNAIRE // 
    const titleWebsite = document.querySelector(".quiz__title");

    function styleTitleWebsite() {
        titleWebsite.style = "margin-top: 50px"
    }

    // FAIRE DISPARAITRE L'ACCUEIL POUR FAIRE APPARAITRE LE QUESTIONNAIRE //
    const btnQuizPlay = document.querySelector(".quiz__play");
    const quizIntro = document.querySelector(".quiz__intro");
    const quizPlay = document.querySelector(".quiz__play");
    const quizContainer = document.querySelector(".quiz_container");

    btnQuizPlay.addEventListener("click", homeScreenDisplayNone);

    function homeScreenDisplayNone() {
        quizIntro.style.display = "none";
        quizPlay.style.display = "none";
        quizContainer.style.display ="flex";
        replaceContent();
        styleTitleWebsite()
    }

    // MÉLANGER LA TABLE DANS LE JSON //
    let randomizeJson = infos.sort(function(a, b) {
        return Math.random() - 0.5;
    })

    // INDEX POUR PROGRESSER DANS LE JSON // 
    let index = 0;

    // CIBLER LE SCORE //
    const score = document.querySelector(".quiz_container__score");
    let newScore = 0;

    // STOPPER LE REFRESH DU FORMULAIRE //
    const btnAnswerValidation = document.querySelector(".quiz_container_buttons__validation");

    btnAnswerValidation.addEventListener("click", btnValidation);

    function btnValidation(event) {
        event.preventDefault();
        checkAnswer(); 

        // METTRE A JOUR LE SCORE //
        score.textContent = "Votre score : " + newScore + "pts";  

        // FAIRE APPARAITRE LA MODAL APRÈS AVOIR RÉPONDU A UNE QUESTION //
        const modal = document.querySelector(".quiz_modal");
        modal.style = "display: block;"
        
        // MODIFIER LE HTML DE LA MODAL PAR LE TEXTE DU JSON //
        const modalText = document.querySelector(".quiz_modal_content__text");
        modalText.textContent = randomizeJson[index].modal;
        
        // FERMER LA MODAL //
        const closeModalIcon = document.querySelector(".quiz_modal_content_close");
        closeModalIcon.addEventListener("click", closeModal);
        
        function closeModal() {
            modal.style = "display: none;"
        }

        btnNextQuestion.style.display = "block"
        btnAnswerValidation.style.display = "none"
    }

    const btnNextQuestion = document.querySelector(".quiz_container_buttons__next");
        
    btnNextQuestion.addEventListener("click", nextQuestion);

    // STOPPER LE REFRESH DU FORMULAIRE //
    const questionsForm = document.querySelector(".quiz_container");

    function nextQuestion(event) {
        event.preventDefault();
                 
        // RENDRE LE BOUTON VALIDER DE NOUVEAU FONCTIONNEL //
        btnAnswerValidation.removeAttribute("disabled");

        // AJOUTER 1 A L'INDEX POUR CHANGER DE QUESTION //
        ++index;

        questionsForm.reset();

        // RESET LE STYLE DES INPUT //
        choice1Text.style = "background-color : ";
        choice2Text.style = "background-color : ";
        choice3Text.style = "background-color : ";
        choice4Text.style = "background-color : ";
        replaceContent();

        console.log(index);
        console.log(newScore);

        displayLeaderboard();
        btnAnswerValidation.style.display = "block"
        btnNextQuestion.style.display = "none"
    }

    // CHANGER DE COULEUR ET +1 AU SCORE SI RÉPONSE JUSTE //
    function checkAnswer() {
        if (typechoice1.checked && randomizeJson[index].answers[0] == randomizeJson[index].goodAnswer) {
            choice1Text.style = "background-color: green;";
            newScore++;
        } if (typechoice2.checked && randomizeJson[index].answers[1] == randomizeJson[index].goodAnswer) {
            choice2Text.style = "background-color: green;";
            newScore++;
        } if (typechoice3.checked && randomizeJson[index].answers[2] == randomizeJson[index].goodAnswer) {
            choice3Text.style = "background-color: green;";
            newScore++;
        } if (typechoice4.checked && randomizeJson[index].answers[3] == randomizeJson[index].goodAnswer) {
            choice4Text.style = "background-color: green;";
            newScore++;
        }

    // CHANGER DE COULEUR SI RÉPONSE FAUSSE //

        if (typechoice1.checked && randomizeJson[index].answers[0] != randomizeJson[index].goodAnswer) {
            choice1Text.style = "background-color: red;"
        } if (typechoice2.checked && randomizeJson[index].answers[1] != randomizeJson[index].goodAnswer) {
            choice2Text.style = "background-color: red;"
        } if (typechoice3.checked && randomizeJson[index].answers[2] != randomizeJson[index].goodAnswer) {
            choice3Text.style = "background-color: red;"
        } if (typechoice4.checked && randomizeJson[index].answers[3] != randomizeJson[index].goodAnswer) {
            choice4Text.style = "background-color: red;"
        } 
    }
    
    const questionText = document.querySelector(".quiz_container__question");
    const typechoice1 = document.querySelector(".quiz_container__input1");
    const typechoice2 = document.querySelector(".quiz_container__input2");
    const typechoice3 = document.querySelector(".quiz_container__input3");
    const typechoice4 = document.querySelector(".quiz_container__input4");

    const choice1Text = document.querySelector(".quiz_container__label1");
    const choice2Text = document.querySelector(".quiz_container__label2");
    const choice3Text = document.querySelector(".quiz_container__label3");
    const choice4Text = document.querySelector(".quiz_container__label4");



    // REMPLACER LE CONTENU DU HTML PAR CELUI DU JSON //
    function replaceContent() {
        questionText.textContent = randomizeJson[index].question;

        choice1Text.textContent = randomizeJson[index].answers[0];
        choice2Text.textContent = randomizeJson[index].answers[1];
        choice3Text.textContent = randomizeJson[index].answers[2];
        choice4Text.textContent = randomizeJson[index].answers[3];     
    }

    // FAIRE APPARAITRE LE LEADERBOARD A LA FIN DU QUESTIONNAIRE //
    const leaderboardPage = document.querySelector(".quiz_leaderboard")

    function displayLeaderboard() {
        if(index >= 17) {
            questionsForm.style = "display: none;";
            leaderboardPage.style = "display: flex;";
            displayScores();
        }
    }

                         // GESTION DU LEADERBOARD // 

    const player1 = document.querySelector(".quiz_leaderboard_player1__name") ;
    const player2 = document.querySelector(".quiz_leaderboard_player2__name") ;
    const player3 = document.querySelector(".quiz_leaderboard_player3__name") ;
    const player4 = document.querySelector(".quiz_leaderboard_player4__name") ;
    const player5 = document.querySelector(".quiz_leaderboard_player5__name") ;
    
    const scorePlayer1 = document.querySelector(".quiz_leaderboard_player1__score");
    const scorePlayer2 = document.querySelector(".quiz_leaderboard_player2__score");
    const scorePlayer3 = document.querySelector(".quiz_leaderboard_player3__score");
    const scorePlayer4 = document.querySelector(".quiz_leaderboard_player4__score");
    const scorePlayer5 = document.querySelector(".quiz_leaderboard_player5__score");

    const btnLeaderboardValidation = document.querySelector(".quiz_leaderboard_pseudo__validation");
    const playerName = document.querySelector(".quiz_leaderboard_pseudo__input");
    
    function storage () {

               // CRÉER MON TABLEAU VIDE //
               if( localStorage.getItem("data") == null) {
                localStorage.setItem("data", "[]");
            }
    
            // CREER LES OBJETS //
            let leaderboardPlayers = {
                name: playerName.value,
                score: newScore
            }
    
            let old_data = JSON.parse(localStorage.getItem("data"));
            old_data.push(leaderboardPlayers);
    
            localStorage.setItem("data", JSON.stringify(old_data));
    
            displayScores()

            leaderboardPage.reset();
    }

    function displayScores() {

        let leaderboardStored = JSON.parse(localStorage.getItem("data"));
    
            // TRIER LE TABLEAU DES SCORES //
            leaderboardStored.sort((a, b) => {
                return b.score - a.score
            })
    
            console.log(leaderboardStored);
            player1.textContent = leaderboardStored[0].name;
            scorePlayer1.textContent = leaderboardStored[0].score + "pts";
            player2.textContent = leaderboardStored[1].name;
            scorePlayer2.textContent = leaderboardStored[1].score + "pts";
            player3.textContent = leaderboardStored[2].name;
            scorePlayer3.textContent = leaderboardStored[2].score + "pts";
            player4.textContent = leaderboardStored[3].name;
            scorePlayer4.textContent = leaderboardStored[3].score + "pts";
            player5.textContent = leaderboardStored[4].name;
            scorePlayer5.textContent = leaderboardStored[4].score + "pts";
    }

    btnLeaderboardValidation.addEventListener("click", LeaderboardValidation);  

    function LeaderboardValidation(event) {
        event.preventDefault();
        storage();
    }
})