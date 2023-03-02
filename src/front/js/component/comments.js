import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import "../../styles/comments.css"


export const Comments = () => {
    const { store, actions } = useContext(Context);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const  eventId = useParams();


    const fetchComments = async () => {
        const response = await actions.getComments(eventId.theid);
        console.log(store.comments)
        const data = store.comments;
        console.log("this data", data)
        return data;   
        
    };

    useEffect(() => {
        const loadComments = async () => {
            await fetchComments(eventId)
        };
        loadComments();
    }, []);

    const handleNewComment = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("userId"))
        await actions.postComment(userId.id, newComment, eventId.theid);
        setNewComment('');
        const newComments = await fetchComments();
        setComments(newComments);
    };

    const userInfo = store.user.result
    console.log(userInfo)

    return (
        <div className='comments-div'>
            <p className='comments-title'>Comentarios del evento</p>
            <ul>
                {store.comments.length > 0 ? (
                    store.comments.map((comment) => (
                        <li key={comment?.id} className="comment-li">
                            <p><strong>{userInfo?.name} :</strong> {comment?.content}</p>
                        </li>
                    ))
                ) : (
                    <p>No hay comentarios aún.</p>
                )}
            </ul>
            <form className='comment-form' onSubmit={handleNewComment}>
                <textarea className='content-form' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button className='btn submit-btn' type="submit">Enviar</button>
            </form>
        </div>)

}

