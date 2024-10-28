import { IndividualImage } from './IndividualImage'

export const Images = ({ images }) => {
    return images.map((image) => (
        <IndividualImage key={image.id} image={image}></IndividualImage>
    ))
}

export default Images;