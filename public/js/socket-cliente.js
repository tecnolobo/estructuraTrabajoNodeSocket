//Refreencias
const lbOnline  = document.querySelector('#lbOnline');
const lbOffline =document.querySelector('#lbOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


const sokcetCliente = io();

sokcetCliente.on('connect',()=>{

  console.log('Conectado');
  lbOffline.style.display='none';
  lbOnline.style.display='';



});

sokcetCliente.on('disconnect',()=>{

  lbOnline.style.display='none';
  lbOffline.style.display='';
  
});

btnEnviar.addEventListener('click',()=>{

  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id:'asdas',
    fecha: new Date().getTime()
  }
  
  //Envair un mnesaje al servidor
  sokcetCliente.emit('enviar-mensaje-cliente',payload,(id)=>{
    console.log('el id=',id);
  });

});

//revcibir mensaje del servidor
sokcetCliente.on('enviar-mensaje-server',(payload)=>{
  console.log(payload);
});