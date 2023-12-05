import React, { useState, useEffect } from "react";
import './CreateReview.css';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { Button, Typography, Stack, Box } from "@mui/material";
import config from "../../config";
import Rating from '@mui/material/Rating';

interface User {
    user: UserDetails;
}

interface UserDetails {
    _id: string;
    name: string;
}

interface Review {
    rating: number;
    description: string;
}

interface CreateReviewProps {
    brewery_id: string;
    onReviewAdded: (newReview: Review) => void;
}

const CreateReview: React.FC<CreateReviewProps> = ({ brewery_id, onReviewAdded }) => {
    const user = useSelector((state: User) => state?.user._id);
    const [value, setValue] = React.useState<number | null>(0);

    const [text, setText] = useState({
        rating: 0,
        description: "",
        user: user,
        brewery_id: brewery_id
    });

    const handlePostClick = async (e: any) => {
        e.preventDefault();
        text.rating = value as number;
        try {
            const addPost = await fetch(`${config.apiUrl}/brewery/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            });
            const addedReview = await addPost.json();
            if (addedReview.success) {
                setText({
                    rating: 0,
                    description: '',
                    user: user,
                    brewery_id: brewery_id
                });
                setValue(0);
                onReviewAdded({
                    rating: text.rating,
                    description: text.description,
                });
                console.log(addedReview);
            } else {
                console.error('Failed to add post');
            }
        } catch (error) {
            console.error('Error adding review:', error);

        }
    };

    return (
        <>
            <div data-testid='createarea' className="createAreaContainer">
                <form className="createAreaForm" onSubmit={handlePostClick}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6">{"Add your Review"}</Typography>
                        <input
                            className="createAreaInput"
                            onChange={event => {
                                const { name, value } = event.target;
                                setText(() => { return { ...text, [name]: value } })
                            }}
                            name="description"
                            placeholder="Provide description"
                            value={text.description}
                        />
                        <Box display="flex" alignItems="center">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                        <Button variant="contained" endIcon={<SendIcon />} type="submit">
                            Send
                        </Button>
                    </Stack>
                </form>
            </div>
        </>
    );
}

export default CreateReview;