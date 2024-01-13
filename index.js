let selected = 0;
nums = document.querySelectorAll(".num");
nums.forEach((b) => {
    b.addEventListener("click", () => {
        // selected = Number(b.innerHTML);
        selected = b;
        selected.classList.add("select");

        nums.forEach((a) => {
            if (a !== selected) {
                a.classList.remove("select");
            }
        });
    });
});
document.querySelectorAll(".box").forEach((b) => {
    b.addEventListener("click", () => {
        if (selected) {
            b.innerHTML = selected.innerHTML;
        }
    });
});
