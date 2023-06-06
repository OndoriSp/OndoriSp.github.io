import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import TextField from "../../../ui/TextField"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import addNoteRequest from "../helpers/addNoteRequest"
import { ROUTES } from "../../../routes/routes"
import getNoteRequest from "../../NoteInfo/helpers/getNoteRequest"
import editNoteRequest from "../helpers/editNoteRequest"
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'


function NoteForm() {
    const { noteId } = useParams('noteId')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [error, setError] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()

    const handleAddNote = async (event) => {
        event.preventDefault()

        const result = await addNoteRequest(title, tags.join(', '), content)

        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        } else {
            navigate(ROUTES.NOTELIST)
        }
    }

    const handleEditNote = async (event) => {
        event.preventDefault()

        const result = await editNoteRequest(noteId, title, tags.join(', '), content)

        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        } else {
            navigate(ROUTES.NOTEINFO.replace(':noteId', noteId))
        }
    }

    const handleGetNote = async () => {
        const result = await getNoteRequest(noteId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setTitle(result.data.title)
        setTags(result.data.tags.split(', '))
        setContent(result.data.content)
    }

    const handleAddTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (noteId) {
            handleGetNote()
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    {
                        noteId
                            ?
                            <h1>Редагування нотатки</h1>
                            :
                            <h1>Створення нотатки</h1>
                    }
                    {error && <h3 className={styles.error}>Неправильно введені дані.</h3>}
                </div>
                <Input label={"Назва"}
                    placeholder={"Назва нотатки"}
                    value={title}
                    error={error}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <div>
                    <Autocomplete
                        multiple
                        freeSolo
                        options={tags.map((option) => option)}
                        value={tags}
                        onChange={(event, newValue) => {
                            setTags(newValue);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Теги"
                                placeholder="Теги"
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddTag()
                                    }
                                }}
                            />
                        )}
                    />
                </div>
                <TextField label={"Вміст"}
                    placeholder={"Вміст..."}
                    multiline
                    rows={10}
                    inputProps={{
                        maxLength: 404,
                    }}
                    value={content}
                    error={error}
                    onChange={(event) => setContent(event.target.value)}
                />
                {
                    noteId
                        ?
                        <Button onClick={handleEditNote} text={"Внести зміни"} />
                        :
                        <Button onClick={handleAddNote} text={"Створити нотатку"} />
                }
            </div>
        </div>
    )
}

export default NoteForm;
