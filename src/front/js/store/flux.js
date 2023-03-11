const BACKEND_URL = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			eventguests: [],
			events: [],
			contacts: [],
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
						const resp = await fetch((`${BACKEND_URL}/api/login/`), requestOptions)
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
					const resp = await fetch((`${BACKEND_URL}/api/register/`), requestOptions)
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
					  const res = await fetch((`${BACKEND_URL}/api/private/`), requestOptions);
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
					(`${BACKEND_URL}/api/events_guests/`),
				  {
					method: "GET",
				  }
				);
			   
				const data = await response.json();
		
				setStore({ eventguests: data.results });
	
			},
			getAllEvents: async () => {
				const response = await fetch(
					(`${BACKEND_URL}/api/events/`),
				  {
					method: "GET",
				  }
				);
			   
				const data = await response.json();
		
				setStore({ events: data.results });
			  },  

			  getContacts: async () => {
				const response = await fetch(
					(`${BACKEND_URL}/api/contacts/`),
				  {
					method: "GET",
				  }
				);
			   
				const data = await response.json();
		
				setStore({ contacts: data.results });
	
			},
		}
	};
};

export default getState;
