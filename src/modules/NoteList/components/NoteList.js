import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import styles from '../styles/style.module.scss';
import getNotesRequest from '../helpers/getNotesRequest';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Input from '../../../ui/Input/components/Input';
import TextField from '../../../ui/TextField/components/TextField';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleGetNotes = async () => {
    const result = await getNotesRequest();
    if (result.status !== 200) {
      navigate(ROUTES.LOGIN);
    } else {
      setNotes(result.data);
      notes.forEach((note) => {
        note.tags = note.tags.split(', ');
      });
      console.log(notes);
    }
  };

  useEffect(() => {
    handleGetNotes();
  }, []);

  const [searchTags, setSearchTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      setSearchTags([...searchTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const filteredNotes = notes.filter((note) => {
    return (
      searchTags.every((tag) => note.tags.includes(tag)) &&
      (note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm))
    );
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <>
      <main>
        <section>
          <div className={styles.list}>
            <div className={styles.sortButtons}>
            <Input label={"Назва нотатки"}
                    placeholder={"Назва нотатки..."}
                    onChange={handleSearch}
                />
            </div>
            <div>
              <Autocomplete
                multiple
                freeSolo
                options={searchTags.map((option) => option)}
                value={searchTags}
                onChange={(event, newValue) => {
                  setSearchTags(newValue);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Теги"
                    placeholder="Теги"
                    fullWidth
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddTag();
                      }
                    }}
                  />
                )}
              />
            </div>
            <ul>
              {filteredNotes.map((note) => (
                <li key={note.id}
                onClick={() => navigate(ROUTES.NOTEINFO.replace(':noteId', note.id))}>
                  <div className={styles.hoverInfo}>
                    <h3>Назва: {note.title}</h3>
                    <p>Теги: {note.tags}</p>
                    <p>Вміст: {note.content.length > 30 ? `${note.content.slice(0, 30)}...` : note.content}</p>
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

export default NoteList;
