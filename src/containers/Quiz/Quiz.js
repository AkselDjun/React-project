import React, { Component } from 'react';
import classes from "./quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"

class Quiz extends Component {
    state = {
        quiz: [
            {
                question: "Какого цвета небо?",
                rightAnswerId: 2,
                answers: [
                    { text: "Черного", id: 1 },
                    { text: "Синего", id: 2 },
                    { text: "Красного", id: 3 },
                    { text: "Розового", id: 4 },
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log("answer Id: ", answerId)
    }

    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                        question={this.state.quiz[0].question}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz
