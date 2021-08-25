import axios from 'axios';
let data = null
export const loginUser = async (username, password) => {
    await axios.post(`http://localhost:5000/api/auth/signin`, { username, password })
        .then(res => {
            console.log('login', res);
            data = res
            sessionStorage.setItem('user_data', JSON.stringify(res.data))
            sessionStorage.setItem('username', res.data.username)
            sessionStorage.setItem('login_status', res.status)
        })
        .catch(err => {
            console.log(err)
        })
    return data;
}