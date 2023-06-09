const db = require('../models/index');
const User = db.User;

exports.userList = async function (req, res) {
    await User.findAll()
        .then(data => {
            console.log("All users:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.userCreate = async (req, res) => {
    let user = User.build({
        login: req.body.login, 
        password: req.body.password })
    await user.save()
        .then(data => {
            console.log(user.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.userUpdate = async function (req, res) {
    if (req.params.id_user > 0) {
        await User.update(
            {
                login: req.body.login, password: req.body.password},
            {   where: { id_user: req.params.id_user } }
        )
            .then(data => {
                if (data[0] == 0) { res.status(400).json({ message: 'Not found' }) }
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
}

exports.userDelete = async function (req, res) {
    if (req.params.id_user) {
        await User.destroy({ where: { id_user: req.params.id_user } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Not found' });
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
}

exports.userFindOne = async function (req, res) {
    if (req.id_user) {
        await User.findOne({ where: { id_user: req.id_user } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
}

exports.checkUser = async function (req,res) {
    console.log(req.body.login)
    if (req.body.login && req.body.password) {
        await User.findOne({where: {login : req.body.login, password : req.body.password}})
        .then(data => {console.log(data)
            res.json(data);
            return data
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }else res.status(400).json({message: "User not found"})
}