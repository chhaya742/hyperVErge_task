'use strict'
const userService = require('../service/user')
require("../database/schema/user")
require("../database/schema/used_invite_links")
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

    const data = {
        Link: req.body.Link,
    }
    console.log(data);
    if(data.Link){
        userService.insertLink(data).then((data) => {
            if (data) {
                res.json({ status: true, statusCode: 200, message: "Inserted successfully", data: data });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ status: false, statusCode: 404, message: err.sqlMessage, data: [] })
        });
    }
   

    // const usedLink = await userService.getUsedLink()
    // let result = Object.values(JSON.parse(JSON.stringify(usedLink)))[0];
    // if (result) {

    // }
    // console.log("result", result);

    // const usedInviteLinks = new Set();

    // if (usedInviteLinks.has(inviteLink)) {
    //     return res.status(400).json({ error: 'Invalid invite link. Please contact your Admin.' });
    // }

}
const createUser = (req, res) => {
    const data = {
        Name: req.body.Name,
        Email: req.body.Email,
        Address: req.body.Address,
        Password: bcrypt.hashSync(req.body.Password, 12),
        Phone: req.body.Phone,
        Profile_pic: req.body.Profile_pic
    }
    userService.createUser(data).then((data) => {
        if (data) {
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
    delete (userData.created_at)
    userData.updated_at = new Date();
    console.log(userData);
    userService.updateuser(req.body).then((data) => {
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
    console.log(req.body);
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

const userCtrl = {
    getUserbyId,
    createUser,
    updateUser,
    getallUsers,
    deleteUser,
    loginUser,
    userLogout,
    getAdminList,
    checkLink
}
module.exports = { userCtrl };
