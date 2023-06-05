import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import { useParams } from 'react-router-dom';
import styles from '../styles/style.module.scss'
import { Button } from '@mui/material'
import getNoteRequest from '../helpers/getNoteRequest'
import deleteNoteRequest from '../helpers/deleteNoteRequest'
import UserList from '../../UserList/components/UserList';

function NoteInfo() {
    const { noteId } = useParams();
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [owners, setOwners] = useState([])
    const navigate = useNavigate()

    const handleGetNote = async () => {
        const result = await getNoteRequest(noteId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setTitle(result.data.title)
        setTags(result.data.tags)
        setContent(result.data.content)
    }

    const handleDeleteNote = async (event) => {
        event.preventDefault()
        await deleteNoteRequest(noteId)
        navigate(ROUTES.NOTELIST)
    }

    useEffect(() => {
        handleGetNote()
    }, [])

    return (
        <>
            <main>
                <section className={styles.textblock}>
                    <div className={styles.row} id="user-info">
                        <div className={styles.columnMain}>
                            <h2>Назва: {title}</h2>
                            <p>Теги: {tags}</p>
                            <h3>Вміст</h3>
                            <p>{content}</p>
                        </div>
                        <div className={styles.column}>
                            <Button onClick={() => { navigate(ROUTES.PROFILEUPD) }}
                                sx={{
                                    width: '100%',
                                    marginBottom: '0.5rem',
                                    backgroundColor: "#FFF",
                                    textTransform: "none",
                                    border: "1px solid #D72230",
                                    borderRadius: "5",
                                    color: '#D72230',
                                    height: "3rem",
                                    fontSize: "1rem",
                                    '&:hover': {
                                        backgroundColor: '#E02431',
                                        border: "1px solid #E02431",
                                        color: '#FFF',
                                    },
                                    '&:active': {
                                        border: "1px solid #C81E15",
                                        backgroundColor: '#C81E15',
                                    }
                                }}>
                                Редагувати нотатку
                            </Button>
                            <Button onClick={handleDeleteNote}
                                sx={{
                                    width: '100%',
                                    marginBottom: '0.5rem',
                                    backgroundColor: "#D72230",
                                    textTransform: "none",
                                    border: "none",
                                    borderRadius: "5",
                                    color: '#FFF',
                                    height: "3rem",
                                    fontSize: "1rem",
                                    '&:hover': {
                                        backgroundColor: '#E02431',
                                        border: "none",
                                    },
                                    '&:active': {
                                        backgroundColor: '#C81E15',
                                    }
                                }}>
                                Видалити нотатку
                            </Button>
                        </div>
                        <div className={styles.column}>
                            <UserList />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default NoteInfo