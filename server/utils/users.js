const userList = [];

// users joins
function addUser(id, username, room) {
    const user = {
        id,
        username,
        room
    };
    userList.push(user);
    return user;
}

function getUser(id) {
    return userList.find(user => user.id === id);
}

function removeUser(id) {
    const index = userList.findIndex(user => user.id === id);
    if (index !== -1) {
        return userList.splice(index, 1)[0];
    }
}

function getRoomUserList(room) {
    return userList.filter(user => user.room === room);
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getRoomUserList
}