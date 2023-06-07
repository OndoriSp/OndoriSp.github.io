import axios from "axios"

const registerRequest = async (email, username, password1, password2, firstName, lastName) => {
    if (password1 !== password2 || password1.length < 8) {
        const response = {status: 406}
        return response
    }
    try {
        const response = await axios.post('http://localhost:5000/api/user/', 
        {
            username: username,
            email: email,
            password: password1,
            first_name: firstName,
            last_name: lastName,
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

export default registerRequest
