import styles from "../styles/style.module.scss"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import registerRequest from "../helpers/registerRequest"
import { ROUTES } from "../../../routes/routes"

function RegisterForm() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()

        const result = await registerRequest(email, username, password1, password2, firstName, lastName)

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
                    <h1>Реєстрація</h1>
                    {error && <h3 className={styles.error}>Неправильно введені дані.</h3>}
                </div>
                <div className={styles.two_col_container}>
                    <Input label={"Ім'я"}
                        placeholder={"Ben"}
                        error={error}
                        onChange={(event) => setFirstName(event.target.value)} />

                    <Input label={"Прізвище"}
                        placeholder={"Collins"}
                        error={error}
                        onChange={(event) => setLastName(event.target.value)} />
                </div>
                <Input label={"Електронна пошта"}
                    placeholder={"Email@gmail.com"}
                    error={error}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input label={"Ім'я користувача"}
                    placeholder={"Ben001"}
                    error={error}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input label={"Пароль"}
                    placeholder={"8+ символів (літери та цифри)"}
                    isVisible={false}
                    error={error}
                    onChange={(event) => setPassword1(event.target.value)}
                />
                <Input label={"Повторіть пароль"}
                    placeholder={"8+ символів (літери та цифри)"}
                    isVisible={false}
                    error={error}
                    onChange={(event) => setPassword2(event.target.value)}
                />

                <Button onClick={handleRegister} text={"Створити користувача"} />
            </div>
        </div>
    )
}

export default RegisterForm;
