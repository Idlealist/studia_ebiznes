async function sendMessage() {
    const message = document.getElementById("input").value;
    const responseBox = document.getElementById("response");
    const loading = document.getElementById("loading");

    responseBox.innerText = "";
    loading.classList.remove("hidden");

    const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    const data = await res.json();

    loading.classList.add("hidden");
    responseBox.innerText = data.response;
}
