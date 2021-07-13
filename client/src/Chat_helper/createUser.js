import axios from 'axios'

export const createUser = (data, successFunc) => {
    axios.post(
        `https://api.chatengine.io/users/`,
        data,
        { headers: { "Private-Key": '6b97f967-a034-421e-85fc-2c97692e53ba' } }
    )

    .then((response) => {
        successFunc(response.data)
    })

    .catch((error) => {
        console.log('Create chat user', error.response)
    })
}