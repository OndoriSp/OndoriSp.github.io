import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import { ReactSVG } from 'react-svg'
import styles from '../styles/style.module.scss'
import { Button } from '@mui/material'
import getUserRequest from '../helpers/getUserRequest'
import deleteUserRequest from '../helpers/deleteUserRequest'

function ProfileInfo() {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [notesCount, setNotesCount] = useState('')
    const navigate = useNavigate()

    const handleGetUser = async () => {
        const result = await getUserRequest()
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setUsername(result.data.user.username)
        setFirstName(result.data.user.first_name)
        setLastName(result.data.user.last_name)
        setNotesCount(result.data.user.notes_count)
    }

    const handleDeleteUser = async (event) => {
        event.preventDefault()
        await deleteUserRequest()
        navigate(ROUTES.HOME)
    }

    useEffect(() => {
        handleGetUser()
    })

    return (
        <>
            <main>
                <section className={styles.textblock}>
                    <div className={styles.row} id="user-info">
                        <div className={styles.column}>
                            <ReactSVG className={styles.profilePic} src={process.env.PUBLIC_URL + "/icons/user.svg"} />
                            <Button onClick={() => {navigate(ROUTES.PROFILEUPD)}}
                                sx={{
                                    width: '250px',
                                    marginTop: '2rem',
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
                                Оновити дані
                            </Button>
                            <Button onClick={handleDeleteUser}
                                sx={{
                                    width: '250px',
                                    marginTop: '0.5rem',
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
                                Видалити користувача
                            </Button>
                        </div>
                        <div className={styles.column}>
                            <h2>{username}</h2>
                            <p>{firstName + " " + lastName}</p>
                            <h3>Кількість нотаток</h3>
                            <p>{notesCount}</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProfileInfo