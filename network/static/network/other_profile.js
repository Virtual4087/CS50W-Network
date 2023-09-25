document.querySelector("#follow_button").onclick = function() {
    fetch("", {
        method: "POST",
        headers: {
            "Source": "follow_unfollow",
            "Content-Type" : "application/json",
            "X-CSRFToken" : this.dataset.csrf
        },
        body: JSON.stringify({
            "task": this.innerText
        })
    })
    .then(response => {
        if(response.ok){
            return response.json()
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
    
    followers = document.querySelector("#profile_followers_number")
    if(this.innerText === "follow"){
        this.innerText = "unfollow";
        followers.innerText = parseInt(followers.innerText) + 1;
        this.classList.replace("btn-outline-primary", "btn-outline-danger")
    }
    else{
        this.innerText = "follow";
        followers.innerText = parseInt(followers.innerText) - 1;
        this.classList.replace("btn-outline-danger", "btn-outline-primary");
    }
}