import { useNavigate } from 'react-router-dom';

export const IndividualImage = ({ image }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {// Gọi hàm onImageClick
        navigate(`/img-detail`, { state: { image } }); // Điều hướng đến "img-detail"
    };

    return (
        <div>
            <img className="mb-3"
                src={image.thumbnail}
                alt="unsplash images"
                title={image.title}
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }} />
        </div>
    );
}

