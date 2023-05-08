import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import loginRequest from "../helpers/loginRequest"
import { ROUTES } from "../../../routes/routes"
function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        const result = await loginRequest(username, password)

        if (result.status !== 200) {
            setError(true)
        } else {
            setError(false)
            navigate(ROUTES.HOME)
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault()
        navigate(ROUTES.PASSWORDRESET)
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div>
                    <h1>Логін</h1>
                    {error && <h3 className={styles.error}>Неправильно введена пошта або пароль.</h3>}
                </div>

                <Input label={"Ім'я користувача"}
                    placeholder={"Ben001"}
                    error={error}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input label={"Пароль"}
                    placeholder={"8+ символів (літери та цифри)"}
                    error={error} isVisible={false}
                    onClick={handleResetPassword}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Button onClick={handleLogin} text={"Логін"} />
            </div>
        </div>
    )
}

export default LoginForm;
