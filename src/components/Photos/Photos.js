import React, {useEffect, useState} from 'react'
import AlbumService from "../../services/AlbumService";
function Photos(props) {
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        AlbumService.getPhotoUrl(props.match.params.id).then((res) => {
            setPhotos(res.data)
        })
    }, [props.match.params.id])
  return (
    <div className = "albums-photos">
    {photos.map((photo) => (
        <img data-testid={`photo-item-${photo.id}`} alt= "album-photos" width="300px" height = "300px" src={photo.url}></img>
    ))}
    </div>
  )
}

export default Photos