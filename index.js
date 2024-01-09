document.querySelectorAll(".num").forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log(box.innerHTML)
    });
});