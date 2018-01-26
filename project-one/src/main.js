document.getElementById('add').addEventListener('click', function (e) {
	var inputValue = document.querySelector('input').value
	if (e.target.innerText === 'Modify') {
		document.querySelectorAll('button.edit').forEach(function (el) {
			if (el.innerText === 'cancel') {
				el.closest('li').querySelector('.text').innerText = inputValue
				el.innerText = 'edit'
				document.querySelector('button#add').innerText = 'Add to list'
			}
		})
	} else {
		var element = document.createElement('li')
		element.innerHTML = `<div>
			<div class='text'>${inputValue}</div>
			<div class='close-container'>
				<button class='close'>&times;</button>
				<button class='edit'>edit</button>
			</div>
			<div class='clear'></div>
		<div>`
		document.getElementsByTagName('ul')[0].append(element)
		initCloseEvents()
		var notes = []
		document.querySelectorAll('li').forEach(function (el) {
			notes.push(el.querySelector('.text').innerText)
		})
	}
})

function addCloseEvent (e) {
	e.target.closest('li').remove()
}

function addEditEvent (e) {
	var el = e.target
	if (el.innerText === 'cancel') {
		document.querySelectorAll('button.edit').forEach(function (el) {
			el.innerText = 'edit'
		})
		document.querySelector('button#add').innerText = 'Add to list'
	} else {
		var text = el.closest('li').querySelector('.text').innerText
		document.querySelector('input').value = text
		document.querySelectorAll('button.edit').forEach(function (element) {
			if (element.innerText === 'cancel') {
				element.innerText = 'edit'
			}
		})
		el.innerText = 'cancel'
		document.querySelector('button#add').innerText = 'Modify'
	}
}


function initCloseEvents () {
	document.querySelectorAll('button.close').forEach(function (element) {
		element.removeEventListener('click', addCloseEvent)
		element.addEventListener('click', addCloseEvent)
	})

	document.querySelectorAll('button.edit').forEach(function (el) {
		el.removeEventListener('click', addEditEvent)
		el.addEventListener('click', addEditEvent)
	})
}
