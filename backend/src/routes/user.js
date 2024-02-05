const { userCtrl } = require('../ctrl/user');
const authentication = require("../Middleware/auth")
const upload = require("../Middleware/upload")

module.exports = (router) => {
    router.post('/user/create', userCtrl.createUser);
    router.put('/user/update', upload, authentication, userCtrl.updateUser);
    router.post('/user/login', userCtrl.loginUser);
    router.post('/user/id', authentication, userCtrl.getUserbyId);
    router.get('/user/logout', userCtrl.userLogout);
    router.post('/user/list', authentication, userCtrl.getallUsers);
    router.delete('/user/delete', authentication, userCtrl.deleteUser);
    router.post('/admin/list', authentication, userCtrl.getAdminList);
    router.post("/check-link", userCtrl.checkLink)
    router.post("/add-link", userCtrl.addLink)

}
