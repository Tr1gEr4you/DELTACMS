const serverModel = require('../../modules/monitoring/models/server-source')

module.exports = {
    showMainPage: function (req, res) {
        return res.render('index');   
    },
    
}