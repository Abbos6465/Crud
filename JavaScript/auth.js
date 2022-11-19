"use strict";

function password(){
  $('.password__slash').innerHTML='<i class="bi bi-eye-slash-fill"></i>'
}

password();

$('.password__slash').addEventListener('click',(e)=>{
  if(e.target.classList.contains('bi-eye-slash-fill')){
    $('.password').setAttribute('type','text');
    $('.password').setAttribute('type','text');
    e.target.classList.remove('bi-eye-slash-fill');
    e.target.classList.add('bi-eye-fill');   
  }
  else{
    $('.password').setAttribute('type','password');
    e.target.classList.remove('bi-eye-fill');
    e.target.classList.add('bi-eye-slash-fill'); 
  }
})

const BASE_URL = "https://n36-todolist.herokuapp.com"



const registration = () => {
   const username = $('#userName').value.trim();
   const password = $('#userPassword').value.trim();

   const params = {
      userName: username,
      userPassword: password
   }

   console.log(params);

   fetch(`${BASE_URL}/signup`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(params)
      }).then((result) => result.json())
      .then(res => {
         console.log(res);

         if (res.message) {
          $('.modal-toast').classList.remove('alert-success');
          $('.modal-toast').classList.add('alert-danger');
            $('.modal-toast').innerHTML = `<strong>${res.message}</strong>`;
            $('.modal-toast').classList.remove('hide-toast');

            setTimeout(() => {
               $('.modal-toast').classList.add('hide-toast');
            }, 2000)
         }
         if(res.token){
            localStorage.setItem('token', res.token)
            localStorage.setItem('userName', params.login)
          $('.modal-toast').classList.remove('alert-danger');
          $('.modal-toast').classList.add('alert-success');
          $('.modal-toast').innerHTML = `<strong>REGISTRATION SUCCESS</strong>`;
          $('.modal-toast').classList.remove('hide-toast');

          setTimeout(() => {
             $('.modal-toast').classList.add('hide-toast');
             window.location.replace("./index.html");
          }, 2000)
         }
      })
}

$('#reg').addEventListener("submit", (e) => {
   e.preventDefault();
   registration()

})
