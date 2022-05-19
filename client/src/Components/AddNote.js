import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag,);
        setNote({ title: "", description: "", tag: "" });

        props.showAlert("Added Successfully", "success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-10'>
            <h2>
                Add a Note
            </h2>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Enter Title" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} required minLength={5} name="description" onChange={onChange} placeholder="Description" />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} required minLength={5} onChange={onChange} placeholder="tag" />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" required minLength={5} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
