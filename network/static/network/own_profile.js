document.querySelectorAll("#toggle_menu").forEach(button => {
    button.addEventListener("blur", function(){
        button.querySelector('#menu').classList.remove('show');
    }) 
})

document.querySelectorAll("#edit_post").forEach(button => {
    button.onclick = function(){
        opinion = this.parentElement.parentElement.parentElement.parentElement;
        const title = opinion.querySelector('#title')
        const body = opinion.querySelector('#body')
        const likes = opinion.querySelector('#likes')
        const edit_title = opinion.querySelector('#edit_title')
        const edit_body = opinion.querySelector('#edit_body')
        const edit_buttons = opinion.querySelector('#edit_buttons')

        if(title.style.display == 'none'){
            return;
        }

        edit_title.querySelector('textarea').style.height = `${title.offsetHeight}px`;
        edit_body.querySelector('textarea').style.height = body.offsetHeight + 'px';
        title.style.display = 'none';
        body.style.display = 'none';
        likes.style.display = 'none';
        edit_title.style.display = 'block';
        edit_body.style.display = 'block';
        edit_buttons.style.display = 'block';
        edit_title.querySelector('textarea').value = title.innerText
        edit_body.querySelector('textarea').value = body.innerText

        opinion.querySelector("#save_edit").onclick = function(){
            fetch(`/${opinion.id}/edit`, {
                method : "PUT",
                headers : {
                    "Source" : "Edit post",
                    "Content-Type" : "application/json",
                    "X-CSRFToken" : this.dataset.csrf
                },
                body : JSON.stringify({
                    title : edit_title.querySelector('textarea').value,
                    body : edit_body.querySelector('textarea').value
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                edit_title.style.display = 'none';
                edit_body.style.display = 'none';
                edit_buttons.style.display = 'none';
                title.style.display = 'flex';
                body.style.display = 'flex';
                likes.style.display = 'flex';
                title.querySelector('strong').innerText = data.title;
                body.querySelector('div').innerText = data.body;

            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        }

        opinion.querySelector("#cancel_edit").onclick = function(){
            edit_title.style.display = 'none';
            edit_body.style.display = 'none';
            edit_buttons.style.display = 'none';
            title.style.display = 'flex';
            body.style.display = 'flex';
            likes.style.display = 'flex';
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