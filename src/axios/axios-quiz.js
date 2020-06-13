import axios from "axios"

export default axios.create({
    baseURL: "https://react-quiz-1fe41.firebaseio.com/"
})