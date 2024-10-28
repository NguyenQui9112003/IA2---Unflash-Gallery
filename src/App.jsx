import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Images from './Components/Photo/Image';
import Header from './Components/Header'

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); // State cho số trang hiện tại
  const [loading, setLoading] = useState(false);
  const [endPoint, setEndPoint] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1); // Tăng trang khi người dùng cuộn đến cuối
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=jpnydkS7jjJl3my12UCjLWpkFL5LUgdcXyJqkz-mUPs&page=${page}`
      );
      console.log(response)
      if (response.data.length > 0) {
        setLoading(false);
        const newImages = response.data.map(image => ({
          id: image.id,
          thumbnail: image.urls.small,
          fullImage: image.urls.full,
          author: image.user.name,
          title: image.alt_description,
          description: image.description,
        }));
        // Loại bỏ ảnh trùng lặp dựa trên `id`
        setImages((prevImages) => {
          const uniqueImages = newImages.filter(
            (newImage) => !prevImages.some((image) => image.id === newImage.id)
          );
          return [...prevImages, ...uniqueImages];
        });
      } else {
        setEndPoint(true);
        setLoading(false);
      }

    } catch (error) {
      console.log('Error fetching data: ', error);
      setLoading(true);
    }
  };

  return (
    <>
      <div className="app-container max-w-screen-lg mx-auto">
        <Header />

        <div className="gap-8 columns-1 md:columns-2 lg:columns-3">
          <Images images={images} ></Images>
        </div>

        {loading && <LoadingSpinner />}
        {endPoint && <NoMorePhotos />}

      </div>
    </>
  );
}

const LoadingSpinner = () => (
  <div className="mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
  </div>
);

const NoMorePhotos = () => (
  <div className='text-2xl'>No More Photos To Load !!!</div>
);

export default App;
