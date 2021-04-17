import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Huy Den',
        email: 'huyden@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Tien Bui',
        email: 'tienbui@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;