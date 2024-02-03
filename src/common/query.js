
const knex = require("../database/config");

const findAll = async (tableName, field, params) => {
    if (params) {
        console.log(tableName,field,params);
        const data = await knex.select('*').from(tableName)
            .where(field, 'like', `%${params.search}%`)
            console.log(data);
        return data
    } else {
        const data = await knex.select('*').from(tableName)
        return data
    }

}

const insert = async (tableName, userData) => {
    const data = await knex(tableName).insert(userData)
    return data
}

const getbyId = async (tableName, id) => {

    return await knex.select('*').from(tableName).where(id)

}

const login = async (tableName, email, pass) => {
    return await knex.select('*').from(tableName).where(email).andWhere(pass)
}

const update = async (tableName, userData, id) => {
    return await knex.update(userData).from(tableName).where(id)
}

const Delete = async (tableName, id) => {
    if (id == '' || id == undefined) {
        return await knex(tableName).where(id).delete()
    }
}

const query = {
    insert,
    getbyId,
    update,
    Delete,
    login,
    findAll
}


module.exports = query;