const form = document.getElementById("regForm");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const specialRegex = /[!@#$%^&*]/;


// helpers
function setError(input,msg,id){
    input.classList.add("error");
    input.classList.remove("success");
    document.getElementById(id).innerText = msg;
}

function setSuccess(input,id){
    input.classList.remove("error");
    input.classList.add("success");
    document.getElementById(id).innerText = "";
}


// ======================
// LIVE VALIDATION
// ======================

username.oninput = () =>
    username.value.trim()? setSuccess(username,"uErr") :
    setError(username,"Required","uErr");


email.oninput = () =>
    emailRegex.test(email.value)? setSuccess(email,"eErr") :
    setError(email,"Invalid email","eErr");


phone.oninput = () =>
    phoneRegex.test(phone.value)? setSuccess(phone,"pErr") :
    setError(phone,"10 digits only","pErr");



// ======================
// CONFIRM CHECK FUNCTION (NEW)
// ======================

function checkConfirm(){

    const val = confirmPassword.value;

    if(val === ""){
        confirmPassword.classList.remove("success");
        confirmPassword.classList.remove("error");
        document.getElementById("cErr").innerText = "";
        return;
    }

    if(password.value === val){
        setSuccess(confirmPassword,"cErr");
    }
    else{
        setError(confirmPassword,"Passwords not matching","cErr");
    }
}




// ===== PASSWORD CHECKLIST =====

password.oninput = () => {

    const val = password.value;

    let okLen = val.length >= 7;
    let okCap = /[A-Z]/.test(val);
    let okNum = /[0-9]/.test(val);
    let okSpec = specialRegex.test(val);

    len.classList.toggle("ok", okLen);
    cap.classList.toggle("ok", okCap);
    num.classList.toggle("ok", okNum);
    spec.classList.toggle("ok", okSpec);

    if(okLen && okCap && okNum && okSpec)
        setSuccess(password,"passErr");
    else
        setError(password,"Password requirements not met","passErr");

    checkConfirm(); // 🔥 LIVE update confirm
};



// ===== CONFIRM =====

confirmPassword.oninput = checkConfirm;



// ===== SHOW/HIDE =====

togglePass.onclick = () =>
    password.type = password.type==="password"?"text":"password";

toggleConfirm.onclick = () =>
    confirmPassword.type = confirmPassword.type==="password"?"text":"password";



// ===== SUBMIT =====

form.addEventListener("submit",e=>{
    e.preventDefault();

    const errors = document.querySelectorAll(".error");

    if(errors.length === 0){
        success.innerText="Account Created Successfully ✔";
    }
});



// ===== jQuery task =====

$(document).ready(function(){
    $("button").text("Create Account");
});
