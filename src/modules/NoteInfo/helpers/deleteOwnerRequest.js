import axios from "axios"

const deleteOwnerRequest = async (noteId, userId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/note/owners/${noteId}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
            },
            data: {
                user_id: userId,
            }
        }
        )

        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return error.code
    }
}

export default deleteOwnerRequest
