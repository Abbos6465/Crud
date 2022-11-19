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



const auth = () => {
   const username = $('#user').value.trim();
   const password = $('#password').value.trim();

   const params = {
    login: username,
    password: password
 }

 fetch(`${BASE_URL}/login`,{
   method: "POST",
   headers: {
      "Content-Type": "application/json",
   },
   body:JSON.stringify(params)
 }).then((result) => result.json())
 .then(res=>{
   if (res.message) {
      $('.modal-toast').classList.remove('alert-success');
      $('.modal-toast').classList.add('alert-danger');
      $('.modal-toast').innerHTML = `<strong>${res.message}</strong>`;
      $('.modal-toast').classList.remove('hide-toast');

      setTimeout(() => {
         $('.modal-toast').classList.add('hide-toast');
      }, 1000)
   }

   if (res.token) {

      localStorage.setItem('token', res.token)
      localStorage.setItem('userName', params.login)
      
      $('.modal-toast').classList.remove('alert-danger');
      $('.modal-toast').classList.add('alert-success');
      $('.modal-toast').innerHTML = `<strong>${"SUCCESFULLY LOGIN"}</strong>`;
      $('.modal-toast').classList.remove('hide-toast');
      setTimeout(() => {
         $('.modal-toast').classList.add('hide-toast');
         window.location.replace("./index.html")
      }, 1000)

   }
 })

  }

  $('#login').addEventListener("submit", (e) =>{
   e.preventDefault();
   auth();
  })