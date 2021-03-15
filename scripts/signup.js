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
		let name = $("[name='name']").val();
		let password = $("[name='pass']").val();
		const user = {
			login: login,
			password: password,
			full_name: name,
		};
		ConnectyCube.users.signup(user)
			.then((user) => {
				window.location.href = "login.html";
			})
			.catch((error) => {
				alert("User already registered!");
				$("[name='login']").val("");
				$("[name='name']").val("");
				$("[name='pass']").val("");
			});
	});
});