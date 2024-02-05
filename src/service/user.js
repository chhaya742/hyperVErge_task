"use strict";
const query = require("../common/query");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");


const createUser = async (userData) => {
    const token = sign({ password: userData.password }, process.env.JSON_ACCESS_TOKEN, { expiresIn: "6h" })
    var data = await query.insert('user', userData);
    var data = await query.getbyId('user', { "id": data[0] });
    let result = Object.values(JSON.parse(JSON.stringify(data)))[0];
    result["token"] = token;
    return result;
}

const insertLink=async(data)=>{
    var data = await query.insert('registration_invite_links', data);
    let result = Object.values(JSON.parse(JSON.stringify(data)))[0];
    return result;
}
const loginuser = async (userData) => {
    var data = await query.getbyId('user', { "Email": userData.Email });
    let result = Object.values(JSON.parse(JSON.stringify(data)))[0];
    if (result) {
        if (result.password == userData.Password) {
            const token = sign({ password: result.password }, process.env.JSON_ACCESS_TOKEN, { expiresIn: "6h" });
            result["token"] = token;
            return ({ status: true, statusCode: 200, messages: "login successfully", data: result });
        } else {
            return ({ status: false, statusCode: 403, messages: "Incorrect password", data: [] });
        }
    } else {
        return ({ status: false, statusCode: 403, messages: "Incorrect Email", data: [] })
    }
}

// Update
const updateuser = async (userData) => {
    return query.update('user', userData, { id: userData.id });
}
// GetAll
const getAllUsers = async (filter) => {
    return query.findAll('user', "Name", filter);
};

const getUsedLink = async (filter) => {
    let data=query.getbyId('registration_invite_links', filter);
    return data

};

const getAllAdmins = async (filter) => {
    return query.getbyId('user', filter );
};

// Get By Id
const getUserById = async (id) => {
    return query.getbyId('user', { "id": id });
};

const deleteUser = async (id) => {
    return query.Delete('user', id);
};

const updateLink = async (data) => {
    return query.update('registration_invite_links',  data, { Link: data.Link });
};

const userService = {
    createUser,
    loginuser,
    updateuser,
    getAllUsers,
    getUserById,
    deleteUser,
    getAllAdmins,
    getUsedLink,
    insertLink,
    updateLink
    
};
module.exports = userService;
