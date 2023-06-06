import axios from "axios"

const editNoteRequest = async (noteId, title, tags, content) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/note/${noteId}`, 
        {
            title: title,
            tags: tags,
            content: content,
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

export default editNoteRequest
