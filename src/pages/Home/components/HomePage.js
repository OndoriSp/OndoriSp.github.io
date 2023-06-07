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
                        <p>Запиши, збережи, поділись</p>
                        <Button onClick={() => (userId ? navigate(ROUTES.NOTEADD) : navigate(ROUTES.LOGIN))} text={"Зробити нотатку"}/>
                    </div>
                </section>
                <section>
                    <div className={styles.textblock}>
                        <p>Сервіс нотаток - ваш простір для швидкого і зручного зберігання думок, 
                            ідей і важливих моментів. Запишіть все, що вам потрібно, в межах 404 
                            символів і додайте теги для легкого пошуку. Ви можете переглядати, 
                            редагувати та видаляти нотатки, а також надавати обмежений доступ 
                            іншим користувачам.
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default HomePage
