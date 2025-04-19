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
					imageCapture.grabFrame().then((imageBitmap) => {
						// Create a canvas to extract image data from the ImageBitmap
						const canvas = document.createElement('canvas');
						canvas.width = imageBitmap.width;
						canvas.height = imageBitmap.height;

						// Draw the ImageBitmap on the canvas
						const ctx = canvas.getContext('2d');
						if (!ctx) {
							console.error("Failed to get canvas context");
							return;
						}
						ctx.drawImage(imageBitmap, 0, 0);

						// Convert canvas to a base64 string (remove the "data:image/png;base64," prefix if needed)
						const base64Image = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];

						// Send the base64-encoded image to the server
						socketRef.current.emit("sendVideoFrame", base64Image);
						console.log("Frame sent to server", base64Image);
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
