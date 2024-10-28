import { useLocation, useNavigate } from 'react-router-dom';

export default function PhotoDetails() {
    const location = useLocation();
    const { image } = location.state;
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

    const handleHomeClick = () => {
        navigate(`/`); // Chuyển hướng đến trang Home
    };

    return (
        <>
            <div className="flex flex-row mb-3">
                <div className="basis-2/4 text-left">
                    <p>Author: {image.author}</p>
                    <p>Title: {image.title}</p>
                    <p>Description: {image.description ? image.description : 'No more description'}</p>
                </div>
                <div className="basis-1/4"></div>
                <div className="basis-1/4 text-right">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleHomeClick(image)}>
                        Back
                    </button>
                </div>
            </div>
            <img src={image.fullImage}  ></img>
        </>
    );
}
