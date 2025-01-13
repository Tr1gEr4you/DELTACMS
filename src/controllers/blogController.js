const blogModel = require('../models/blog')

module.exports = {
    removeById: async function (req, res) {
        await blogModel.removeById(req.params.id);

        res.redirect('/admin/blogs')
    },
    create: async function (req, res) {
        const {title, description, image, shortDescription}  = req.body;

        await blogModel.create(title, description, image, shortDescription)
        res.redirect('/admin/blogs')
    },
    getPostById: async function (req, res) {
        const blog = await blogModel.getById(req.params.id)

        res.render('blog', {blog: blog})
    },
    showBlogPage: async function (req, res) {
        const blogs = await blogModel.getAll();
        return res.render('blogs', {blogs: blogs});
    },
    showBlogPageOther: async function (req, res) {
        const blogs = await blogModel.getAll();
        return res.render('blogsOther', {blogs: blogs});
    },
    showBlogEditPage: async function (req, res) {
        res.render('admin/blogs/index', {blogs: await blogModel.getAll(), blogCount: await blogModel.getCount()})
    },
    showBlogAddPage: async function (req, res) {
        res.render('admin/blogs/add')
    },
}