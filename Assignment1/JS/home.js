// create local storage as users_data if not created earlier
if(!localStorage.getItem('users_data')) {		
	localStorage.setItem('users_data', JSON.stringify([]));

}

// Check click on login button
var login_btn=document.getElementById("login-btn");
if(login_btn){
	login_btn.addEventListener("click", auth_user);         // call to auth_user function
}

function auth_user(){
   var uname=document.getElementById("username").value;
   var upass=document.getElementById("password").value;
	if(uname!=="" && upass!=="") {	
		
		if(isAuthenticated(uname,upass)) {	
            //user atherization successful
			console.log("Login Successful!");
			localStorage.setItem("LoggedInUser",uname);
			window.location.href="./profile.html";

		}else{
			alert("Invalid credentials");	
		}
	
	}else{		
		var login_msg=document.getElementById("login_msg");
		login_msg.style.color= 'red';
		login_msg.innerHTML="Please enter UserID and password.";
	}
}
	
function isAuthenticated(uname,pass) {	
	let u = JSON.parse(localStorage.getItem('users_data'));
	console.log(u);
	for(let i=0;i<u.length;i++) {

		console.log("uname:"+ u[i].uname+ " pass:"+u[i].password);		
		if(u[i].uname===uname && u[i].password===pass)
    		return true;
	}
	return false;

}

// Check register button clicked or not
var register_btn=document.getElementById("register-btn");
if(register_btn){
	register_btn.addEventListener("click", addUser);        // call to addUser function
}

function User(uname,fname,lname,gender,password,address){
	this.uname=uname;
	this.fname=fname;
	this.lname=lname;
	this.gender=gender;
	this.password=password;
	this.address=address;
	this.todos=[];
}

function addUser() {
	let uname=document.getElementById("username").value;
	let fname=document.getElementById("f-name").value;
	let lname=document.getElementById("l-name").value;
	let address=document.getElementById("address").value;
	let password=document.getElementById("password").value;
	let retype_password=document.getElementById("retype-password").value;
	let gender;
	if (document.getElementById('m').checked) {
 	 gender = document.getElementById('m').value;
	}else if (document.getElementById('f').checked) {
 	 gender = document.getElementById('f').value;
	}else{
		 gender = document.getElementById('o').value;
	}
console.log("un:"+uname+" fn:"+fname+" ln:"+lname+" add:"+address+" pass:"+password+" rp: " +retype_password+" gen:"+gender)
	
	if(uname==""|| fname==""|| lname=="" ||gender==""|| address=="" ||password==""||retype_password=="") {
		alert("All fileds are mandetory.");
	}else if(password!==retype_password){
		alert("Invalid password!");
	}else{
	
        let new_user=new User(uname,fname,lname,gender,password,address);
        console.log(new_user);
            
        try{
            let u = JSON.parse(localStorage.getItem('users_data'));
            u.push(new_user);
            localStorage.setItem("users_data",JSON.stringify(u));
            alert("Registration Successful!");
			localStorage.setItem("LoggedInUser",uname);
			window.location.href="profile.html";

        }catch(error){
             console.log(error);
        }
	}	


}