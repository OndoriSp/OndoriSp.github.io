import axios from "axios"

const editRequest = async (username, password1, password2) => {
    if (password1 !== password2) {
        const response = {status: 406}
        return response
    }
    try {
        const response = await axios.put('http://localhost:5000/api/user/', 
        {
            username: username,
            password: password1,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )

        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default editRequest
