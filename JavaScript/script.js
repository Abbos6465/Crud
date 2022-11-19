"use strict";
// npx json ulash
// ----- npx json-server --watch db.json --port 3000 ------ //
let link='https://n36-todolist.herokuapp.com';
let authToken = localStorage.getItem('token'); 

// -------GET npx json-server --watch db.js --port 3000USER LIST ---------//
function getUser(){
  fetch(`${link}/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: authToken,
    },
  })
  .then((response)=>response.json())
  .then((result)=> renderData(result));
}

getUser();

// -------GET USER LIST END ---------//

// ------- RENDER FUNCTION -------//
function renderData(data=[]){

  let avarageScore=data.reduce((a,b)=>{
    return (a*1+b.score*1);
  },0)
  if(data.length>0){
  // $("#averager_score").innerHTML=(avarageScore/data.length*1).toFixed(2);
  $("#averager_score").innerHTML='<h3>100</h3>';  
}

  data.length>0 ?   
  data.forEach((e,i,a)=>{
 
    const tr = createElement('tr',"item", `
    <tr>
      <td>   ${e.id}</td>
    <td>${e.body}</td>
    <td>${e.user_id}</td>
    <td><button class="btn btn-primary" data-edit="${e.id}"  data-bs-toggle="modal" data-bs-target="#exampleModal">EDIT</button></td>
    <td><button class="btn btn-danger" data-del="${e.id}">DELETE</button></td>
  </tr>
    `);
  $('tbody').appendChild(tr);

  }): $("tbody").innerHTML='USERS LIST EMPTY'
} 

// ------- RENDER FUNCTION END-------//


const addUser=()=>{
  const userName=$("#userName").value.trim();
  const userScore=$("#userScore").value.trim();

  if(userName.length===0 || userScore.length===0){
   $('.toastify').innerHTML="<h5>Ma'lumot yetarli emas</h5>";
   $(".toastify").style.transform='translateX(0)';
   $(".toastify").style.backgroundColor='crimson';

   setTimeout(()=>{
   $(".toastify").style.transform='translateX(200%)';
   },3000)
  }else{
    $('.toastify').innerHTML="<h5>Muvaffaqqiyatli qo'shildi</h5>";
    $(".toastify").style.transform='translateX(0)';
   $(".toastify").style.backgroundColor='lime';

    setTimeout(()=>{
    $(".toastify").style.transform='translateX(200%)';
      fetch(`${link}/todos`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          token:authToken,
        },
        body:JSON.stringify({text:userName,})
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },2000)

    setTimeout(()=>{
      window.location.reload();  
    },3000)
  }
}


$('#send').addEventListener('submit', ()=>{

  addUser();
})


// ------- DELETE FUNCTION -------//
$('tbody').addEventListener('click',(e)=>{
  if(e.target.classList.contains("btn-danger")){
    let id=e.target.getAttribute('data-del')  
    deleteUser(id);
  }
})

const deleteUser=(id)=>{
  $('.toastify').style.transform='translateX(0)';


setTimeout(()=>{
  $('.toastify').style.transform='translateX(200%)';
  fetch(`${link}/todos/${id}`,{
    method : "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: authToken
    },
    body:JSON.stringify({})  
  })
},2000)
setTimeout(() => {
  window.location.reload();
}, 3000);
}

// ------- DELETE FUNCTION END-------//



// ------- EDIT FUNCTION -------//

$('tbody').addEventListener('click',(e)=>{
  console.log("Salom");
if(e.target.classList.contains('btn-primary')){
  let id=e.target.getAttribute('data-edit');
  localStorage.setItem('editUser',id);
  fetch(`${link}/todos/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: authToken,
    },
  })
  .then((res) => res.json())
  .then((result) => setValue(result))
  .catch((err) => console.log(err));
}
})


function setValue(data){
  $('#userEdit').value=data.body;
  $('#scoreEdit').value=data.score;
}



const updateUser=()=>{
  let id=localStorage.getItem('editUser');
  let newUser=$("#userEdit").value.trim();
  let newScore=$("#scoreEdit").value.trim();


  if(newUser.length===0 || newScore.length===0){
    $('.toastify').style.backgroundColor = "crimson";
    $('.toastify').innerHTML = `<h5>Ma'lumot yetarli emas</h5>`
    $('.toastify').style.transform = 'translateX(0)';

    setTimeout(()=>{
    $('.toastify').style.transform = 'translateX(200%)';

    },3000)
  }
  else{
    fetch(`${link}/todos/${id}`,{
      
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         token:authToken
      },
      body: JSON.stringify({
         body:newUser 
      })
    })
  }
}


$('#sendEdit').addEventListener('submit', () => {
  updateUser();
})


// ------- EDIT FUNCTION END-------//


  function logined(){
    let userName=localStorage.getItem('userName');
    if(userName){
    $("#login_user").innerHTML=userName;
    }
    else{
      window.location.replace('./login.html');
    }
  }

  logined();

$('#out').addEventListener('click', ()=>{
  localStorage.clear();
  logined();
})
