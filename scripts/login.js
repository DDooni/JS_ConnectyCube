const CREDENTIALS = {
    appId: 4408,
    authKey: "bnr25Fv5Znum9CW",
    authSecret: "2K3RwtGNzW4BujA",
};

ConnectyCube.init(CREDENTIALS);

ConnectyCube.createSession()
    .then((session) => { })
    .catch((error) => { });

$(() => {
    document.querySelector("#form__sbmt-btn").addEventListener("click", (e) => {
        e.preventDefault();
        let login = $("[name='login']").val();
        let password = $("[name='pass']").val();
        const userCredentials = {
            login: login,
            password: password,
        };

        ConnectyCube.login(userCredentials)
            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "info.html";
            })
            .catch((error) => {
                alert("Invalid data!");
                $("[name='login']").val("");
                $("[name='pass']").val("");
            });
    });
});