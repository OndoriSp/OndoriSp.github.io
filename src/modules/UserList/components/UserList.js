import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { ReactSVG } from 'react-svg';
import styles from '../styles/style.module.scss';
import getUsersRequest from '../helpers/getUsersRequest';

function ProfileInfo() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleGetUsers = async () => {
    const result = await getUsersRequest();
    if (result.status !== 200) {
      navigate(ROUTES.LOGIN);
    } else {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    handleGetUsers();
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <main>
        <section>
          <div className={styles.list}>
            <div className={styles.sortButtons}>
              <input type="search" placeholder="Ім'я користувача..." onChange={handleSearch} />
            </div>
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.username}>
                  <div className={styles.userAvatar}>
                    <ReactSVG src={process.env.PUBLIC_URL + '/icons/user.svg'} />
                  </div>
                  <div className={styles.hoverInfo}>
                    <h3>{user.username}</h3>
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                    <p>{`Кількість нотаток: ${user.notes_count}`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfileInfo;
