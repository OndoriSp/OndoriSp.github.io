import Button from "../../../ui/Button"
import PopUpRemovalWarningStyles from '../styles/PopUpRemovalWarningStyles'
import styles from "../styles/style.module.scss"

function PopUpRemovalWarning({ open, title, content, handleDelete, handleClose }) {
    return (
        <div>
            <PopUpRemovalWarningStyles
                open={open}
                onClose={handleClose}>
                <div className={styles.container}>
                    <img src={process.env.PUBLIC_URL + '/icons/PopUpRemovalWarningTrashBin.svg'} alt="TrashBin" />
                    <h3>{title}</h3>
                    <span>
                        {content}
                    </span>
                </div>
                <hr></hr>
                <div className={styles.buttonContainer}>
                    <Button onClick={handleClose} isOutlined={true} text={'Відмінити'}></Button>
                    <Button onClick={handleDelete} text={'Видалити'}></Button>
                </div>
            </PopUpRemovalWarningStyles>
        </div>
    )
}

export default PopUpRemovalWarning;
