const allowedPages = ['index', 'jaja']

module.exports = {
    showMainPage: function (req, res) {
        return res.render('index');   
    },
    /*showPage: function (req, res) {
        const page = req.params.page;
        if (allowedPages.includes(page)) {
            return res.render(page);
        } else {
            res.status(404).render('error')
        }
    }*/
}