window.onload = () => {
    let btnSign = document.querySelector(".btn-sign");
    let btnLog = document.querySelector(".btn-log");
    let modalWindow = document.querySelector(".modal-window");

    let signIn = document.querySelector(".sign-in");
    let btnCrossSign = document.querySelector(".sign-in>.btn-cross");
    let logIn = document.querySelector(".log-in");
    let btnCrossLog = document.querySelector(".log-in>.btn-cross");

    // Sign
    btnSign.addEventListener("click", function(e){
        e.preventDefault();
        modalWindow.classList.remove("d-none");
        signIn.classList.remove("d-none");
    });
    btnCrossSign.addEventListener("click", function(e){
        e.preventDefault();
        modalWindow.classList.add("d-none");
        signIn.classList.add("d-none");
    });

    // Log
    btnLog.addEventListener("click", function(e){
        e.preventDefault();
        modalWindow.classList.remove("d-none");
        logIn.classList.remove("d-none");
    });
    btnCrossLog.addEventListener("click", function(e){
        e.preventDefault();
        modalWindow.classList.add("d-none");
        logIn.classList.add("d-none");
    });
}