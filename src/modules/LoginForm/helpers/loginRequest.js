import axios from "axios"

const loginRequest = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', 
        {
            username: username,
            password: password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )

        console.log(response.data)
        sessionStorage.setItem('Authorization', `Bearer ${response.data.token}`)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default loginRequest
