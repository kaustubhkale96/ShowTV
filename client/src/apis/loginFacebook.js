import axios from 'axios';
let data = null
export const loginFbUser = async (username, password) => {
    await axios.post(`http://localhost:5000/api/auth/signin`, { username, password })
        .then(res => {
            console.log(res);
            data = res
            sessionStorage.setItem('user_data', res)
            sessionStorage.setItem('username', res.data.username)
        })
        .catch(err => {
            console.log(err)
        })
    return data;
}