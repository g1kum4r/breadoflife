var controller = {};
users = [
    {'id': 1, 'name': 'user1'},
    {'id': 2, 'name': 'user2'},
    {'id': 3, 'name': 'user3'},
    {'id': 4, 'name': 'user4'},
    {'id': 5, 'name': 'user5'}
]

controller.getUser = function(){
    return users;
}

module.exports = controller;