import React from 'react'

const DirectorForm = ({name, setName, image, setImage, designation, setDesignation, about, setAbout, onSubmit}) => {
  return (
    <form className='form-control space-y-5'>
        <input type="text" placeholder='Director Name' value={name} onChange={(e) => setName(e.target.value)} className='input'/>
        <input type="text" placeholder='Designation' value={designation} onChange={(e) => setDesignation(e.target.value)} className='input' />
        <textarea type="text" placeholder='About' value={about} onChange={(e) => setAbout(e.target.value)} className="textarea" />
        <input type="file" accept="image/*" className="file-input" onChange={(e) => setImage(e.target.files[0])} />
        {image? (
            <div>
                <img src={URL.createObjectURL(image)} alt="preview" style={{ width: '100px' }} />
            </div>
        ) : (
            <></>
        )
        }
        <button type='submit' className='btn w-32' onClick={onSubmit}>Submit</button>
    </form>
  )
}

export default DirectorForm
