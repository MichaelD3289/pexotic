import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {getProfileImg} from '../redux/reducers/currentUser'

function useUploadImage(endpoint) {
  const dispatch = useDispatch()
  const [isUploading, setIsUploading] = useState(false)
  const [imageFile, setImageFile] = useState({
    file: null,
    preview: '',
    isSubmitted: true
  })
  
  async function postImage({file, id=''}) {
    const formData = new FormData()
    formData.append('image', file)
    setIsUploading(true)
    const {data} = await axios.post(`/api/image/${endpoint}/s3/bucket${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setIsUploading(false)
    return data
  }

  const submit = async (event, id) => {
    event?.preventDefault()
    const result = await postImage({file: imageFile.file, id})
    setImageFile({
      file: null,
      preview: result.image,
      isSubmitted: true
    })
    return result
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setImageFile({
      file,
      preview: URL.createObjectURL(file),
      isSubmitted: false
    })
  }

  return {isUploading, imageFile, fileSelected, submit, getProfileImg, dispatch}
}

export default useUploadImage