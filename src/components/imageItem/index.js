import './index.css'

const ImageItem = props => {
  const {image, imageSelected} = props
  const {id, thumbnailUrl} = image
  const onClickImage = () => {
    imageSelected(id)
  }

  return (
    <li className="image-item">
      <button type="button" className="image-button" onClick={onClickImage}>
        <img src={thumbnailUrl} alt="thumbnail" className="image" />
      </button>
    </li>
  )
}
export default ImageItem
