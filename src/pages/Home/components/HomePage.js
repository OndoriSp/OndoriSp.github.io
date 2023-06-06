import React from "react"
import Header from "../../../modules/Header/components/Header"
import styles from "../styles/style.module.scss"
import Button from "../../../ui/Button"
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'

function HomePage() {
    const navigate = useNavigate()
    const userId = parseInt(sessionStorage.getItem('userId'))
    return (
        <>
            <Header />
            <main>
                <section className={styles.banner}>
                    <div className={styles.bannerImage}></div>
                    <div className={styles.bannerText}>
                        <h1>Сервіс коротких нотаток</h1>
                        <p>Варіант 2</p>
                        <Button onClick={() => (userId ? navigate(ROUTES.NOTEADD) : navigate(ROUTES.LOGIN))} text={"Зробити нотатку"}/>
                    </div>
                </section>
                <section>
                    <div className={styles.textblock}>
                        <p>Варіант 2. Створити сервіс коротких (404 символи) заміток (із тегами) для кожного
                            користувача із можливістю перегляду, редагування і видалення, а також надавати
                            доступ редагувати замітку іншими користувачами (до 5 користувачів). Також надати
                            можливість бачити статистику користувача, скільки повідомлень, коли редаговані і
                            ким.
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomePage
