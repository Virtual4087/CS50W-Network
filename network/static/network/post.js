document.querySelectorAll("#likes").forEach(element => {
    element.onclick = function(){
        const id = element.parentElement.id
        fetch(`${id}/edit`, {
            method : "POST",
            headers : {
                "Source" : "like_unlike",
                "Content-Type" : "application/json",
                "X-CSRFToken" : element.dataset.csrf
            },
            body : {
                 "perform" : "like/unlike"
            }
        })
        .then(response => response.json())
        .then(data => {
            element.innerText = data.likes;
        })
    }
})