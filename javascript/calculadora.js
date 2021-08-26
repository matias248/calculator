var numero;
var operacionActual;
var resultadoPrint;
var listaDeOperandos;
var listaDeNumeros;
var igual;
var division;
var soustracion;
var multiplicacion;
var adicion;
var punto;
var lastInputHasAPoint;


function init(){
    numero="";
    operacionActual=document.getElementById("operacionActual");
    resultadoPrint=document.getElementById("resultado");
    igual=document.getElementById('botonIgual');
    division=document.getElementById('botonDivision');
    soustracion=document.getElementById('botonMenos');
    multiplicacion=document.getElementById('botonPor');
    adicion=document.getElementById('botonPlus');
    punto=document.getElementById('botonPunto');
    listaDeOperandos=[];
    listaDeNumeros=[];
    inabilitarOperaciones();
    soustracion.disabled=false;
    soustracion.style="cadetblue";
}

function reset(){
    numero="";
    listaDeOperandos=new Array();
    listaDeNumeros=[];
    resultadoPrint.textContent="";
    operacionActual.textContent="";
    inabilitarOperaciones();
    soustracion.disabled=false;
    soustracion.style="cadetblue";
}


function calcularLosPorYDividir(){
    var element;
    for(var indice=0;indice<listaDeOperandos.length;indice++){
        element=listaDeOperandos[indice];
        if(element=="*"){
           listaDeNumeros[indice]=listaDeNumeros[indice]*listaDeNumeros[indice+1];
           listaDeNumeros.splice(indice+1,1);
           listaDeOperandos.splice(indice,1);
           indice--;
        }
        if(element=="/"){
           listaDeNumeros[indice]=listaDeNumeros[indice]/listaDeNumeros[indice+1];
           listaDeNumeros.splice(indice+1,1);
           listaDeOperandos.splice(indice,1);
           indice--;
        }
   }
}
function inabilitarOperaciones(){
    division.disabled=true;
    soustracion.disabled=true;
    multiplicacion.disabled=true;
    adicion.disabled=true;
    igual.disabled=true;
    punto.disabled=true;
    punto.style.background="red";
    igual.style.background="red";
    adicion.style.background="red";
    multiplicacion.style.background="red";
    soustracion.style.background="red";
    division.style.background="red";
}
function abilitarOperaciones(){
    division.disabled=false;
    soustracion.disabled=false;
    multiplicacion.disabled=false;
    adicion.disabled=false;
    igual.disabled=false;
    punto.disabled=false;
    punto.style.background="cadetblue";
    igual.style.background="cadetblue";
    adicion.style.background="cadetblue";
    multiplicacion.style.background="cadetblue";
    soustracion.style.background="cadetblue";
    division.style.background="cadetblue";
}

function calcularLasSumasYRestas(){
    var element;
    for(var indice=0;indice<listaDeOperandos.length;indice++){
        element=listaDeOperandos[indice];
        if(element=="+"){
           listaDeNumeros[indice]=listaDeNumeros[indice]+listaDeNumeros[indice+1];
           listaDeNumeros.splice(indice+1,1);
           listaDeOperandos.splice(indice,1);
           indice--;
        }
        if(element=="-"){
           listaDeNumeros[indice]=listaDeNumeros[indice]-listaDeNumeros[indice+1];
           listaDeNumeros.splice(indice+1,1);
           listaDeOperandos.splice(indice,1);
           indice--;
        }
    }
    return listaDeNumeros[0];
}

function calcular(){
  
    if(numero!=""){
        listaDeNumeros.push(numero);
        numero="";
    }
    listaDeNumeros = listaDeNumeros.map(parseFloat); 
    calcularLosPorYDividir();
    calcularLasSumasYRestas();
    let resultado=listaDeNumeros[0]+0;
    resultadoPrint.textContent=operacionActual
    .textContent+"="+resultado;
    operacionActual.textContent="";
    listaDeNumeros=new Array();
    inabilitarOperaciones();
    soustracion.disabled=false;
    soustracion.style="cadetblue";
   return resultado;
}

function calcularWithParam(operacion){
    var element;
    for(var i=0;i<operacion.length;i++){
        element=operacion[i];
        if(isNaN(element)==false ){
            addNumber(element);
        }
        else if(element=='.'){
            addPoint();
        }
        else{
            addSymbol(element);
        }
    }
    return calcular();
}

function addNumber(number){
    
        abilitarOperaciones();
        operacionActual.textContent+=number;
        numero+=""+number;   
}


function addPoint(){
    operacionActual.textContent+=".";
    numero+=".";

}

function addSymbol(simbolo){
    if(numero!=""){
        listaDeNumeros.push(numero);
        numero="";
        listaDeOperandos.push(simbolo);
    }
    else{
        numero+=simbolo;
    }
    operacionActual.textContent+=simbolo;
    inabilitarOperaciones();
    if(simbolo!="-"){
        soustracion.disabled=false;
        soustracion.style="cadetblue";
    }
}
