import axios from "axios"

const addNoteRequest = async (title, tags, content) => {
    try {
        const response = await axios.post('http://localhost:5000/api/note/', 
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

export default addNoteRequest
