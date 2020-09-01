//https://pokeapi.co/api/v2/pokemon/{id or name}/

const form = document.querySelector('#BusquedaForm');
let po = '';
let pokemonTemp = {};

document.addEventListener("DOMContentLoaded",()=>{
    controladorAplicacion(1);
});


const GuardarDatosLocalStorage = (dataSave)=>{
	if(localStorage.getItem("data")){
		let data = JSON.parse(localStorage.getItem("data"));
		if(data.find(element=>element.name==dataSave.name) == null){
			data.push(dataSave);
			localStorage.setItem('data',JSON.stringify(data));
		}
	}else{
		let data = [];
		data.push(dataSave);
		localStorage.setItem('data',JSON.stringify(data));
	}
}

const OptenerDatosLocalStorage = (pokemonNombre, pokemonNumero)=>{
	if(localStorage.getItem("data")){
		let data = JSON.parse(localStorage.getItem("data"));
		if (pokemonNombre != null)
			return data.find(element=> element.name==pokemonNombre);
		else
			return data.find(element=> element.id==pokemonNumero);
	}
}


const OptenerPokemon = (pokemon)=>{
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then(response=>{
			if (!response.ok){
				throw Error(response.status);
			}else{
				return response.json();	
			}	
			
		}).then(resp=>{
			po = resp;
			pokemonTemp = {
				id:resp.id,
				name: resp.name,
				ico: resp.sprites.front_default,
				artwork: resp.sprites.other['official-artwork'].front_default,
				types: resp.types.map(element=>element.type.name),
				moves: resp.moves.map(element=>{return {name:element.move.name,url:element.move.url}}),
				height: resp.height,
				weight: resp.weight,
				species: resp.species,
				abilities: resp.abilities,
				stats: resp.stats.map(element=>{return {name:element.stat.name,value:element.base_stat}}),
				habitat: '',
				description: Array()
			}
			return fetch(pokemonTemp.species.url);
		}).then(response=>{
			return response.json();
		}).then(resp=>{
			pokemonTemp.habitat = resp.habitat.name;
			pokemonTemp.description = resp.flavor_text_entries.filter(element=> element.language.name == "en").map(element=>element.flavor_text);
			GuardarDatosLocalStorage(pokemonTemp);
			RellenarCampos(pokemonTemp);
		}).catch(error=>{
			console.log('algún día arreglare esto');
		});

}

const controladorAplicacion = (data)=>{
	let resultFromLS;
	Cargando();
	if (isNaN(data)){
		//console.log('letra');
		resultFromLS = OptenerDatosLocalStorage(data,null);
	}
	else{
		//console.log('numero');
		resultFromLS = OptenerDatosLocalStorage(null,parseInt(data,10));
	}

	if(typeof resultFromLS === 'undefined'){
		OptenerPokemon(data);
		//console.log('http');
	}else{
		po = resultFromLS;
		//console.log(resultFromLS);
		//console.log('local');
		RellenarCampos(resultFromLS);
	}	
} 


form.addEventListener('submit', event => {
	event.preventDefault();
	let pokemon = form.querySelector("input[name='inputBuscar']").value;
	pokemon = pokemon.replace(/\s/g,'');

	if(pokemon!=''){	
		controladorAplicacion(pokemon);
	}	
});




