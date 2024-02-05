'use strict'
const userService = require('../service/user')
require("../database/schema/user")
require("../database/schema/registration_invite_links")
const bcrypt = require('bcrypt');

const getUserbyId = (req, res) => {
    const id = req.body.id || ""
    userService.getUserById(id).then((data) => {
        res.json({ status: true, statusCode: 200, message: "get successfully", data: data })
    }).catch((err) => {
        console.log(err);
        res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
    })
};

const checkLink = async (req, res) => {
    const inviteToken = {
        Link: req.body.Link,
    }
    // const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (inviteToken.Link) {
        const invite = await userService.getUsedLink(inviteToken)
        let result = Object.values(JSON.parse(JSON.stringify(invite)))[0];
        if (result?.used == 0) {
            // result.updated_at = currentDate
            // result.used = true
            // delete (result.created_at)
            // await userService.updateLink(result)
            res.json({ status: true, statusCode: 404, message: "Add Succesfully", data: [] })
        } else {
            res.json({ status: false, statusCode: 404, message: "Invalid invite link. Please contact your Admin.", data: [] })
        }
    } else {
        res.json({ status: false, statusCode: 404, message: "Invalid invite link. Please contact your Admin.", data: [] })
    }
}
const createUser = async(req, res) => {
    const data = {
        Name: req.body.Name,
        Email: req.body.Email,
        Address: req.body.Address,
        Password: bcrypt.hashSync(req.body.Password, 12),
        Phone: req.body.Phone,
        Profile_pic: res.filepath
    }
    const inviteLink={
        Link:req.body.inviteLink
    }
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const invite = await userService.getUsedLink(inviteLink)
    let result = Object.values(JSON.parse(JSON.stringify(invite)))[0];
    userService.createUser(data).then(async(data) => {
        if (data) {
            result.updated_at = currentDate
            result.used = true
            delete (result.created_at)
            await userService.updateLink(result)
            res.json({ status: true, statusCode: 200, message: "Created successfully", data: data });
        }
    }).catch((err) => {
        console.log(err);
        res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
    });
};

const loginUser = (req, res) => {
    userService.loginuser(req.body).then((data) => {
        if (data != undefined && data.data) {
            res.cookie("user", data.data.token)
            res.json(data);
        } else {
            res.send(data);
        }
    }).catch((err) => {
        console.log(err);
        res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
    });
}

const updateUser = (req, res) => {
    let userData = req.body
    userData.updated_at = new Date()
    userData.Profile_pic = res.filepath
    userData.Password = bcrypt.hashSync(req.body.Password, 12),
        userService.updateuser(userData).then((data) => {
            res.json({ status: true, statusCode: 200, message: "updated successfully", data: data })
        }).catch((err) => {
            console.log(err);
            res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
        })
}

const getallUsers = async (req, res) => {
    const { search, status, limit, offset } = req.body;
    try {
        const filter = {
            search: search,
            status: status,
        };
        let userData = await userService.getAllUsers(filter);
        let count = 0;
        userData.forEach(val => {
            val['srNo'] = ++count;
        });
        const start = parseInt(offset);
        const end = start + parseInt(limit);
        const total = userData.length;
        userData = userData.length > limit ? userData.slice(start, end) : userData;

        res.json({
            status: true, message: 'Operation successful.', data: { users: await userData, total: total }
        });

    } catch (error) {
        console.log(error);
        res.json({ status: false, message: error.message });

    }
};

const getAdminList = async (req, res) => {
    const { search, status, limit, offset } = req.body;
    try {
        const filter = {
            Role: 2
        };
        let userData = await userService.getAllAdmins(filter);
        let count = 0;
        userData.forEach(val => {
            val['srNo'] = ++count;
        });
        const start = parseInt(offset);
        const end = start + parseInt(limit);
        const total = userData.length;
        userData = userData.length > limit ? userData.slice(start, end) : userData;
        res.json({
            status: true, message: 'Operation successful.', data: { users: await userData, total: total }
        });

    } catch (error) {
        console.log(error);
        res.json({ status: false, message: error.message });
    }
};

const deleteUser = (req, res) => {
    console.log(req.body.id);
    userService.deleteUser(req.body.id).then((data) => {
        res.json({ status: true, statusCode: 200, message: "delete successfully", data: data })
    }).catch((err) => {
        console.log(err);
        res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
    })
};

const userLogout = (req, res) => {
    res.clearCookie("user")
    res.json({ message: "logout success" })
}

const addLink = (req, res) => {
    console.log(req.body.Link);
    if (req.body.Link) {
        const data = {
            Link: req.body.Link,
        }
        userService.insertLink(data).then((data) => {
            if (data) {

                res.json({ status: true, statusCode: 200, message: "Created successfully", data: data });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
        });
    } else {
        res.json({ status: false, statusCode: 404, message: "Link Is undefined", data: [] })
    }

};
const userCtrl = {
    getUserbyId,
    createUser,
    updateUser,
    getallUsers,
    deleteUser,
    loginUser,
    userLogout,
    getAdminList,
    checkLink,
    addLink
}
module.exports = { userCtrl };
