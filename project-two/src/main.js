const templateEngine = {
	render: function (template, model) {
		const el = document.createElement('div')
		el.innerHTML = template
		const forEach = el.querySelector('[for-each]')
		const attributes = forEach.attributes['for-each'].value.split('in')
		const modelName = attributes[1].trim()
		const keyName = attributes[0].trim()
		const children = model[modelName].map((key, i) => {
			const re = new RegExp(`{(${keyName}.*)}`)
			const match = forEach.children[0].outerHTML.match(re)[1]
			forEach.children[0].querySelectorAll('[if]').forEach(el => {
				console.log('EL: ', el)
			})
			const val = match.split('.').slice(1).reduce((obj, key) => {
				return obj[key]
			}, model[modelName][i])

			return forEach.children[0].outerHTML.replace(re, val)
		})

		forEach.innerHTML = children.join('')
		el.querySelectorAll('[if]').forEach(el => {
			const attributes = el.attributes['if'].value.split('.')
		})

		return el.innerHTML
	}
}

const viewOne = {
	template: `<div>
		<h1>Project Two</h1>
		<ul for-each='note in notes'>
			<li>
				<div class='text'>{note.note}</div>
				<div class='close-container'>
					<button class='close'>&times;</button>
					<button if='note.edit' class='edit'>cancel</button>
					<button if='!note.edit' class='edit'>edit</button>
				</div>
				<div class='clear'></div>
			</li>
		</ul>
		<div class='input-container'>
			<input type='text' />
			<button id='add'>Add to list</button>
		</div>
	</div>`,
	model: {
		notes: [],
		input: '',
		editMode: false
	},
	events: function () {
		document.querySelector('#add').addEventListener('click', this.addNote.bind(this))
		document.querySelectorAll('button.close').forEach((el, i) => {
			el.addEventListener('click', this.deleteNote.bind(this, i))
		})
		document.querySelectorAll('button.edit').forEach((el, i) => {
			el.addEventListener('click', this.editNote.bind(this, i))
		})
	},
	editNote: function (i, e) {

	},
	deleteNote: function (i, e) {
		this.model.notes.splice(i, 1)
		this.render()
	},
	addNote: function () {
		const note = document.querySelector('input').value
		this.model.notes.push({ note: note, edit: false })
		this.model.input = note
		this.render()
	},
	render: function () {
		document.querySelector('#view-one').innerHTML = templateEngine.render(this.template, this.model)
		document.querySelector('input').value = this.model.input
		this.events()
	}
}

viewOne.render()
