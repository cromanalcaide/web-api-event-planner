const BACKEND_URL = "https://3001-cromanalcai-webapievent-8evfm2s59z0.ws-eu88.gitpod.io/"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			userContacts: [],
			user: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			synctoken: () => {
				const token = localStorage.getItem("token");
				console.log("App just loaded, synching the local storage");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			login: async (email, password) => {

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"

					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				try {
					const resp = await fetch((`${BACKEND_URL}api/login/`), requestOptions)
					console.log("resp", resp)
					if (resp.status != 200) {
						console.log("An error has occurred");
						return false;
					}
					const data = await resp.json();

					localStorage.setItem("token", data.access_token,);
					const userId = { id: data.id }
					localStorage.setItem("userId", JSON.stringify(userId))

					setStore({ ...getStore(), token: data.access_token })
					return true;
				}
				catch (error) {
					console.error("There has been an error login in")
				}
			},

			// register: async (email, password, name, phone, city, country)=>{
			// los parámetros deben estar en el mismo orden en que se llaman (register.js 22)
			register: async (name, email, password, city, country, phone) => {

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"name": name,
						"email": email,
						"country": country,
						"city": city,
						"phone": phone,
						"password": password
					})
				};

				try {
					const resp = await fetch(`${BACKEND_URL}api/register`, requestOptions)
					if (resp.status != 200) {
						alert("An error has occurred while creating the user");
						return false;
					}
					const data = await resp.json();
					return true;
				}
				catch (error) {
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
						const res = await fetch(`${BACKEND_URL}api/private`, requestOptions);
						const data = await res.json();
						console.log("this is data:", data)
						return data;

					} catch (error) {
						console.log(error);
					}

				},

			logout: () => {
				const token = localStorage.removeItem("token");
				const userId = localStorage.removeItem("userId")

				setStore({ token: null });
			},
			addNewContact: async (name, email, userId) => {
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"name": name,
						"email": email,
						"user_id": userId
					})
				}
				try {
					const res = await fetch(`${BACKEND_URL}api/contact/register`, requestOptions);
					if (res.status !== 200) {
						alert("An error has occurred while adding the new contact");
						return false;
					}
					const newContact = await res.json();
					const currentContacts = getStore().userContacts;
					const updatedContacts = currentContacts.concat(newContact);
					setStore({ ...getStore(), userContacts: updatedContacts });
					return true;
				}
				catch (error) {
					console.log(error);
				}
			},
			getUserContacts: async () => {
				const requestOptions = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					},
				}
				const userId = JSON.parse(localStorage.getItem("userId"))
				try {
					const response = await fetch(`${BACKEND_URL}api/contacts/${userId.id}`, requestOptions)
					const contacts = await response.json();
					console.log(contacts)
					const userContacts = contacts.results.map(contact => ({
						name: contact.name,
						email: contact.email,
						id: contact.id
					}));
					setStore({ ...getStore(), userContacts })
				} catch (error) {
					console.log(error);
				};
			},
			getUserInfo: async () => {
				const requestOptions = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					},
				}
				const userId = JSON.parse(localStorage.getItem("userId"))
				try {
					const response = await fetch(`${BACKEND_URL}api/users/${userId.id}`, requestOptions)
					const user = await response.json();
					console.log(user)
					setStore({ ...getStore(), user })
				} catch (error) {
					console.log(error);
				};
			},
			editContact: async (contactId, updatedName, updatedEmail) => {
				const requestOptions = {
					method: "PUT",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						name: updatedName,
						email: updatedEmail
					})
				}

				try {
					const response = await fetch(`${BACKEND_URL}api/contacts/${contactId}`, requestOptions)
					const updatedContact = await response.json();
					console.log(updatedContact)

					const prevStore = getStore();
					const updatedContacts = prevStore.userContacts.map((contact) => {
						if (contact.id === contactId) {
							return updatedContact;
						} else {
							return contact;
						}
					});

					setStore({
						...prevStore,
						userContacts: updatedContacts
					});
				} catch (error) {
					console.log(error);
				}
			},
			deleteContact: async (contactId) => {
				const requestOptions = {
					method: "DELETE",
					headers: {
						"Content-type": "application/json"
					},
				}
				try {
					const response = await fetch(`${BACKEND_URL}api/contacts/${contactId}`, requestOptions);
					const data = await response.json();
					console.log(data);

					setStore({
						...getStore(),
						userContacts: getStore().userContacts.filter((contact) => contact.id !== contactId),
					});
				} catch (error) {
					console.log(error);
				}
			},
			editUserInfo: async (field, value) => {
				const userId = JSON.parse(localStorage.getItem("userId"));
				const user = getStore().user;

				let updatedValue = value;

				if (field === "password") {
					
				}

				const updatedUser = {
					...user,
					[field]: updatedValue
				};

				try {

					const response = await fetch(`${BACKEND_URL}api/users/${userId.id}`, {
						method: "PUT",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(updatedUser)
					});

					const updatedUserInfo = await fetch(`${BACKEND_URL}api/users/${userId.id}`);
					const updatedUserObject = await updatedUserInfo.json();

					const prevStore = getStore();
					setStore({
						...prevStore,
						user: updatedUserObject
					});
				} catch (error) {
					console.log(error);
				}
			},
			deleteUser: async () => {
				const userId = JSON.parse(localStorage.getItem("userId"));
				const requestOptions = {
					method: "DELETE",
					headers: {
						"Content-type": "application/json"
					},
				}
				try {
					const response = await fetch(`${BACKEND_URL}api/users/${userId.id}`, requestOptions);
					const data = await response.json();
					console.log(data);
					const token = localStorage.removeItem("token");
					const userId = localStorage.removeItem("userId")

					setStore({ token: null });


				} catch (error) {
					console.log(error);
				}
			}
		}
	}
}





export default getState;
