let intervaloTotal;
let intervaloFase;

function iniciar () {
    clearInterval(intervaloTotal);
    clearInterval(intervaloFase);

    const tempoTotal = document.getElementById("total").value;
    const pratico = document.getElementById("pratico").value;
    const descanso = document.getElementById("descanso").value;
    const somPratica = document.getElementById("somPratica");
    const somDescanso = document.getElementById("somDescanso");
    const somFim = document.getElementById("somFim");

    let res = document.querySelector("#result");
    let resPratico = document.querySelector("#resPratico");
    let resDescanso = document.querySelector("#resDescanso");

    if (!tempoTotal) {
        res.innerHTML = 'Selecione um horário';
        return;
    }

    const [horas, minutos] = tempoTotal.split(":").map(Number);
    let totalSegundos = horas * 3600 + minutos * 60;

    const [horasPratico, minutosPratico] = pratico.split(":").map(Number);
    const totalSegundosPratico = horasPratico * 3600 + minutosPratico * 60;

    const [horasDescanso, minutosDescanso] = descanso.split(":").map(Number);
    const totalSegundosDescanso = horasDescanso * 3600 + minutosDescanso * 60;

    // Contador total do treino
    intervaloTotal = setInterval(() => {
        if (totalSegundos <= 0) {
            clearInterval(intervaloTotal);
            clearInterval(intervaloFase);
            res.innerHTML = "⏰ Fim do Treino!";
            resPratico.innerHTML = "";
            resDescanso.innerHTML = "";
            somFim.play();
            return;
        }

        totalSegundos--;

        const h = String(Math.floor(totalSegundos / 3600)).padStart(2, "0");
        const m = String(Math.floor((totalSegundos % 3600) / 60)).padStart(2, "0");
        const s = String(totalSegundos % 60).padStart(2, "0");

        res.innerHTML = `${h}:${m}:${s}`;
    }, 1000);

    function iniciarFasePratica () {
        somPratica.play()
        let segundos = totalSegundosPratico;
        resDescanso.innerHTML = "";
        clearInterval(intervaloFase);

        intervaloFase = setInterval(() => {
            if (segundos <= 0 || totalSegundos <= 0) {
                clearInterval(intervaloFase);
                resPratico.innerHTML = "⏸️ Pausa";
                iniciarFaseDescanso();
                return;
            }

            segundos--;

            const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
            const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
            const s = String(segundos % 60).padStart(2, "0");

            resPratico.innerHTML = `🟢 Praticando: ${h}:${m}:${s}`;
        }, 1000);
    }

    function iniciarFaseDescanso () {
        somDescanso.play();
        let segundos = totalSegundosDescanso;
        resPratico.innerHTML = "";
        clearInterval(intervaloFase);

        intervaloFase = setInterval(() => {
            if (segundos <= 0 || totalSegundos <= 0) {
                clearInterval(intervaloFase);
                resDescanso.innerHTML = "💪 Bora voltar!";
                iniciarFasePratica();
                return;
            }

            segundos--;

            const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
            const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
            const s = String(segundos % 60).padStart(2, "0");

            resDescanso.innerHTML = `😴 Descansando: ${h}:${m}:${s}`;
        }, 1000);
    }

    iniciarFasePratica();
}
