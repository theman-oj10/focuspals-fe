"use client";
import React from "react";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

declare class ImageCapture {
	constructor(videoTrack: MediaStreamTrack);
	grabFrame(): Promise<ImageBitmap>;
	takePhoto(): Promise<Blob>;
}

const VideoStream = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const socketRef = useRef<any>(null);

	useEffect(() => {
		// Create WebSocket connection
		socketRef.current = io("http://localhost:4000"); // Backend WebSocket server URL

		// Request access to the webcam
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}

				// Capture video frames and send them to the server
				const videoTrack = stream.getVideoTracks()[0];
				const imageCapture = new ImageCapture(videoTrack);

				const captureFrame = () => {
					imageCapture.grabFrame().then((imageBitmap: any) => {
						// Send video frame as Blob to backend via WebSocket
						socketRef.current.emit("sendVideoFrame", imageBitmap);
					});
				};

				// Capture and send video frames every 100ms
				const frameInterval = setInterval(captureFrame, 100);

				return () => {
					clearInterval(frameInterval);
					videoTrack.stop();
				};
			})
			.catch((error) => {
				console.error("Error accessing webcam:", error);
			});
	}, []);

	return (
		<div>
			<video ref={videoRef} autoPlay muted></video>
		</div>
	);
};

export default VideoStream;
