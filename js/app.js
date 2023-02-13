

//cambiar estilo
window.addEventListener("load", function(){
 
    var seleccionado = localStorage.getItem("selectedCSS");
 

    if(seleccionado){
    
        documen.body.calassList.add(seleccionado);
        
    }
});

document.getElementById("botonWhite").addEventListener("click", cambiarAEstiloBlanco)

document.getElementById("botonBlack").onclick = function(){
    cambiarAEstiloNegro();
}

document.getElementById("botonPink").addEventListener("click", cambiarAEstiloRosa)

document.getElementById("botonOrange").addEventListener("click", cambiarAEstiloNaranja)


function cambiarAEstiloNegro(){
    document.getElementById('estilos').href = 'css/darkstyle.css';
    //guardar el string de la url del estilo en el localstorage
    localStorage.setItem("SelectedCSS", "css/darkstyle.css");
}

function cambiarAEstiloBlanco(){
    document.getElementById('estilos').href = 'css/whitestyle.css';

    localStorage.setItem("SelectedCSS", "css/whitestyle.css");
}

function cambiarAEstiloRosa(){
    document.getElementById('estilos').href = 'css/pinkstyle.css';
    localStorage.setItem("SelectedCSS", "css/pinkstyle.css");
}

function cambiarAEstiloNaranja(){
    document.getElementById('estilos').href = 'css/orangestyle.css';
    localStorage.setItem("SelectedCSS", "css/orangestyle.css");
}



 // esta serie de ifs va a comprobar cual tenemos en el localstorage y si es alguna de ellos lo setea como el estilo actual
if(localStorage.getItem("SelectedCSS") === "css/darkstyle.css"){

    document.getElementById("estilos").href=("css/darkstyle.css");
}
else if(localStorage.getItem("SelectedCSS") === "css/pinkstyle.css"){ 

    document.getElementById("estilos").href=("css/pinkstyle.css");
}
else if(localStorage.getItem("SelectedCSS") === "css/pinkstyle.css"){ 

    document.getElementById("estilos").href=("css/pinkstyle.css");
}
else if(localStorage.getItem("SelectedCSS") === "css/orangestyle.css"){ 

    document.getElementById("estilos").href=("css/orangestyle.css");
}


// variables

let alarmListArr = JSON.parse(localStorage.getItem("alarmasGuardadas")) || [];
const selectMenu = document.querySelectorAll("select");
const selectMenu2 = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
const delAlarm = document.querySelector("#btn-delAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/Alarm-ringtone.mp3");


// Tiempo

setInterval( function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname],dnum.pad(2), months[mo],yr,hou.pad(2),min.pad(2),sec.pad(2),pe];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        if(hou < 10){
            hou = "0" + hou
        }
        if(min < 10)
        {
            min = "0" + min
        }
        if(sec < 10){
            sec = "0" + sec
        }

        const alarma = document.querySelector('.datetime')
        const horaActual = hou + ":" + min + ":" + sec + " " + pe 

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]== horaActual){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();

                
                alarma.style.animation = 'alarma .5s linear 120 alternate';
                
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
},1000)



//Sección de ajuste de alarma

for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);

}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    selectMenu[4].firstElementChild.insertAdjacentHTML("afterend", option);
}



for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
    selectMenu[5].firstElementChild.insertAdjacentHTML("afterend", option);
}




//añadir alarma

console.log("horas guardadas: " + localStorage.getItem("alarmasGuardadas"));
function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarmas";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        localStorage.setItem("alarmasGuardadas", JSON.stringify(alarmListArr));
        console.log("horas guardadas: " + localStorage.getItem("alarmasGuardadas"));
        location.reload(true);
        console.log(document.querySelector(".btn-delete").value);
    }

}
delAlarm.addEventListener("click", deleteAlarm);
setAlarmBtn.addEventListener("click",setAlarm);

//eliminar alarma

function deleteAlarm(){
    let time = `${selectMenu[3].value}:${selectMenu[4].value}:00 ${selectMenu[5].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        for (var i = 0; i < alarmListArr.length; i++) {
            if (alarmListArr[i] === time|| alarmListArr[i] === null) {
          console.log("Se esta intentando borrar: " + time);
          alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
          alarmListArr.splice(i,1)
          localStorage.setItem("alarmasGuardadas", JSON.stringify(alarmListArr));
          console.log(alarmListArr)
          location.reload(true);
            }
        }
    }
}

function stopAlarm(){
    const alarma = document.querySelector('.datetime')
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
    alarma.style.animationPlayState = "paused";
}

const alarmas = JSON.parse(localStorage.getItem("alarmasGuardadas")) || [];
 let list = document.getElementById("alarma-list");
  for(let i= 0;i < alarmas.length; i++){
    let item = document.createElement("li");
    item.innerHTML = alarmas[i];
    list.appendChild(item);
  }

