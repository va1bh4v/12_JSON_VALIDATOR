const Users = require('../models/UserSchema')
const Validator = require('../models/ValidatorSchema')
const Projects = require('../models/ProjectSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const { route } = require('../app')
const router = express.Router()


router.post('/register', async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return res.status(400).json({ msg: 'Something is missing email/Password' })
    }

    const user = await Users.findOne({ email })
    if (user) {
        return res.status(400).json({ msg: 'User already exists' })
    }
    const newUser = new Users({ email, password, role })
    bcrypt.hash(password, 7, (err, hash) => {
        if (err) {
            return res.status(400).json({ msg: 'Something went wrong' })
        }
        newUser.password = hash
        const savedUser = newUser.save()
        if (savedUser) {
            return res.status(200).json({ msg: 'User created successfully' })
        }
    })
})

router.post('/alljson', async (req, res) => {
    const { email, proj_name } = req.body
    const json = await Projects.find({ name: proj_name, owner: email })
    if (json) {

        return res.status(200).json(json)
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }

})

router.post('/grammar', async (req, res) => {
    const { validator_name } = req.body
    const grammar = await Validator.find({ name: validator_name })
    if (grammar) {
        return res.status(200).json(grammar)
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
})

router.get('/all_grammar', async (req, res) => {
    console.log("Validators...")
    const grammar = await Validator.find({ type: "Validator" })
    console.log(grammar)
    if (grammar) {
        return res.status(200).json(grammar)
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
})

router.post('/json', async (req, res) => {
    const { name, stage, json_str } = req.body
    console.log(json_str)
    const proj = await Projects.find({ name: name })
    if (proj) {
        // add new key to json_obj
        json_ob = JSON.parse(proj[0].json_obj)
        json_ob[stage] = json_str
        json_ob = JSON.stringify(json_ob)

        const updatedProj = await Projects.updateOne({
            name: name
        }, {
            $set: {
                stage: stage,
                json_obj: json_ob
            }
        })
        if (updatedProj) {
            return res.status(200).json({ msg: 'JSON updated successfully' })
        }
        else {
            return res.status(400).json({ msg: 'Something went wrong' })
        }

    }

})


router.post('/getJson', async (req, res) => {
    const { name, owner, stage } = req.body
    const proj = await Projects.find({ name: name, owner: owner })
    //chk if json[stage] exists
    if (proj) {

        if (proj[0]) {
            if (proj[0].json_obj) {
                var json_ob = proj[0].json_obj
                // convert string to json
                json_ob = JSON.parse(json_ob)
                if (json_ob[stage]) {
                    return res.status(200).json(json_ob[stage])
                }
                else {
                    return res.status(400).json({ msg: 'Something went wrong' })
                }
            }
            else {
                return res.status(400).json({ msg: 'Something went wrong' })
            }
        }
        else {
            return res.status(400).json({ msg: 'Something went wrong' })
        }

    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }


})


router.post('/validator', async (req, res) => {
    //json is uploaded by user and is stored in req.body directly pushing it to db

    const { name, data } = req.body
    console.log(data)
    const type = "Validator"
    const newValidator = new Validator({ name: name, type: type, data: data })
    const savedValidator = newValidator.save()
    if (savedValidator) {
        return res.status(200).json({ msg: 'Validator created successfully' })
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }


})



//testing if users are saved by retrieving all users
router.get('/all', async (req, res) => {
    const users = await Students.find();
    res.status(200).json({ "data": users })
    return res.status(200).json({ "data": users })
})



router.post(`/login`, async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" })
    }
    const user = await Users.findOne({ email })

    if (!user) {

        return res.status(400).json({ message: "User does not exist" })
    }
    console.log(password)
    console.log(user)
    // bycrpt password and compare with user password


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        console.log("password does not match")
        return res.status(400).json({ message: "Invalid credentials" })
    }
    else {
        const r = await Users.find({ email: email })
        if (r) {
            // role based login
            role = user.role;
            req.session.email = email;
            req.session.role = role;
            req.session.save();

            if (role == "admin") {
                return res.status(200).json({ message: "Login successful", role: role })
            }
            else if (role == "user") {
                return res.status(200).json({ message: "Login successful", role: role })
            }
            else {
                return res.status(400).json({ message: "Invalid credentials" })
            }
        }
    }
})




router.get('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
            if (err)
                return res.status(500).send("Unable to Logout!");
            else
                return res.status(200).json({ "msg": "Logout Successfull..." });
        })
    }
})


router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user)
    } else {
        return res.status(401).json('unauthorize')
    }
})


router.post(`/addProject`, async (req, res) => {
    const { name, owner, stage } = req.body

    console.log(name)
    console.log(owner)
    console.log(stage)
    if (!name || !owner || !stage) {
        return res.status(400).json({ message: "Please enter all fields" })
    }

    const project = await Projects.findOne({ "name": name, "owner": owner })
    console.log(project)
    if (project) {
        return res.status(400).json({ message: "Project name already Exists" })
    }
    var json_obj = {
        "1": {},
        "2": {},
        "3": {}
    };
    console.log(json_obj)
    // stringify json_obj
    json_obj = JSON.stringify(json_obj)

    const newProject = new Projects({ name: name, owner: owner, stage: stage, json_obj: json_obj })
    console.log(newProject)
    const savedProject = newProject.save()
    if (savedProject) {
        return res.status(200).json({ msg: 'Project created successfully' })
    }
    else {
        return res.status(400).json({ msg: 'Something went wrong' })
    }

})

router.post('/allProjects', async (req, res) => {
    const { owner } = req.body
    const projects = await Projects.find({ owner: owner })

    // const projects = await Projects.find();
    if (projects) {
        return res.status(200).json({ "data": projects })
    }
    else {
        return res.status(400).json({ msg: "Something went wrong" })
    }

    // return res.status(200).json({ "data": projects })
})







module.exports = router
