document.addEventListener("DOMContentLoaded", function(){
    
    // document.querySelectorAll(".date_posted").forEach(element => {
    //     const current = new Date();
    //     const post_date = new Date(element.innerText);
    //     let diff = (current - post_date)/1000;
    //     if (diff >= 60){ 
    //         diff /= 60;
    //         if(diff >= 60){
    //             diff /= 60;
    //             if(diff >= 24){
    //                 diff /= 24;
    //                 if(diff >= 7){
    //                     diff /= 7;
    //                     if(diff >= 4){
    //                         diff /= 4;
    //                         if (diff >= 12){
    //                             element.innerText = '{{opinion.date|date:"M, j"}}';
    //                         }
    //                         else{
    //                             element.innerText = `${Math.floor(diff)}mon ago`;
    //                         }
    //                     }
    //                     else{
    //                         element.innerText = `${Math.floor(diff)}w ago`;
    //                     }
    //                 }
    //                 else{
    //                     element.innerText = `${Math.floor(diff)}d ago`;  
    //                 }
    //             }
    //             else{
    //                 element.innerText = `${Math.floor(diff)}h ago`;
    //             }
    //         }
    //         else{
    //             element.innerText = `${Math.floor(diff)}m ago`;
    //         }
    //     }
    //     else{
    //         element.innerText = `${Math.floor(diff)}s ago`;
    //     }
    // })

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
                    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-up-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="none" fill="#D13903" stroke-linecap="round" stroke-linejoin="round" style="color: #D13903;">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" stroke-width="0" fill="currentColor" />
                    </svg>`
                    element.classList.replace("like", "unlike")
                }else{
                    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-up" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    </svg> `
                    element.classList.replace("unlike", "like")
                }
            })
        }
    })
})
