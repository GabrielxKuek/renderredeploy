import React, { useState, useEffect } from 'react';
import NavBarReyes from '../components/auditNavBar';
import NavBarGroup1 from "./Navbar.jsx";

const logsSomething = () => {
    const [audio] = useState(new Audio('assets/gamer_song.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        audio.play();
        setIsPlaying(true);
    };

    useEffect(() => {
        // Optional: Clean up the audio when the component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);

    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className={`flex flex-col justify-center items-center h-screen ${isPlaying ? 'strobe' : 'bg-gray-800'}`}>
                {!isPlaying && (
                    <button onClick={handlePlay}>
                        <h1 className="text-6xl font-extrabold text-white mb-4">
                            logs<span className="text-red-600">Something</span>
                        </h1>

                        <p className="text-lg text-gray-300 text-center">
                            don't really know what to put here tbh<br />
                            probably like work on implementing the dashboard? <br />
                            idk i think we only really need one page, but we havent discussed front end yet
                        </p>
                    </button>
                )}

                {isPlaying && (
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="bounce-text text-4xl font-bold">
                            Herobrain is Coming
                        </div>
                        <div className="flex justify-between items-center space-x-96">
                            <img src="assets/herobrain.jpg" alt="herobrain" />
                            <img src="assets/Untitled.jpg" alt="herobrine" className="scale-image" />
                            <img src="assets/herobrian.jpg" alt="herobrain" />
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes strobe {
                    0% { background-color: #ff0000; }
                    33% { background-color: #00ff00; }
                    66% { background-color: #0000ff; }
                    100% { background-color: #ff0000; }
                }

                .strobe {
                    animation: strobe 1s infinite;
                }

                .strobe-text {
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    font-weight: bold;
                }

                @keyframes bounce {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(80vw, 20vh); }
                    50% { transform: translate(-80vw, 40vh); }
                    75% { transform: translate(40vw, -20vh); }
                }

                .bounce-text {
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    font-weight: bold;
                    animation: bounce 3s infinite;
                    position: absolute;
                }

                @keyframes scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                }

                .scale-image {
                    animation: scale 2s infinite;
                }
            `}</style>
        </>
    );
}

export default logsSomething;