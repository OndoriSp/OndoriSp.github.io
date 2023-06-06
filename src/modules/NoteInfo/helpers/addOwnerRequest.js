import axios from "axios"

const addOwnerRequest = async (noteId, userId) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/note/owners/${noteId}`, 
        {
            user_id: userId,
        },
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

export default addOwnerRequest
