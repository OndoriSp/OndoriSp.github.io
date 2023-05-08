import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import passwordResetRequest from "../helpers/passwordResetRequest"
import { ROUTES } from "../../../routes/routes"
function PasswordResetForm() {
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [formChange, setFormChange] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await passwordResetRequest(username, password1, password2)

        if (result.status !== 200) {
            setError(true)
        } else {
            setError(false)
            navigate(ROUTES.LOGIN)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1>Зміна паролю</h1>
                    {error && <h3 className={styles.error}>Неправильно введені дані.</h3>}
                </div>
                {
                    formChange
                        ?
                        <>
                            <Input label={"Пароль"}
                                placeholder={"8+ символів (літери та цифри)"}
                                error={error} isVisible={false}
                                onChange={(event) => setPassword1(event.target.value)} />
                            <Input label={"Повторіть пароль"}
                                placeholder={"8+ символів (літери та цифри)"}
                                error={error} isVisible={false}
                                onChange={(event) => setPassword2(event.target.value)} />
                            <Button onClick={handleSubmit} text={"Змінити пароль"} />
                        </>
                        :
                        <>
                            <Input label={"Ім'я користувача"}
                                placeholder={"Ben001"}
                                error={error}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <Button onClick={() => setFormChange(true)} text={"Продовжити"} />
                        </>
                }
            </div>
        </div>
    )
}

export default PasswordResetForm;
