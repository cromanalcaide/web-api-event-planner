const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			eventguests: [],
			events: [],
			eventsOrder: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			synctoken : () =>{
				const token = localStorage.getItem("token");
				console.log("App just loaded, synching the local storage");
				if (token && token != "" && token != undefined) setStore({token: token}); 
			},	

			login: async (email, password) => {
				
					const requestOptions = {
						method : "POST",
						headers : {
							"Content-type": "application/json"

						},
						body : JSON.stringify({
							"email" : email,
							"password" : password
						})
					};
					console.log(requestOptions);
					
					try {
						const resp = await fetch("https://3001-cromanalcai-webapievent-21d9b0vaa71.ws-eu86.gitpod.io/api/login", requestOptions)
						console.log("resp", resp)
						if (resp.status != 200){
							console.log("An error has occurred");
							return false;
						} 
						const data = await resp.json();	
						console.log("data", data);					
						localStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})

						return true;
					}
					catch(error){
						console.error("There has been an error login in")
					}
			},

			// register: async (email, password, name, phone, city, country)=>{
			// los parámetros deben estar en el mismo orden en que se llaman (register.js 22)
			register: async (name, email, password, city, country, phone) => {
				
				const requestOptions = {
					method : "POST",
					headers : {
						"Content-type": "application/json"
					},
					body : JSON.stringify({
						"name" : name,
						"email" : email,
						"country" : country,
						"city" : city,
						"phone" : phone, 
						"password" : password
					})
				};
				
				try {
					const resp = await fetch("https://3001-cromanalcai-webapievent-rxvf69gg0tc.ws-eu86.gitpod.io/api/register", requestOptions)
					if (resp.status != 200){
						alert("An error has occurred while creating the user");
						return false;
					} 
					const data = await resp.json();	
					console.log(data);					

					return true;
				}
				catch(error){
					console.error("There has been an error creating a user")
				}
			},
			getUserData:
				async () => {
					const store = getStore();
					const requestOptions = {
					  method: "GET",
					  headers: {
						Authorization: `Bearer ${store.token}`,
					  },
					};
					try {
					  const res = await fetch("https://3001-cromanalcai-webapievent-21d9b0vaa71.ws-eu86.gitpod.io/api/private", requestOptions);
					  const data = await res.json();
					  return data;
					} catch (error) {
					  console.log(error);
					}
			},

			logout: ()=>{
				const token = localStorage.removeItem("token");
				setStore({token:null}); 
			},

			getEventsGuests: async () => {
				const response = await fetch(
				  `https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/events_guests`,
				  {
					method: "GET",
				  }
				);
			   
				const data = await response.json();
		
				setStore({ eventguests: data.results });
	
			},
			getAllEvents: async () => {
				const response = await fetch(
				  `https://3001-cromanalcai-webapievent-7wlsqfghc93.ws-eu88.gitpod.io/api/events`,
				  {
					method: "GET",
				  }
				);
			   
				const data = await response.json();
		
				setStore({ events: data.results });

			  },  
			eventsOrder: () => {
				const eventos = [...getStore().events];
    			const evguest = [...getStore().eventguests];
				console.log(eventos);

    			let getGuestsEmail = evguest.filter(item => item.email === "juanmism@gmail.com");

				let eventsByGuests = [];
				for (let i = 0; i < eventos.length; i++) {
				for (let j = 0; j < getGuestsEmail.length; j++) {
					if (eventos[i].id === getGuestsEmail[j].event_id) {
					eventsByGuests.push(eventos[i]);
					}
				}
				}

				let actualTime = new Date().getTime(); 
				let futureDate = eventsByGuests.filter(item => new Date (item.date).getTime() > actualTime );
				futureDate.sort(function(a, b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
				setStore({eventsOrder: futureDate})
				console.log(futureDate);
			},
		}
	};
};

export default getState;
