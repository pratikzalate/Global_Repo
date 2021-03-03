
const LoggedInUser =localStorage.getItem("LoggedInUser");
if(LoggedInUser==""){
	window.location.href="./index.html";
}

var logout_btn=document.getElementById("logout");
if(logout_btn){

	logout_btn.addEventListener("click", function(){
	alert("logout")
	localStorage.setItem("LoggedInUser","");

	});

}

window.onload = function(){
	var LoggedInUser=localStorage.getItem("LoggedInUser");
	if(LoggedInUser){
		
		let users_data = JSON.parse(localStorage.getItem('users_data'));
		console.log("in getdata");
		var index=-1;
		
		for(let i=0;i<users_data.length;i++){		
			if(users_data[i].uname===LoggedInUser){
				index=i;
				break;
			}
		}

		let u=users_data[index];
		console.log(u);
		document.getElementById("username").innerHTML=u.uname;

		document.getElementById("f-name").value=u.fname;
		document.getElementById("f-name").readOnly=true;
		
		document.getElementById("l-name").value=u.lname;
		document.getElementById("l-name").readOnly=true;

		document.getElementById("address").value=u.address;
		document.getElementById("address").readOnly=true;

		if(u.gender=="Male"){
			document.getElementById("m").checked=true;
			document.getElementById("m").readOnly=true;

		}else if(u.gender=="Female"){
			document.getElementById("f").checked=true;
			document.getElementById("f").readOnly=true;
		}else{
			document.getElementById("o").checked=true;
			document.getElementById("o").readOnly=true;
		}

		updateUser(u,index,users_data);
		
	}
}

function updateUser(u,index,users_data){

	var save=document.getElementById("save-btn");
	save.onclick=()=>{
		
		fname=document.getElementById("f-name");
		lname=document.getElementById("l-name");
		address=document.getElementById("address");
		var gender;
		if (document.getElementById('m').checked) {
			gender = document.getElementById('m').value;
		}else if (document.getElementById('f').checked) {
			gender = document.getElementById('f').value;
		}else{
			gender = document.getElementById('o').value;
		}

		if(update_form_validate(fname,lname,address)) {
			u.fname=fname.value;
			u.lname=lname.value;
			u.address=address.value;
			u.gender=gender;
			users_data[index]=u;
			try{
				localStorage.setItem("users_data",JSON.stringify(users_data));
			}catch(error) {
				alert(error);
			}
			alert("Data Saved Successfully");
			document.getElementById("f-name").readOnly=true;
			document.getElementById("l-name").readOnly=true;
			document.getElementById("address").readOnly=true;
			document.getElementById("m").readOnly=true;
			document.getElementById("f").readOnly=true;
			document.getElementById("o").readOnly=true;
			document.getElementById("edit-info-btn").style.display="block";
			document.getElementById("update-info-btn").style.display="none";
		}
	}
}

function update_form_validate(fname,lname,address,gender){

	if(fname.value=="") {
		alert("Enter first name");
		fname.focus();
		return false;
	}

	if(lname.value==""){
		alert("Enter last name");
		lname.focus();
		return false;
	}

	if(address.value==""){
		alert("Enter address");
		address.focus();
		return false;
	}
	
	return true;
}

var edit=document.getElementById("edit-btn");
edit.onclick=()=>{
	document.getElementById("f-name").readOnly=false;
	document.getElementById("l-name").readOnly=false;
	document.getElementById("address").readOnly=false;
	document.getElementById("m").readOnly=false;
	document.getElementById("f").readOnly=false;
	document.getElementById("o").readOnly=false;
	document.getElementById("edit-info-btn").style.display="none";
	document.getElementById("update-info-btn").style.display="block";
}	

var cancle=document.getElementById("cancle-btn");
cancle.onclick=()=>{
	document.getElementById("edit-info-btn").style.display="block";
	document.getElementById("update-info-btn").style.display="none";
}	

