import React, { useEffect, useRef } from 'react'

const Player = () => {
    const audioRef = useRef(null)
    const playAudio = () => {
        if (audioRef.current) {
            setInterval(() => {
                audioRef.current.play()
            }, 1000)

        }
    }
    useEffect(() => {
       
    }, []);

    return (
        <>
            <audio src="./img/tet_binh_an.mp3" ref={audioRef} controls></audio>
            {/* <button onClick={playAudio}>Play</button> */}
        </>

    )
}

export default Player