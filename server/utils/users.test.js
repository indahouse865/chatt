const expect = require('expect');

const {Users} = require('./Users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Pumpkin",
            room: "Meow"
        }, {
            id: "2",
            name: "Ben",
            room: "sunday"
        }, {
            id: "3",
            name: "discord",
            room: "Meow"
        }];
    });

    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "David",
            room: "meow"
        };
        let userReturned = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should remove a user', () => {
        let userId = "1";
        let removed = users.removeUser(userId);

        expect(removed).toEqual({
            id: "1",
            name: "Pumpkin",
            room: "Meow"
        });
        expect(users.users.length).toEqual(2);
        expect(removed.id).toBe("1");
    });

    it('Should not remvoe a user', () => {
        let userId = "101000";
        let user = users.removeUser(userId);

        expect(user).toBe(undefined);
    });

    it('Should find user', () => {
        let userId = "2";
        let user = users.getUser(userId);

        expect(user).toEqual(users.users[1]);
        expect(user.id).toBe(userId);
    });

    it('Should not find user', () => {
        let userId = "101000";
        let user = users.getUser(userId);

        expect(user).toBe(undefined);
        expect(user).toBeFalsy()
    });
    
    it('Should return names for of memebers in Meow', () => {
        let userList = users.getUserList('Meow');

        expect(userList).toEqual(["Pumpkin", "discord"]);
    });

    it('Should return names for of memebers in sunday', () => {
        let userList = users.getUserList('sunday');

        expect(userList).toEqual(["Ben"]);
    });

});
