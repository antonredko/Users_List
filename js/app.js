let USERS = []
const tableBlockEl = document.getElementById('tableBlock')
const tableBodyEl = document.getElementById('tableBody')
const modalEl = document.getElementById('modal')
const modalBodyEl = document.getElementById('modalBody')
const addUserBtnEl = document.getElementById('addUserBtn')


getData(tableBodyEl)


modalBodyEl.addEventListener('submit', function(event) {
    event.preventDefault()
    const newUser = {
        "id": USERS[USERS.length - 1].id + 1,
        "name": this.name.value,
        "username": this.username.value,
        "email": this.email.value,
        "address": {
            "street": this.street.value || "---",
            "suite": this.suite.value || "---",
            "city": this.city.value || "---",
            "zipcode": this.city.value || "---",
            "geo": {
                "lat": this.latitude.value || "---",
                "lng": this.longitude.value || "---"
            }
        },
        "phone": this.phone.value || "---",
        "website": this.website.value || "---",
        "company": {
            "name": this.company.value || "---",
            "catchPhrase": this.phrase.value || "---",
            "bs": this.bs.value || "---"
        }
    }
    USERS.push(newUser)
    renderUsers(tableBodyEl, USERS)
    document.body.classList.remove('open', 'unscroll')
})


addUserBtnEl.addEventListener('click', () => {
    modalBodyEl.innerHTML = newUserForm()
    document.body.classList.add('open', 'unscroll')
})

function sortUsers(col) {
    USERS.sort((a, b) => {
        return a[col].localeCompare(b[col])
    })
    renderUsers(tableBodyEl, USERS)
}

tableBlockEl.addEventListener('click', event => {
    const colEl = event.target.closest('.table_col')
    if (colEl) {
        const colName = colEl.dataset.col
        sortUsers(colName)
    }
    // const order = (event.target.dataset.order = -(event.target.dataset.order || -1));
    // const index = [...event.target.parentNode.cells].indexOf(event.target);
    // const collator = new Intl.Collator(undefined, {
    //     sensitivity: 'accent'
    // })
    // const comparator = (index, order) => (a, b) => order * collator.compare(
    //     a.children[index].innerHTML,
    //     b.children[index].innerHTML
    // )
    
    // tableBodyEl.append(...[...tableBodyEl.rows].sort(comparator(index, order)))

    // for (const cell of event.target.parentNode.cells) {
    //     if (cell.dataset.col != "delete") {
    //         cell.classList.toggle('sorted', cell === event.target)
    //     }
    // }
})


modalEl.addEventListener('click', function(event) {
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
    const removeUserBtnEl = event.target.closest('.remove_user_btn')
    if (userEl && !removeUserBtnEl) {
        const userObj = USERS.find(user => user.id == userEl.dataset.id)
        modalBodyEl.innerHTML = createUserCard(userObj)
        document.body.classList.add('open', 'unscroll')
    }
    if (removeUserBtnEl && userEl) {
        const userIndex = USERS.findIndex(user => user.id == userEl.dataset.id)
        USERS.splice(userIndex, 1)
        renderUsers(tableBodyEl, USERS)
    }
})


function newUserForm() {
    return `<fieldset class="user_card_block">
                <legend class="user_card_title">Main information</legend>
                <label class="user_card_row">
                    Name
                    <input type="text" name="name" placeholder="Firstname and Lastname" required>
                </label>
                <label class="user_card_row">
                    Username
                    <input type="text" name="username" placeholder="Username" required>
                </label>
                <label class="user_card_row">
                    Website
                    <input type="text" name="website" placeholder="Website" required>
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Contacts</legend>
                <label class="user_card_row">
                    Phone
                    <input type="tel" name="phone" placeholder="Phone number">
                </label>
                <label class="user_card_row">
                    Email
                    <input type="email" name="email" placeholder="Email" required>
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Address</legend>
                <label class="user_card_row">
                    Street
                    <input type="text" name="street" placeholder="Street">
                </label>
                <label class="user_card_row">
                    Suite
                    <input type="text" name="suite" placeholder="Suite">
                </label>
                <label class="user_card_row">
                    City
                    <input type="text" name="city" placeholder="City">
                </label>
                <label class="user_card_row">
                    Zipcode
                    <input type="text" name="zipcode" placeholder="Zipcode">
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Geo</legend>
                <label class="user_card_row">
                    Latitude
                    <input type="text" name="latitude" placeholder="Latitude">
                </label>
                <label class="user_card_row">
                    Longitude
                    <input type="text" name="longitude" placeholder="Longitude">
                </label>
            </fieldset>
            <fieldset class="user_card_block">
                <legend class="user_card_title">Company</legend>
                <label class="user_card_row">
                    Name
                    <input type="text" name="company" placeholder="Company name">
                </label>
                <label class="user_card_row phrase">
                    Catch Phrase
                    <textarea name="phrase" rows="5" placeholder="Catch Phrase"></textarea>
                </label>
                <label class="user_card_row phrase">
                    BS
                    <textarea name="bs" rows="5" placeholder="BS"></textarea>
                </label>
            </fieldset>
            <button class="create_user_btn" type="submit">Create New User</button>`
}


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
                <label class="user_card_row phrase">
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
                <td>${data.name || "---"}</td>
                <td>${data.username || "---"}</td>
                <td>${data.email || "---"}</td>
                <td>${data.website || "---"}</td>
                <td><button class="remove_user_btn"></button></td>
            </tr>`
}


async function getData(block) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        renderUsers(block, data)
        USERS = data
    } catch (error) {
        console.warn(error)
    }
}