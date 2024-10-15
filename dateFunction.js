export const DateFormatted=  async () => {
    const dataAtual = new Date();

    const meses = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const getDiaComSufixo = (dia) => {
      if (dia > 3 && dia < 21) return `${dia}th`; // 4th até 20th
      switch (dia % 10) {
        case 1: return `${dia}st`;
        case 2: return `${dia}nd`;
        case 3: return `${dia}rd`;
        default: return `${dia}th`;
      }
    };

    const dia = dataAtual.getDate();
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();

    return `${mes} ${getDiaComSufixo(dia)}, ${ano}`;
}
