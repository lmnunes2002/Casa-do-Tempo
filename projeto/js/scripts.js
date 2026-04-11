// 1. MODO ESCURO (DARK MODE)
// Seleciona o botão de alterar o tema e o ícone (tag <i>) dentro dele
const changeThemeBtn = document.getElementById('theme-toggle');
const themeIcon = changeThemeBtn.querySelector('i');

// Fica "escutando" o clique do usuário no botão
changeThemeBtn.addEventListener("click", function() {
    // Adiciona ou remove a classe 'dark-mode' no corpo da página (body)
    document.body.classList.toggle('dark-mode');

    // Troca o ícone visualmente de Lua para Sol e vice-versa
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. MENU HAMBÚRGUER (MOBILE)
// Seleciona os elementos necessários para o menu do celular funcionar
const btnMobile = document.getElementById('btn-mobile');
const navList = document.querySelector('.nav-container');
const iconeHamb = btnMobile.querySelector('i');

// Quando o usuário clica no botão do menu hambúrguer
btnMobile.addEventListener('click', () => {
    // Mostra ou esconde o menu adicionando/tirando a classe 'active'
    navList.classList.toggle('active');
    
    // Troca o ícone de 'hambúrguer' para 'X' quando o menu está aberto
    if (navList.classList.contains('active')) {
        iconeHamb.classList.remove('fa-bars');
        iconeHamb.classList.add('fa-xmark');
    } else {
        iconeHamb.classList.remove('fa-xmark');
        iconeHamb.classList.add('fa-bars');
    }
});

// Fecha o menu automaticamente ao clicar em qualquer link da navegação
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');       // Esconde o menu
        iconeHamb.classList.remove('fa-xmark');   // Tira o ícone de 'X'
        iconeHamb.classList.add('fa-bars');       // Coloca as barrinhas de volta
    });
});

// 3. CARROSSEL DE VOLUNTÁRIOS (SLIDER INFINITO)
const track = document.querySelector('.carousel-track');
const gap = 20; // Espaço exato entre os cards que foi definido no CSS

function moveCarousel() {
    // Calcula quanto deve andar para o lado (largura de um card + o espaço)
    const cardWidth = track.firstElementChild.offsetWidth + gap;

    // Aplica a animação de deslize suave para a esquerda
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${cardWidth}px)`;

    // Espera a animação acabar (500ms) para reorganizar o HTML de forma invisível
    setTimeout(() => {
        // Remove a transição temporariamente para o movimento de "reset" não ser visto
        track.style.transition = "none";
        
        // Move o primeiro card para o final do trilho (o appendChild faz isso automaticamente)
        track.appendChild(track.firstElementChild);
        
        // Reseta a posição do trilho de volta para o ponto zero original
        track.style.transform = `translateX(0)`;
    }, 500);
}

// Define que a função moveCarousel vai rodar sozinha a cada 5 segundos (5000ms)
setInterval(moveCarousel, 5000);

// 4. FORMULÁRIO DE DOAÇÃO (SELEÇÃO DE VALORES)
// Seleciona todos os botões de valor e o campo de texto oculto
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('custom-amount');

// Percorre todos os botões e adiciona um "ouvinte" de clique em cada um deles
amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Passo 1: Remove a classe 'active' (cor laranja) de TODOS os botões
        amountBtns.forEach(b => b.classList.remove('active'));
        
        // Passo 2: Adiciona a classe 'active' apenas no botão que acabou de ser clicado
        btn.classList.add('active');

        // Passo 3: Verifica se o botão clicado foi a opção "Outro"
        if (btn.dataset.value === 'other') {
            customAmountInput.classList.remove('hidden'); // Mostra o input de texto
            customAmountInput.focus();                    // Já coloca o cursor lá dentro para digitar
        } else {
            customAmountInput.classList.add('hidden');    // Esconde o input de texto
            customAmountInput.value = '';                 // Limpa o que o usuário havia digitado
        }
    });
});