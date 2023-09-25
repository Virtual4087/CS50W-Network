document.addEventListener("DOMContentLoaded", function(){
    
    document.querySelectorAll(".date_posted").forEach(element => {
        const current = new Date();
        const post_date = new Date(element.innerText);
        let diff = (current - post_date)/1000;
        if (diff >= 60){ 
            diff /= 60;
            if(diff >= 60){
                diff /= 60;
                if(diff >= 24){
                    diff /= 24;
                    if(diff >= 7){
                        diff /= 7;
                        if(diff >= 4){
                            diff /= 4;
                            if (diff >= 12){
                                element.innerText = '{{opinion.date|date:"M, j"}}';
                            }
                            else{
                                element.innerText = `${Math.floor(diff)}mon ago`;
                            }
                        }
                        else{
                            element.innerText = `${Math.floor(diff)}w ago`;
                        }
                    }
                    else{
                        element.innerText = `${Math.floor(diff)}d ago`;  
                    }
                }
                else{
                    element.innerText = `${Math.floor(diff)}h ago`;
                }
            }
            else{
                element.innerText = `${Math.floor(diff)}m ago`;
            }
        }
        else{
            element.innerText = `${Math.floor(diff)}s ago`;
        }
    })

    document.querySelectorAll("#like_icon").forEach(element => {
        element.onclick = function(){
            const id = element.parentElement.parentElement.id
            fetch(`/${id}/edit`, {
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
                element.parentElement.querySelector('#like_count').innerText = data.likes;
                if (element.classList.contains("like")){
                    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`
                    element.classList.replace("like", "unlike")
                }else{
                    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`
                    element.classList.replace("unlike", "like")
                }
            })
        }
    })
})
