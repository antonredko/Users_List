let USERS = []
const tableBlockEl = document.getElementById('tableBlock')
const tableBodyEl = document.getElementById('tableBody')
const userCardEl = document.getElementById('userCard')
const userCardBodyEl = document.getElementById('userCardBody')


getData()


tableBlockEl.querySelector('thead').addEventListener('click', event => {
    const order = (event.target.dataset.order = -(event.target.dataset.order || -1));
    const index = [...event.target.parentNode.cells].indexOf(event.target);
    const collator = new Intl.Collator(undefined, {
        sensitivity: 'accent'
    })
    const comparator = (index, order) => (a, b) => order * collator.compare(
        a.children[index].innerHTML,
        b.children[index].innerHTML
    )
    
    tableBodyEl.append(...[...tableBodyEl.rows].sort(comparator(index, order)))

    for (const cell of event.target.parentNode.cells) {
        cell.classList.toggle('sorted', cell === event.target)
    }
})


userCardEl.addEventListener('click', function(event) {
    const closeBtnEl = event.target.closest('.popup_close')
    if (closeBtnEl || event.target == this) {
        document.body.classList.remove('open', 'unscroll')
    }
})


document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        document.body.classList.remove('open', 'unscroll')
    }
})


tableBodyEl.addEventListener('click', event => {
    const userEl = event.target.closest('.user')

    if (userEl) {
        const userObj = USERS.find(user => user.id == userEl.dataset.id)

        userCardBodyEl.innerHTML = createUserCard(userObj)
        document.body.classList.add('open', 'unscroll')
    }
})


function createUserCard(user) {
    return `<fieldset class="user_card_block">
                <legend class="user_card_title">Main information</legend>
                <label class="user_card_row">
                    Name
                    <input type="text" name="name" value="${user.name}" readonly>
                </label>
                <label class="user_card_row">
                    Username
                    <input type="text" name="username" value="${user.username}" readonly>
                </label>
                <label class="user_card_row">
                    Website
                    <input type="text" name="website" value="${user.website}" readonly>
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Contacts</legend>
                <label class="user_card_row">
                    Phone
                    <input type="tel" name="phone" value="${user.phone}" readonly>
                </label>
                <label class="user_card_row">
                    Email
                    <input type="email" name="email" value="${user.email}" readonly>
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Address</legend>
                <label class="user_card_row">
                    Street
                    <input type="text" name="streer" value="${user.address.street}" readonly>
                </label>
                <label class="user_card_row">
                    Suite
                    <input type="text" name="suite" value="${user.address.suite}" readonly>
                </label>
                <label class="user_card_row">
                    City
                    <input type="text" name="city" value="${user.address.city}" readonly>
                </label>
                <label class="user_card_row">
                    Zipcode
                    <input type="text" name="zipcode" value="${user.address.zipcode}" readonly>
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Company</legend>
                <label class="user_card_row">
                    Name
                    <input type="text" name="company" value="${user.company.name}" readonly>
                </label>
                <label class="user_card_row catch_phrase">
                    Catch Phrase
                    <textarea name="phrase" rows="5" readonly>${user.company.catchPhrase}</textarea>
                </label>
            </fieldset>`
}


function renderUsers(where, array) {
    let html = ''
    array.forEach(element => html += createUser(element))
    where.innerHTML = html
}


function createUser(data) {
    return `<tr class="user" data-id="${data.id}">
                <td>${data.name}</td>
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>
                    <p>${data.website}</p>
                    <button class="remove_user_btn">&times;</button>
                </td>
            </tr>`
}


async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        USERS = data
        renderUsers(tableBodyEl, USERS)
    } catch (error) {
        console.warn(error)
    }
}