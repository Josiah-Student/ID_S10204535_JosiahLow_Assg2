document.getElementById("btnSubmit").addEventListener("click", function(event){
    event.preventDefault();
    let bool = document.querySelector('input[name="radb"]:checked').value;

    console.log(bool);
    window.location.href = "results.html"
})