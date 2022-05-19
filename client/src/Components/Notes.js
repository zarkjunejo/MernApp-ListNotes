import React, { useContext, useEffect, useState, useRef } from 'react'

import NoteContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';

import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const navigate = useNavigate()

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;


    useEffect(() => {
        if (localStorage.getItem('auth-token')) {

            getNotes()
        } else {

            navigate('/login')
        }
        // eslint-disable-next-line
        // eslint-disable-next-line     
    }, [])
    const ref = useRef(null)

    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)


        refClose.current.click()

        props.showAlert("Updated Successfully", "success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    // console.log(notes);
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group my-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" placeholder="Enter Title" minLength={5} required onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" required minLength={5} onChange={onChange} placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} required minLength={5} placeholder="Description" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>


                <h2>Your Notes</h2>
                <div className='container mx-2'>
                    {notes.length === 0 && 'no notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })
                }
            </div>
        </>
    )
}

export default Notes
