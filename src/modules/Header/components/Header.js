import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import { ReactSVG } from 'react-svg'
import styles from '../styles/style.module.scss'
import Button from '../../../ui/Button'

function Header() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("Authorization")

    const handleLogout = async (event) => {
        event.preventDefault()
        sessionStorage.removeItem("Authorization")
        sessionStorage.removeItem("userId")
        navigate(ROUTES.HOME)
    }
    return (
        <>
            <header>
                <div>
                    <ReactSVG 
                    onClick={() => navigate(ROUTES.HOME)}
                    className={styles.logo} 
                    src={process.env.PUBLIC_URL + "/icons/logo.svg"} />
                </div>
                <nav>
                    {
                        token
                            ?
                            <div className={styles.loggedMenu}>
                                <Button isOutlined={false} text={"Додати нотатку"} onClick={() => navigate(ROUTES.NOTEADD)} />
                                <div className={styles.profile}>
                                    <ReactSVG className={styles.avatar} src={process.env.PUBLIC_URL + "/icons/user.svg"} />
                                    <div className={styles.menu}>
                                        <ul>
                                            <li onClick={() => navigate(ROUTES.NOTELIST)}>Мої нотатки</li>
                                            <li onClick={() => navigate(ROUTES.PROFILE)}>Мій профіль</li>
                                            <li onClick={handleLogout}>Вийти</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={styles.auth}>
                                <Button isOutlined={false} text={"Вхід"} onClick={() => navigate(ROUTES.LOGIN)} />
                                <Button isOutlined={true} text={"Реєстрація"} onClick={() => navigate(ROUTES.REGISTER)} />
                            </div>
                    }
                </nav>
            </header>
        </>
    )
}

export default Header