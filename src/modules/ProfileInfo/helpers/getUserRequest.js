import axios from "axios"

const getUserRequest = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/user/', 
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

export default getUserRequest
