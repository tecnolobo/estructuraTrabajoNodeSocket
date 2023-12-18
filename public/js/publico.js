const seachParam = new URLSearchParams(window.location.search);
const socket = io();

// Referencias del HTML
const lblTicket1     = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2     = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3     = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4     = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');



/*if(!seachParam.has('escritorio')){
  window.location= 'index.html';
  throw new Error('Escritorio obligatorio');
}
*/
// const escritorio = seachParam.get('escritorio');
// lblEscritorio.innerText = escritorio;



// socket.on('connect', () => {
//     // console.log('Conectado');
//     btnAtender.disabled=false;    
// });

socket.on('estado-actual',(payload)=>{

	const audio = new Audio('../audio/new-ticket.mp3');
	audio.play();

	console.log(payload);

    const [
      tickect1
      ,tickect2
      ,tickect3
      ,tickect4
     ] = payload

    lblTicket1.innerText = 'Tickect '+tickect1.number;
    lblEscritorio1.innerText = tickect1.escritorio;

    lblTicket2.innerText = 'Tickect '+tickect2.number;
    lblEscritorio2.innerText = tickect2.escritorio;

    lblTicket3.innerText = 'Tickect '+tickect3.number;
    lblEscritorio3.innerText = tickect3.escritorio;

    lblTicket4.innerText = 'Tickect '+tickect4.number;
    lblEscritorio4.innerText = tickect4.escritorio;

    console.log(payload);
});

/*
btnAtender.addEventListener( 'click', () => {

  const payload = {escritorio};

    socket.emit('atendet-ticket',payload, ( {ok,msg,ticket} ) => {              

      if(!ok){
        lblSmall.innerText='Nadie.'
        lblBox.style.display='';
        lblBox.innerText=msg;
        return;
      }

      lblSmall.innerText='Tikect '+ticket.number;
      
      //lblNuevoTicket.innerText=respuesta;

    });

});*/