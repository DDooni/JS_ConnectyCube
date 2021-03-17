const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

const CREDENTIALS = {
	appId: 4408,
	authKey: "bnr25Fv5Znum9CW",
	authSecret: "2K3RwtGNzW4BujA",
};

ConnectyCube.init(CREDENTIALS);

ConnectyCube.createSession()
.then((session) => { })
.catch((error) => { });

class SignUpForm extends React.Component{
    render(){
        return  <form>
                    <Field type='text' label='Login' placeholder='ivan_big_boss'/>
                    <Field type='text' label='Fullname' placeholder='Ivanov Ivan'/>
                    <Field type='password' label='Password' placeholder='* * * * * * * * *'/>
                    <SignUpButton text='Sign Up'/><Redirect href='/login.html' text='Log In'/>
                </form>
    }
}

class LogInForm extends React.Component{
    render(){
        if (localStorage.getItem("user")!=null){
            window.location.href = "info.html";
        }
        else{
            return  <form>
                        <Field type='text' label='Login' placeholder='ivan_big_boss'/>
                        <Field type='password' label='Password' placeholder='* * * * * * * * *'/>
                        <LogInButton text='Log In'/><Redirect href='/' text='Sign Up'/>
                    </form>
        }
    }
}

class InfoForm extends React.Component{

    render(){

        let user = localStorage.getItem("user");

        if (user==null){
            window.location.replace("login.html");
        }
        else{
            ConnectyCube.createSession(user)
                .then((session)=>{
                    const searchParams = {login: JSON.parse(user).login}

                    ConnectyCube.users
                        .get(searchParams)
                        .then((result)=>{
                            $("input").eq(0).val(result.user.id)
                            $("input").eq(1).val(result.user.login)
                            $("input").eq(2).val(result.user.full_name)
                            $("input").eq(3).val(result.user.created_at)
                            $("input").eq(4).val(result.user.last_request_at)
                            $("input").eq(5).val(result.user.updated_at)
                        })
                        .catch((error)=>{alert("Error!")})
                })
                .catch((error)=>{alert("Error!")});
                return  <form>
                            <Field type='text' label='ID' disabled='true'/>
                            <Field type='text' label='Login' disabled='true'/>
                            <Field type='text' label='Full name' disabled='true'/>
                            <Field type='text' label='Created date' disabled='true'/>
                            <Field type='text' label='Last requested date' disabled='true'/>
                            <Field type='text' label='Updated date' disabled='true'/>
                            <LogOutButton href='/' text='Log Out'/>
                        </form>
        }
    } 
}

class Field extends React.Component{
    render(){
        return <div>
                <label>{this.props.label}</label>
                <input type={this.props.type} disabled={this.props.disabled} placeholder={this.props.placeholder}/>
            </div>
    }
}

class SignUpButton extends React.Component{
    submit(e){
        e.preventDefault();

        ConnectyCube.createSession()
            .then((session) => { })
            .catch((error) => { });

        let login = document.getElementsByTagName("input")[0].value;
        let fullname = document.getElementsByTagName("input")[1].value;
        let password = document.getElementsByTagName("input")[2].value;
        const user = {
			login: login,
			password: password,
			full_name: fullname,
		};

        ConnectyCube.users.signup(user)
			.then((user) => {
				window.location.href = "login.html";
			})
			.catch((error) => {
				alert("User already registered!");
                $("input").eq(0).val("");
                $("input").eq(1).val("");
                $("input").eq(2).val("");
			});
    }

    render(){
        return <input type='submit' id='form__sbmt-btn' value={this.props.text} onClick={this.submit}/>
    }
}

class LogInButton extends React.Component{
    submit(e){
        e.preventDefault();

        let login = document.getElementsByTagName("input")[0].value;
        let password = document.getElementsByTagName("input")[1].value;
        const user = {
			login: login,
			password: password,
		};

        ConnectyCube.login(user)
            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "info.html";
            })
            .catch((error) => {
                alert("An error occured!", error);
                $("input").eq(0).val("");
                $("input").eq(1).val("");
            });
    }

    render(){
        return <input type='submit' id='form__sbmt-btn' value={this.props.text} onClick={this.submit}/>
    }
}

class LogOutButton extends React.Component{

    press = ()=>{
        localStorage.clear();
        ConnectyCube.logout().catch((error)=>{});
        window.location.replace("login.html")
    };
    render(){
        return <a onClick={this.press}>{this.props.text}</a>
    }
}

class Redirect extends React.Component{
    render(){
        return <a href={this.props.href}>{this.props.text}</a>
    }
}

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={SignUpForm}/>
            <Route path='/login.html' component={LogInForm}/>
            <Route path='/info.html' component={InfoForm}/>
        </Switch>
    </Router>,
    document.getElementsByTagName("section")[0]
)