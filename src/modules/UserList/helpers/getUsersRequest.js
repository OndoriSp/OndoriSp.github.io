import axios from "axios"

const getUsersRequest = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/user/all', 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
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

export default getUsersRequest
