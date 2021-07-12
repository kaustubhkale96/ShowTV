import { SIGNUP_USER } from './types'
export function signupUser(data) {
    return {
        type: SIGNUP_USER,
        payload: {
            user: data
        }
    }
}