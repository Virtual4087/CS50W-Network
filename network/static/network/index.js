document.addEventListener("DOMContentLoaded", () => {
    function RemovingNullError(element){
        if (document.querySelector(element)){
            return document.querySelector(element)
        }
        else{
            return false
        }
    }

    RemovingNullError("#create_opinion").onclick = () => {
        RemovingNullError("#new_opinion").style.display = "block";
    }

    RemovingNullError("#follow_button").onclick = function() {
        fetch("", {
            method: "PUT",
            headers: {
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
        
        followers = RemovingNullError("#profile_followers_number")
        if(this.innerText === "follow"){
            this.innerText = "unfollow"
            followers.innerText = parseInt(followers.innerText) + 1
        }
        else{
            this.innerText = "follow"
            followers.innerText = parseInt(followers.innerText) - 1
        }

    }
})
