import axios from "axios"

const getNoteRequest = async (noteId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/note/${noteId}`, 
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

export default getNoteRequest
