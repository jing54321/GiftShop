import bcrypt from 'bcryptjs';

const users = [
    {
        name:'Admin',
        email:'leekyungwon98@gmail.com',
        password: bcrypt.hashSync('jing98', 10),
        isAdmin: true
    },
    {
        name:'Sunyoung',
        email:'softssy@gmail.com',
        password: bcrypt.hashSync('kw0122', 10),
    },
    {
        name:'Mason',
        email:'progamer0825@gmail.com',
        password: bcrypt.hashSync('110825', 10),
    }
]

export default users
    
