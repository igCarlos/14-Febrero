
function formatCompacto(numero){
    const unidades =["","K","M","B","T","P","E"];
    let i = 0;
    let num = numero;
    while(num >= 1000 && i<unidades.length-1){
        num /= 1000;
        i++;
    }
    const numFormateo = num % 1 === 0 ? num : num.toFixed(1);
    return numFormateo + " " + unidades[i];
}


setInterval(()=>{
    const fechaInicio = "2026-01-07:20:00:00";
    const fechaInicial = new Date(fechaInicio)
    const fechaActual = new Date();

    const diferenciaMs = fechaActual - fechaInicial;

    let calcularDias = Math.floor(diferenciaMs/(1000*60*60*24));
    let calcularHora = Math.floor(diferenciaMs/(1000*60*60));
    let calcularMinuto = Math.floor(diferenciaMs/(1000*60));
    let calcularSegundo = Math.floor(diferenciaMs/(1000));

    console.log(`${calcularDias} dias`)
    console.log(`${calcularHora} horas`)
    console.log(`${calcularMinuto} minutos`)
    console.log(`${calcularSegundo} segundos`)
    console.log(`${formatCompacto(calcularSegundo)} segundos`)
},1000);