import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 600px;
    width: 90%;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const BlogDetails = ({ openModal, setOpenModal }) => {
    const { state, blog } = openModal;

    if (!state || !blog) return null; // Ensure modal isn't open without data

    return (
        <>
            <ModalOverlay onClick={() => setOpenModal({ state: false, blog: null })} />
            <Modal>
                <h2>{blog.title}</h2>
                {/* Render blog content dynamically */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                <small>
                    By {blog.author} on {new Date(blog.date).toLocaleDateString()}
                </small>
                <button onClick={() => setOpenModal({ state: false, blog: null })}>
                    Close
                </button>
            </Modal>
        </>
    );
};

export default BlogDetails;