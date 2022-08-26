import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useRef, useState } from 'react'
import { db, storage } from '../firebase'
import { collection, serverTimestamp, addDoc, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage'

function InputBox() {
    const {data: session} = useSession()
    const inputRef = useRef(null)
    const filepickerRef = useRef(null)

    const [imageToPost, setimageToPost] = useState(null )
    const [imageToUpload, setimageToUpload] = useState(null )

    const addImageToPost = (e) => {
        setimageToUpload(e.target.files[0])
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setimageToPost(readerEvent.target.result)
        }
    }

    const removeImage = () => {
        setimageToPost(null)
    }

    const sendPost = (e) => {
        e.preventDefault();

        if(!inputRef.current.value) return;
        const addRef = collection(db, 'posts')
        addDoc(addRef, {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: serverTimestamp()
        }).then(res => {
            if(imageToPost) {
                // const storageRef = ref(storage, `posts/${res.id}`)
                // const uploadTask = uploadString(storageRef, imageToPost, 'data_url')
                const storageRef = ref(storage, `posts/${res.id}`);
                const uploadTask = uploadBytesResumable(storageRef, imageToUpload);

                removeImage()

                uploadTask.on('state_change', null, err => console.log(err), () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const docRef = doc(addRef, res.id)
                        setDoc(docRef, {
                            postImage: downloadURL
                        }, {merge: true})
                    });
                })  
            }
        })

        inputRef.current.value = "";
    }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
        <div className='flex space-x-4 p-4 items-center'>
            <Image className='rounded-full' src={session.user.image} width="40" height="40" layout='fixed'/>
            <form className='flex flex-1'>
                <input ref={inputRef} className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' type="text" placeholder={`What's on your mind, ${session.user.name}`} />
                <button type='submit' hidden onClick={sendPost}>Submit</button>
                {imageToPost && (
                    <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                        <img className='h-10 object-contain' src={imageToPost} />
                        <p className='text-xs text-red-500 text-center'>Remove</p>
                    </div>
                )}
            </form>
        </div>
        <div className='flex justify-evenly p-3 border-t'>
            <div className='inputIcon'>
                <VideoCameraIcon className='h-7 text-red-500' />
                <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
            </div> 
            <div className='inputIcon' onClick={() => filepickerRef.current.click()}>
                <CameraIcon className='h-7 text-green-400' />
                <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                <input ref={filepickerRef} onChange={addImageToPost} type={'file'} hidden />
            </div> 
            <div className='inputIcon'>
                <EmojiHappyIcon className='h-7 text-yellow-300' />
                <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
            </div> 
        </div>
    </div>
  )
}

export default InputBox