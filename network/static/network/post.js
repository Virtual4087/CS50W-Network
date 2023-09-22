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
            })
        }
    })
})
