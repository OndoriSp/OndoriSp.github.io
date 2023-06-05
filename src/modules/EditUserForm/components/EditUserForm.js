import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import passwordResetRequest from "../../PasswordResetForm/helpers/passwordResetRequest"
import getUserRequest from "../../ProfileInfo/helpers/getUserRequest"
import { ROUTES } from "../../../routes/routes"

function EditUserForm() {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleEdit = async (event) => {
        event.preventDefault()
        const result = await passwordResetRequest(username, password1, password2)

        if (result.status !== 200) {
            setError(true)
        } else {
            setError(false)
            navigate(ROUTES.PROFILE)
        }
    }

    const handleGetUser = async () => {
        const result = await getUserRequest()
        if (result.status !== 200) {
            navigate(ROUTES.LOGIN)
        }
        console.log(result.data)
        setUsername(result.data.user.username)
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1>Зміна паролю</h1>
                    {error && <h3 className={styles.error}>Неправильно введені дані.</h3>}
                </div>
                <Input label={"Новий пароль"}
                                placeholder={"8+ символів (літери та цифри)"}
                                error={error} isVisible={false}
                                onChange={(event) => setPassword1(event.target.value)} />
                            <Input label={"Повторіть пароль"}
                                placeholder={"8+ символів (літери та цифри)"}
                                error={error} isVisible={false}
                                onChange={(event) => setPassword2(event.target.value)} />
                            <Button onClick={handleEdit} text={"Змінити пароль"} />
            </div>
        </div>
    )
}

export default EditUserForm;
