let selected=0
document.querySelectorAll(".num").forEach((b)=>{
    b.addEventListener("click",()=>{
        selected=Number(b.innerHTML)
        // b.classList.add("select")
    });
});