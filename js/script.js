const app = {
	// ! Initialisation de l'app
	init: function () {
		app.createApp();
	},

	// État (state) : les données de l'app à un instant T
	state: {
		selectOptions: ['first choice', 'second choice', 'third choice'],
		selectedOption: 'second choice',
		listItems: [
			{
				text: 'first choice',
				color: 'green',
			},
			{
				text: 'second choice',
				color: 'orange',
			},
			{
				text: 'third choice',
				color: 'red',
			},
		],
	},

	createApp: function () {
		// Création du div racine, seul enfant du body, qui contient toute l'app
		app.containerElement = document.getElementById('app');

		// Appels des fonctions de construction de l'app
		app.createForm();
		app.createDiv();
		app.createList();
	},

	/**
	 * ? Create, configure and insert a new element in DOM
	 * @param {*} tag - the same of the tag
	 * @param {*} parent - the parent element where to insert
	 * @param {*} attributes - the attributes to add to the child
	 * @returns the new child element
	 */
	configureElement: function (tag, parent, attributes) {
		// Création de l'élément
		const element = document.createElement(tag);

		// Insertion des attributs dans l'élément
		for (const key in attributes) {
			// Recopie de chaque clé, avec leur valeur, de l'objet 'attributes' dans l'objet 'element'
			element[key] = attributes[key];
		}

		// Insertion de l'élément de l'élément dans son parent
		parent.appendChild(element);

		// Renvoi de l'élément créé
		return element;
	},

	// Création d'un div
	createDiv: function () {
		app.configureElement('div', app.containerElement, {
			id: 'div',
			className: 'div',
		});
	},

	// Création d'un liste
	createList: function () {
		// Création du container 'ul'
		const ulElement = app.configureElement(
			'ul',
			document.getElementById('div'),
			{
				id: 'list',
				className: 'list',
			},
		);

		// Ajout des tirets de la liste en itérant le tableau 'app.state.listItems' qui liste les différents items
		app.state.listItems.forEach(({ text, color }) => {
			// Création des 'li' avec leur texte
			const liElement = app.configureElement('li', ulElement, {
				className: 'list-item',
				textContent: text,
			});

			// Création de span dans chaque 'li'
			const spanElement = app.configureElement('span', liElement, {
				className: 'list-span list-span--color',
			});
			spanElement.style.backgroundColor = color;

			if (
				liElement.childNodes[0].nodeValue === app.state.selectedOption
			) {
				spanElement.style.visibility = 'visible';
			} else {
				spanElement.style.visibility = 'hidden';
			}
		});
	},

	// Suppression et recréation de la list
	refreshList: function () {
		document.getElementById('list').remove();
		app.createList();
	},

	// Création d'un formulaire
	createForm: function () {
		// Création d'un formulaire
		const formElement = app.configureElement('form', app.containerElement, {
			id: 'form',
			className: 'search',
		});

		// Création d'un select
		const selectElement = app.configureElement('select', formElement, {
			className: 'choices',
		});

		// Ajout des options du select en itérant le tableau 'app.state.selectOptions' qui liste les différentes options
		app.state.selectOptions.forEach((selectOption) => {
			app.configureElement('option', selectElement, {
				value: selectOption,
				textContent: selectOption,
				selected: selectOption === app.state.selectedOption, // sélection du choix par défaut
			});
		});

		// Ajout d'un listener sur le select :
		selectElement.addEventListener('change', app.updateList);
	},

	// Gestion du masquage d'élément via un listener sur le select du formulaire
	updateList: function (event) {
		// Mis à jour de la valeur de la data 'selectedOption'
		app.state.selectedOption = event.target.value;

		// Rafraichissement de la liste
		app.refreshList();
	},
};

// ! Lancement de l'app dès que le DOM est chargé et prêt
document.addEventListener('DOMContentLoaded', app.init);
