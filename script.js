

const IMAGENS = [
    'imgs/evolve.gif',
	'imgs/GifTV_Garden_EntreChaves.gif',
	'imgs/GifTV_Agilistas.gif',
	'imgs/CopaCrafter2-2024.png',
];

const IMAGENS_DPS_18 = [];

const LINKS = ['https://dti.ag/GestaoaVista'];

const TEMPO = {
	imagens: 35000,
	links: 45000,
};

const estado = {
	indiceImagens: 0,
	indiceImagensDps18: 0,
	indiceLinks: 0,
	temporizador: null,
};

function atualizarExibicao(indice = null) {
	const isDepoisDas18 = eHorarioDepoisDas18h() && IMAGENS_DPS_18.length > 0;
	const imagensAtual = isDepoisDas18 ? IMAGENS_DPS_18 : IMAGENS;
	let indiceAtual = isDepoisDas18
		? estado.indiceImagensDps18
		: estado.indiceImagens;

	if (indice !== null) {
		indiceAtual = indice;
	} else if (!isDepoisDas18) {
		indiceAtual = (indiceAtual + 1) % imagensAtual.length;
	}

	document.getElementById('minha-imagem').src = imagensAtual[indiceAtual];
	document.getElementById('minha-imagem').style.display = 'block';
	document.getElementById('link-iframe').style.display = 'none';

	atualizarBotoesPaginacao(indiceAtual);

	if (isDepoisDas18) {
		estado.indiceImagensDps18 = indiceAtual;
	} else {
		estado.indiceImagens = indiceAtual;
	}

	return indiceAtual;
}

function atualizarBotoesPaginacao(indiceAtivo) {
	document
		.querySelectorAll('#paginacao-imagens li button')
		.forEach((btn, idx) => {
			btn.classList.toggle('ativo', idx === indiceAtivo);
		});
}

function mostrarImagem(indice = null) {
	clearTimeout(estado.temporizador);
	atualizarExibicao(indice);
	estado.temporizador = setTimeout(() => mostrarImagem(), TEMPO.imagens);
}

function mostrarLink() {
	barraProgresso();
	clearTimeout(estado.temporizador);
	document.getElementById('link-iframe').style.display = 'block';
	document.getElementById('minha-imagem').style.display = 'none';
	document.getElementById('link-iframe').src = LINKS[estado.indiceLinks];
	estado.indiceLinks = (estado.indiceLinks + 1) % LINKS.length;
	estado.temporizador = setTimeout(mostrarImagem, TEMPO.links);
}

function inicializarPaginacao() {
	const estruturaPaginacao = IMAGENS.map(
		(imagem, index) =>
			`<li><button id="${imagem}" data-index="${index}"></button></li>`
	).join('');

	document.getElementById('paginacao-imagens').innerHTML = estruturaPaginacao;

	IMAGENS.forEach((imagem, index) => {
		document
			.getElementById(imagem)
			.addEventListener('click', () => mostrarImagem(index));
	});
}

function eHorarioDepoisDas18h() {
	const horaAtual = new Date().getHours();
	return horaAtual >= 7;
}

window.onload = function () {
	inicializarPaginacao();
	mostrarImagem();
};
function barraProgresso() {

let width = 0;
let interval = TEMPO.imagens / 100; // dividir o tempo total em 100 partes

let progressBar = document.getElementById('progress-bar');

let intervalId = setInterval(function() {
  width++;
  progressBar.style.width = width + '%';

  if (width >= 100) {
    clearInterval(intervalId);
  }
}, interval);
}