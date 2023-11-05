window.onload = () => {
    let btnSign = document.querySelector(".btn-sign");
    let btnCross = document.querySelector(".btn-cross");
    let signIn = document.querySelector(".sign-in");

    btnSign.addEventListener("click", function(e){
        e.preventDefault();
        signIn.classList.remove("d-none");
    });
    btnCross.addEventListener("click", function(e){
        e.preventDefault();
        signIn.classList.add("d-none");
    });
}