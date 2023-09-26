document.querySelectorAll("#toggle_menu").forEach(button => {
    button.addEventListener("blur", function(){
        button.querySelector('#menu').classList.remove('show');
    }) 
})

document.querySelectorAll("#edit_post").forEach(button => {
    button.onclick = function(){
        opinion = this.parentElement.parentElement.parentElement.parentElement
        title = opinion.querySelector('#title strong').innerText;
        body = opinion.querySelector('#body div').innerText;
        document.querySelector("#edit_title").value = title;
        document.querySelector("#edit_body").value = body;

        document.querySelector("#save_edit").onclick = function(){
            fetch(`/${opinion.id}/edit`, {
                method : "PUT",
                headers : {
                    "Source" : "Edit post",
                    "Content-Type" : "application/json",
                    "X-CSRFToken" : this.dataset.csrf
                },
                body : JSON.stringify({
                    title : document.querySelector("#edit_title").value,
                    body : document.querySelector("#edit_body").value
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                opinion.querySelector('#title strong').innerText = data.title
                opinion.querySelector('#body div').innerText = data.body
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        }

    }
});

document.querySelectorAll("#delete_post").forEach(button => {
    button.onclick = function(){
        opinion = this.parentElement.parentElement.parentElement.parentElement
        document.querySelector("#confirm_delete_button").onclick = function(){
            console.log("ok")
            fetch(`/${opinion.id}/edit`, {
                method : "DELETE",
                headers : {
                    "Source" : "Delete post",
                    "Content-Type" : "application/json",
                    "X-CSRFToken" : this.dataset.csrf
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                opinion.style.display = "none";
            })
            .catch(error => {
                console.log("Error: ", error)
            })
        }
    }
})