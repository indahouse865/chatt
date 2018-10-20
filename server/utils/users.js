class Users{
    constructor() {
        this.users = [];
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let thisUser = this.getUser(id);
        if (thisUser){
            this.users = this.users.filter((user) => {
                if (user.id !== thisUser.id) {
                    return user;
                }
            });
            return thisUser;
        }
        return thisUser;
    }
    getUserList(room) {
        //return array of memebers
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => {
            return user.name
        });

        return namesArray;
    }
}

module.exports = {Users}
