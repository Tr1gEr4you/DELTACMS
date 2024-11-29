let users = [
    {
        id: '1', username: 'Tr1gEr', age: '19', admin: 1
    },
    {
        id: '2', username: 'Gfg', age: '25', admin: 0
    },
    {
        id: '3', username: 'sdfgsdfg', age: '27', admin: 0
    }
]

module.exports = {
    getAll: function () {
        return users;
    }
}