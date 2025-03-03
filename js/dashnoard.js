window.addEventListener("DOMContentLoaded", () => {
	const profileImage = document.getElementById('profileImage')
	const ownerName = document.getElementById('ownerName')
	const logoutBtn = document.getElementById('logoutBtn')
	const welcomeownerName = document.getElementById('welcomeOwner')
	const balance = document.getElementById('balance')
	const amountInput = document.getElementById('amountInput')
	const depositBtn = document.getElementById('depositBtn')
	const withDraw = document.getElementById('withdrawBtn')
	const transactionList = document.getElementById('transactionList')
	const searchInput = document.getElementById('searchInput')
	const select = document.getElementById('mySelect')
	const exportBtn = document.getElementById('exportBtn')


	const account = JSON.parse(localStorage.getItem('currentUser'))

	if (account) {
		profileImage.src = account.ownerImage || '../img/default.png'
		ownerName.textContent = account.owner || 'User'
		welcomeownerName.textContent = account.owner || 'User'
		balance.textContent = account.balance.toFixed(2) || '0'

		console.log(account)
		logoutBtn.addEventListener('click', () => {
			localStorage.removeItem('currentUser')
			window.location.href = 'index.html'
			window.location.replace('index.html')
		})
	}

	const addTransaction = (amount, type) => {
		const transaction = {
			type,
			amount,
			date: new Date().toLocaleString()
		}
		account.transactions.push(transaction)


		if (type.toLowerCase() === 'deposit') {
			account.balance += amount
		} else if (type.toLowerCase() === 'withdraw' && account.balance >= amount) {
			account.balance -= amount
		} else {
			Toastify({
				text: "Not enough balance!",
				duration: 2000,
				close: true,
				gravity: "top",
				position: "center",
				backgroundColor: "red",
			}).showToast()
			return
		}

		localStorage.setItem('currentUser', JSON.stringify(account))
		balance.textContent = account.balance.toFixed(2)

		upDateUi()
	}

	const upDateUi = (filteredTransaction = account.transactions) => {
		balance.textContent = account.balance.toFixed(2)

		transactionList.innerHTML = ''

		filteredTransaction.forEach((trans) => {
			const tr = document.createElement('tr')

			tr.innerHTML = `
				<td>${trans.type}</td>
				<td>${trans.amount.toFixed(2)} $</td>
				<td>${trans.date}</td>
				<td><i class="ri-corner-down-${trans.type === 'deposit' ? 'left' : 'right'}-line" style="font-size: 25px; color: ${trans.type === 'deposit' ? 'green' : 'red'}"></i></td>
			`

			transactionList.appendChild(tr)
		})
	}

	depositBtn.addEventListener('click', () => {
		const amount = parseFloat(amountInput.value)
		if (amount > 0) {
			addTransaction(amount, 'deposit')
			Toastify({
				text: `Deposited ${amount.toFixed(2)}$`,
				duration: 2000,
				close: true,
				gravity: "top",
				position: "center",
				backgroundColor: "green",
				borderRadius: "25px",
			}).showToast()
		} else {
			Toastify({
				text: 'Please enter a valid amount',
				duration: 3000,
				close: true,
				gravity: "top",
				position: "center",
				backgroundColor: "red", // Green gradient
			}).showToast()
		}
		amountInput.value = ''
	})

	withDraw.addEventListener('click', () => {
		const amount = parseFloat(amountInput.value)
		if (amount > 100) {
			addTransaction(amount, 'withdraw')
		} else {
			Toastify({
				text: 'Please enter a valid amount',
				duration: 3000,
				close: true,
				gravity: "top",
				position: "center",
				backgroundColor: "red", // Green gradient
			}).showToast()
		}
		amountInput.value = ''
	})



	logoutBtn.addEventListener('click', () => {
		localStorage.removeItem('currentUser')
		window.location.href = "../src/login.html	"
	})
	upDateUi()
})