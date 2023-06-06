import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../../routes/routes';
import { ReactSVG } from 'react-svg';
import styles from '../styles/style.module.scss';
import getUsersRequest from '../helpers/getUsersRequest';
import Button from '../../../../../ui/Button';

function UserList({ creatorId, owners, handleAddOwner, handleDeleteOwner }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOwners, setFilterOwners] = useState(true)
  const navigate = useNavigate();

  const handleGetUsers = async () => {
    const result = await getUsersRequest();
    if (result.status !== 200) {
      navigate(ROUTES.LOGIN);
    } else {
      setUsers(result.data);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchTerm) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm)) &&
      user.id !== creatorId
  );

  const filteredUsersWithOwners = filterOwners
    ? filteredUsers.filter((user) => owners.some((owner) => owner.user_id === user.id))
    : filteredUsers.filter((user) => !owners.some((owner) => owner.user_id === user.id));

    useEffect(() => {
      console.log(owners)
      handleGetUsers();
    }, []);
  
  return (
    <>
      <div className={styles.searchContainer}>
        <input type="search" placeholder="Ім'я користувача..." onChange={handleSearch} />
      </div>
      <div className={styles.searchContainer}>
        <Button
          text={'Мають доступ'}
          isOutlined={!filterOwners}
          onClick={() => setFilterOwners(true)}
        />
        <Button
          text={'Не мають доступ'}
          isOutlined={filterOwners}
          onClick={() => setFilterOwners(false)}
        />
      </div>
      <div className={styles.list}>
        <ul>
          {filteredUsersWithOwners.map((user) => (
            <li key={user.username}>
              <div className={styles.userAvatar}>
                <ReactSVG src={process.env.PUBLIC_URL + '/icons/user.svg'} />
              </div>
              <div className={styles.hoverInfo}>
                <h3>{user.username}</h3>
                <p>{`${user.first_name} ${user.last_name}`}</p>
                <Button 
                  text={owners.some((owner) => owner.user_id === user.id) ? "Забрати доступ" : "Дати доступ"}
                  isOutlined={owners.some((owner) => owner.user_id === user.id)}
                  onClick={() => owners.some((owner) => owner.user_id === user.id) ? handleDeleteOwner(user.id) : handleAddOwner(user.id)}
                  />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserList;
