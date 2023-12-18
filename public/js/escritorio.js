const seachParam = new URLSearchParams(window.location.search);
const socket = io();

// Referencias del HTML
const lblEscritorio  = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblSmall = document.querySelector('small');
const lblBox = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');



if(!seachParam.has('escritorio')){
  window.location= 'index.html';
  throw new Error('Escritorio obligatorio');
}

const escritorio = seachParam.get('escritorio');
lblEscritorio.innerText = escritorio;



socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled=false;    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled=true;
});


socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled=true;
});


socket.on('ultimo-ticket',(payload)=>{
    //lblNuevoTicket.innerText='Tikect '+payload;
    console.log('ultimoi',payload);
});


socket.on('tickets-pendiente',(pendientes)=>{
  //lblNuevoTicket.innerText='Tikect '+pendientes;
  lblPendientes.innerText= pendientes;
  console.log('Tikes pendientes',pendientes);
});


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

      


    });

});