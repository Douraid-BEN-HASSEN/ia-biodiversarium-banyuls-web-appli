import {useState, useEffect} from "react";
import axios from 'axios';

const fileToDataUri = (file: any) => new Promise((resolve, reject) => {
  if(!file)
    return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    resolve(e.target.result)
  };
  reader.readAsDataURL(file);
})

const FileUploader = () => {
  const [file, setFile] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [dataUri, setDataUri] = useState<any>('')

  useEffect(() => {
      if (!file) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
        setFile(undefined)
        setDataUri('');
        return
    }

    setFile(e.target.files[0])

    fileToDataUri(file)
    .then((dataUri: any) => {
      setDataUri(dataUri);
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.clear();

    const url = 'https://thumbsnap.com/api/upload';

    const formData = new FormData();
    formData.append('key', '00002433b2a713cd0023210fb3e3ca76');
    formData.append('media', file, file.name);

    const config = {     
      headers: { 'Content-Type': 'multipart/form-data' }
    }

		axios.post(url, formData, config)
    .then(response => {
        console.log('Result:', response);
    })
    .catch(error => {
        console.log('Error:', error);
    });
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        {file &&  <img src={preview} /> }
    </div>
  );
}

export default FileUploader