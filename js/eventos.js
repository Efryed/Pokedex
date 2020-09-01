const buttonDesc = document.querySelector('#button-desc');
const buttonStats = document.querySelector('#button-stats');
const buttonInfo = document.querySelector('#button-info');

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}


buttonDesc.addEventListener('click', event => {
	document.querySelector('#description').style.display = 'block';
	document.querySelector('#stats').style.display = 'none';
	document.querySelector('#info').style.display = 'none';
});

buttonStats.addEventListener('click', event => {
	document.querySelector('#description').style.display = 'none';
	document.querySelector('#stats').style.display = 'block';
	document.querySelector('#info').style.display = 'none';
});

buttonInfo.addEventListener('click', event => {
	document.querySelector('#description').style.display = 'none';
	document.querySelector('#stats').style.display = 'none';
	document.querySelector('#info').style.display = 'grid';
});

const RellenarCampos = (data) =>{
	//cambiar imagen
	document.querySelector('#avatar div').innerHTML = '';
	document.querySelector('#avatar img').src = data.artwork;
	document.querySelector('#avatar img').style.display = 'block';
	//nombre pokemon
	document.querySelector('#interfaz form input').value  = data.name;
	//tipos
	let types = '';
	for(let ty in data.types){ types += `<li>${data.types[ty]}</li>`}
	document.querySelector('#types ul').innerHTML = types;
	//description
	document.querySelector('#description').innerHTML = `<p>${data.description[0]}</p><p>${data.description[2]}</p>`;
	//stats
	document.querySelector('#hp .progress div').style.width = `${Stats(data.stats[0].value)}%`;
	document.querySelector('#attack .progress div').style.width = `${Stats(data.stats[1].value)}%`;
	document.querySelector('#defense .progress div').style.width = `${Stats(data.stats[2].value)}%`;
	document.querySelector('#spA .progress div').style.width = `${Stats(data.stats[3].value)}%`;
	document.querySelector('#spD .progress div').style.width = `${Stats(data.stats[4].value)}%`;
	document.querySelector('#speed .progress div').style.width = `${Stats(data.stats[5].value)}%`;
	//info
	document.querySelector('#info-height').innerText = `${roundToTwo(data.height*0.1)} m`; 
	document.querySelector('#info-weight').innerText =  `${roundToTwo(data.weight*0.1)} Kg`;
	document.querySelector('#info-habitat').innerText = `${data.habitat}`;
	let abilities = '';
	for(let ab in data.abilities){abilities+= `<li> ${data.abilities[ab].ability.name} </li>`}
	document.querySelector('#info-hability').innerHTML = abilities;

}


const Stats = (stat)=>{
	const limite = 400;
	return (parseInt(stat,10)*100)/limite;
}

const Cargando = ()=>{
	document.querySelector('#avatar img').style.display = 'none';
	document.querySelector('#avatar img').src = '';
	document.querySelector('#avatar div').innerHTML = '<p class="loading">loading<span>.</span><span>.</span><span>.</span></p>';
	document.querySelector('#types ul').innerHTML = '<li><p class="loading">loading<span>.</span><span>.</span><span>.</span></p></li>';

	document.querySelector('#description').innerHTML = '<p class="loading">loading<span>.</span><span>.</span><span>.</span></p>';

	//stats
	document.querySelector('#hp .progress div').style.width = `0%`;
	document.querySelector('#attack .progress div').style.width = `0%`;
	document.querySelector('#defense .progress div').style.width = `0%`;
	document.querySelector('#spA .progress div').style.width = `0%`;
	document.querySelector('#spD .progress div').style.width = `0%`;
	document.querySelector('#speed .progress div').style.width = `0%`;
	//info
	document.querySelector('#info-height').innerText = '0 m'; 
	document.querySelector('#info-weight').innerText =  '0 Kg';
	document.querySelector('#info-habitat').innerText = '?';
	document.querySelector('#info-hability').innerHTML = '?';

}
//document.querySelector('#avatar').innerHTML = '<p class="loading">loading<span>.</span><span>.</span><span>.</span></p>';
//document.querySelector('#avatar img').style.display = 'none';
