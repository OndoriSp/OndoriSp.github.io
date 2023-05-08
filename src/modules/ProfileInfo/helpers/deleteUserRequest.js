import axios from "axios"

const deleteUserRequest = async () => {
    try {
        const response = await axios.delete('http://localhost:5000/api/user/', 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
            },
        }
        )

        console.log(response.data)
        sessionStorage.removeItem('Authorization')
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default deleteUserRequest
