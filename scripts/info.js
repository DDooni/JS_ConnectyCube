try{
    let user = localStorage.getItem("user");

    const CREDENTIALS = {
    appId: 4408,
    authKey: "bnr25Fv5Znum9CW",
    authSecret: "2K3RwtGNzW4BujA",
    };

    ConnectyCube.init(CREDENTIALS);

    ConnectyCube.createSession(user)
        .then((session)=>{
            const searchParams = {login: JSON.parse(user).login}

            ConnectyCube.users
                .get(searchParams)
                .then((result)=>{
                    $("[name='id']").val(result.user.id)
                    $("[name='login']").val(result.user.login)
                    $("[name='name']").val(result.user.full_name)
                    $("[name='create']").val(result.user.created_at)
                    $("[name='request']").val(result.user.last_request_at)
                    $("[name='update']").val(result.user.updated_at)
                })
                .catch((error)=>{})
        })
        .catch((error)=>{});

}
catch (e){
    alert("You are not authoriaed!");
    window.location.replace("login.html");
}

function logout(){
    this.addEventListener("click", (e)=>{
        e.preventDefault();

        localStorage.clear();
        ConnectyCube.logout().catch((error)=>{});
        window.location.replace("login.html")
    });
}

