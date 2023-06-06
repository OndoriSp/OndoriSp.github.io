import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import { useParams } from 'react-router-dom';
import styles from '../styles/style.module.scss'
import { Button } from '@mui/material'
import getNoteRequest from '../helpers/getNoteRequest'
import getNoteOwnersRequest from '../helpers/getNoteOwnersRequest'
import deleteNoteRequest from '../helpers/deleteNoteRequest'
import addOwnerRequest from '../helpers/addOwnerRequest'
import deleteOwnerRequest from '../helpers/deleteOwnerRequest'
import UserList from './UserList/components/UserList'
import PopUpRemovalWarning from '../../PopUpRemovalWarning'

function NoteInfo() {
    const { noteId } = useParams();
    const userId = parseInt(sessionStorage.getItem('userId'))
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [creatorId, setCreatorId] = useState()
    const [owners, setOwners] = useState([])
    const navigate = useNavigate()

    const [openPopUpRemovalWarning, setOpenPopUpRemovalWarning] = useState(false)

    const handleClosePopUpRemovalWarning = () => {
        setOpenPopUpRemovalWarning(false)
    }

    const handleGetNote = async () => {
        const result = await getNoteRequest(noteId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setTitle(result.data.title)
        setTags(result.data.tags)
        setContent(result.data.content)
        setCreatorId(result.data.user_iduser)
        console.log(creatorId)
        console.log(userId)
        handleGetNoteOwners()
    }

    const handleGetNoteOwners = async (event) => {
        const result = await getNoteOwnersRequest(noteId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setOwners(result.data)
    }

    const handleDeleteNote = async (event) => {
        event.preventDefault()
        const result = await deleteNoteRequest(noteId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
            return
        }
        setOpenPopUpRemovalWarning(false)
        navigate(ROUTES.NOTELIST)
    }

    const handleAddOwner = async (userId) => {
        const result = await addOwnerRequest(noteId, userId)
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        handleGetNoteOwners()
    }

    const handleDeleteOwner = async (userId) => {
        const result = await deleteOwnerRequest(noteId, userId)
        if (result.status !== 200) {
            //navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        handleGetNoteOwners()
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
                            <Button onClick={() => { navigate(ROUTES.NOTEEDIT.replace(':noteId', noteId)) }}
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
                            {userId === creatorId
                                ?
                                <>
                                    <Button onClick={() => setOpenPopUpRemovalWarning(true)}
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
                                </>
                                :
                                <></>
                            }
                        </div>
                        {userId === creatorId
                            ?
                            <>
                                <div className={styles.column}>
                                    <UserList
                                        owners={owners}
                                        creatorId={creatorId}
                                        handleAddOwner={handleAddOwner}
                                        handleDeleteOwner={handleDeleteOwner} />
                                </div>
                            </>
                            :
                            <></>
                        }
                    </div>
                </section>
                <PopUpRemovalWarning open={openPopUpRemovalWarning}
                    title={'Видалення нотатки'}
                    content={'Ви дійсно бажаєте видалити свою нотатку?'}
                    handleDelete={handleDeleteNote}
                    handleClose={handleClosePopUpRemovalWarning} />
            </main>
        </>
    )
}

export default NoteInfo