import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PhotoDetails() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=jpnydkS7jjJl3my12UCjLWpkFL5LUgdcXyJqkz-mUPs`);
                setPhoto(response.data);
            } catch (error) {
                console.error('Error fetching photo details:', error);
            }
        };

        fetchPhotoDetails();
    }, [id]);

    const handleHomeClick = () => {
        navigate(`/`); // Chuyển hướng đến trang Home
    };

    return (
        <>
            {photo ? (
                <>
                    <div className="flex flex-row mb-3">
                        <div className="basis-2/4 text-left">
                            <p>Author: {photo.user.name}</p>
                            <p>Title: {photo.alt_description}</p>
                            <p>Description: {photo.description ? photo.description : 'No more description'}</p>
                        </div>
                        <div className="basis-1/4"></div>
                        <div className="basis-1/4 text-right">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleHomeClick}>
                                Back
                            </button>
                        </div>
                    </div>
                    <img src={photo.urls.full} alt="Photo Detail" />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
