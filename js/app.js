let USERS = []
const tableBodyEl = document.getElementById('tableBody')

getData()

function renderUsers(where, array) {
    let html = ''
    array.forEach(element => html += createUser(element))
    where.innerHTML = html
}

function createUser(data) {
    return `<tr class="user">
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

// {

//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//             "lat": "-37.3159",
//             "lng": "81.1496"
//         }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//     }

// }