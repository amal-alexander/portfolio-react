import React, { useState } from 'react';
import styled from 'styled-components';
import { createPost } from '../../api';

const Container = styled.div`
    padding: 60px 0;
    max-width: 1100px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 40px;
    color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.text_primary};
    background-color: transparent;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.text_primary};
    background-color: transparent;
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    min-height: 200px;
    resize: vertical;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.primary};
    }
`;

const Button = styled.button`
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => theme.primary + 99};
    }
`;

const AddPost = ({ onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, content, author };

        try {
            const addedPost = await createPost(newPost);
            onPostAdded(addedPost);
            setTitle('');
            setContent('');
            setAuthor('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Title>Add New Blog Post</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextArea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <Button type="submit">Publish Post</Button>
            </Form>
        </Container>
    );
};

export default AddPost;