window.onload = function () {

    let inicial=document.querySelectorAll('.slideinLeftInici')
    for (var i = 0; i < inicial.length; i++) {
        inicial[i].classList.add("salirIzquierda");
        inicial[i].style.opacity = 1;
    }

    let titol = document.querySelectorAll('.divTitol');
    for (var i = 0; i < titol.length; i++) {
        titol[i].classList.add("salirDerecha");
        titol[i].style.opacity = 1;
    }

    let cols = document.querySelectorAll('.rowAliments');
    for (var i = 0; i < cols.length; i++) {
        cols[i].classList.add("salirIzquierda");
        cols[i].style.opacity = 1;
    }

    let animadosL = document.querySelectorAll('.slideinLeft');
    let animadosR = document.querySelectorAll('.slideinRight');
    let animadosT = document.querySelectorAll('.slideinTop');
    let animadosB = document.querySelectorAll('.slideinBottom');

    function aparecer() {
        let scrollTop = document.documentElement.scrollTop;
        for (var i = 0; i < animadosL.length; i++) {
            let alturaAnimado = animadosL[i].offsetTop;
            if (alturaAnimado - 800 < scrollTop) {
                animadosL[i].style.opacity = 1;
                animadosL[i].classList.add("salirIzquierda");
            }
        }
        for (var i = 0; i < animadosR.length; i++) {
            let alturaAnimado = animadosR[i].offsetTop;
            if (alturaAnimado - 800 < scrollTop) {
                animadosR[i].style.opacity = 1;
                animadosR[i].classList.add("salirDerecha");
            }
        }
        for (var i = 0; i < animadosT.length; i++) {
            let alturaAnimado = animadosT[i].offsetTop;
            if (alturaAnimado - 800 < scrollTop) {
                animadosT[i].style.opacity = 1;
                animadosT[i].classList.add("salirArriba");
            }
        }
        for (var i = 0; i < animadosB.length; i++) {
            let alturaAnimado = animadosB[i].offsetTop;
            if (alturaAnimado - 800 < scrollTop) {
                animadosB[i].style.opacity = 1;
                animadosB[i].classList.add("salirAbajo");
            }
        }
        let arriba = document.getElementById("ir-arriba")
        let referencia = document.getElementById("offsetTopAliments");
        let alturaArriba = referencia.offsetTop;
        if((alturaArriba-200) < scrollTop){
            arriba.style.opacity=1;
        } else {
            arriba.style.opacity=0;
        }
    }
    window.addEventListener('scroll', aparecer);
}