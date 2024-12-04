let users = [
    {
        id: '1', username: 'Tr1gEr', age: '19', admin: 1
    },
    {
        id: '2', username: 'Dizzz', age: '25', admin: 0
    },
    {
        id: '3', username: 'Amd', age: '27', admin: 0
    },
    {
        id: '4', username: 'Intel', age: '34', admin: 0
    },
    {
        id: '5', username: 'Demo', age: '17', admin: 1
    },
    {
        id: '6', username: 'Hggg', age: '17', admin: 0
    },
    {
        id: '7', username: 'SHVDggg', age: '12', admin: 0
    },
    {
        id: '8', username: 'Hfghgg', age: '34', admin: 0
    },
    {
        id: '9', username: 'gfvHggg', age: '74', admin: 0
    },
    {
        id: '10', username: 'Hgfg', age: '16', admin: 0
    },
    {
        id: '11', username: '213Hgs2gg', age: '24', admin: 0
    },
    {
        id: '12', username: 'Hg12gg', age: '22', admin: 0
    },
]

module.exports = {
    getAll: function () {
        return users;
    },
    getById: function (id) {
        const user = users.find(function(user) {return user.id === id})
        return user
    },
    removeById: function (id) {
        const user = users.find(function(user) {return user.id === id})
        users.splice(id, 1); 
    }
}