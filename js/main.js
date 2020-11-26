window.onload = () => {
  const conteudos = document.querySelectorAll(".empty");
  const letras = document.querySelectorAll(".letra");
  const panel_letra = document.querySelector(".letras");
  //Array que armazenará os títulos incorretos
  var erros = [];
  // DOM do evento dragstart
  var currentDOM;
  // Eventos de interaçôes
  for (const letra of letras) {
    letra.addEventListener("dragstart", dragStart);
    letra.addEventListener("dragend", dragEnd);
  }
  for (const conteudo of conteudos) {
    conteudo.addEventListener("dragover", dragOver);
    conteudo.addEventListener("dragenter", dragEnter);
    conteudo.addEventListener("dragleave", dragLeave);
    conteudo.addEventListener("drop", dragDrop);
  }

  //Eventos de devolucao cards para o painel
  panel_letra.addEventListener("dragover", dragOver_Panel);
  panel_letra.addEventListener("dragenter", dragEnter_Panel);
  panel_letra.addEventListener("dragleave", dragLeave_Panel);
  panel_letra.addEventListener("drop", dragDrop_Panel);

  // Funçôes dos eventos

  function dragStart() {
    setTimeout(() => (this.className = "invisible"), 0);
    currentDOM = this;
  }

  function dragEnd() {
    this.className = "letra";
  }

  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
    if (this.className) {
      // this.className += " hovered";
    }
  }
  function dragLeave() {
    if (this.className) {
      this.className = "empty";
    }
  }

  function dragDrop() {    
    if(currentDOM != undefined ){
      console.log(currentDOM);
      this.textContent = currentDOM.attributes[2].value;
      checkAnswersAndShowModal();
    }
  }
  
  function checkAnswersAndShowModal() {
      let respostas = document.querySelectorAll(".empty");
      console.log(respostas);    
      let resp = [];
      let gabarito = [];

      respostas.forEach(element => {
        resp.push(element.textContent);
        gabarito.push(element.attributes[1].value);
      });
      console.log(resp);
      console.log(gabarito);
      let checkAnswerContent = resp.includes("", 0);
      console.log("checando", checkAnswerContent);
      if(checkAnswerContent){
        return;
      }else{
        for (let index = 0; index < resp.length; index++) {
          if (resp[index] != gabarito[index]) {
            showLostModal();
          } 
          else showWinModal();
        }
      }
  }
  
  //Exibir modal de vitória
  function showWinModal() {
    setTimeout(() => {
      let modal = document.querySelector("#myModal");
      modal.className += " show";
      modal.setAttribute("aria-hidden", "false");
      modal.setAttribute("style", "display: flex");
    }, 300);
  }

  //Exibir modal de perda
  function showLostModal() {
    setTimeout(() => {
      let modal = document.querySelector("#myModal-again");
      modal.className += " show";
      modal.setAttribute("aria-hidden", "false");
      modal.setAttribute("style", "display: flex");
    }, 300);
  }



  function checkConteudos() {
    conteudos.forEach(conteudo => {
      if (!conteudo.className && !conteudo.childNodes[3]) {
        conteudo.className = "empty";
        conteudo.id = "";
      }
    });
  }

  //Funcoes de eventos painel de letras
  function dragOver_Panel(e) {
    e.preventDefault();
    // console.log('over');
    if (this.className === "letras d-flex flex-row justify-content-around") {
      this.className += " hoverletras";
    }
  }

  function dragEnter_Panel(e) {
    e.preventDefault();
    // console.log('enter');
  }

  function dragLeave_Panel() {
    // console.log('leave');

  }
  function dragDrop_Panel() {
    // console.log('drop');
  }
};
