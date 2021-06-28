const getButton = document.getElementById("user_form")
getButton.addEventListener("submit", getRequest)

function getRequest(event) {
    event.preventDefault()
    let movieId = event.target.movieId.value

    fetch(`/movies/${movieId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data){
            if(!movieId){
                for(let i in data) {
                    document.getElementById("results").innerHTML += data[i].movieTitle + "<br>"
                }
            } else {
                document.getElementById("results").innerHTML += data.movieTitle + "<br>"
            }
        })
}

const postButton = document.getElementById("movie_post")
postButton.addEventListener("submit", newPost)

function newPost(event, post) {
    event.preventDefault()
    let movieTitle = event.target.movieTitle.value
    let movieDirector = event.target.movieDirector.value
    post = {
        movieTitle: movieTitle,
        movieDirector:movieDirector
    }
    const options = {
        method: "POST",
        body: JSON.stringify(post),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }
    return fetch('/movies', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(error => console.error('error: ', error))
}