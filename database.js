let users = [
	{ id: "1", name: "Jane Doe", bio: "this is a bio" },
	{ id: "2", name: "John Doe", bio: "this is a bio" },
	{ id: "3", name: "Jack Doe", bio: "this is a bio" },
];

function getUsers() {
    return users;
};

function getUserById(id) {
    return users.find(user => user.id === id);
};

function createUser(data) {
    const payload = {
        id: String(users.length + 1),
        ...data,
    };

    users.push(payload);
    return payload;
};

function updateUser(id, data) {
    const index = users.findIndex(user => user.id === id);
    users[index] = {
        ...users[index],
        ...data,
    };
    return users[index];
};

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
};

module.exports = {
    getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}