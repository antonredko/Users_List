let USERS = []
const bodyEl = document.body
const tableBodyEl = document.getElementById('tableBody')
const userCardEl = document.getElementById('userCard')
const userCardContentEl = document.getElementById('userCardContent')
const userCardBodyEl = document.getElementById('userCardBody')


getData()


userCardEl.addEventListener('click', event => {
    if (!event.target.closest('.popup_content')) {
        userCardEl.classList.remove('open')
        bodyEl.classList.remove('unscroll')
    }
})


userCardContentEl.addEventListener('click', event => {
    const closeBtnEl = event.target.closest('.popup_close')

    if (closeBtnEl) {
        userCardEl.classList.remove('open')
        bodyEl.classList.remove('unscroll')
    }
})


tableBodyEl.addEventListener('click', event => {
    const userEl = event.target.closest('.user')

    if (userEl) {
        const userObj = USERS.find(user => user.id == userEl.dataset.id)

        userCardBodyEl.innerHTML = createUserCard(userObj)
        userCardEl.classList.add('open')
        bodyEl.classList.add('unscroll')
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
                <td>${data.website}</td>
            </tr>`
}


async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        USERS = [...data]
        renderUsers(tableBodyEl, USERS)
    } catch (error) {
        console.warn(error)
    }
}