// src/components/AudioRecorder.jsx
import React, { useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AudioRecorder = ({ onSendAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleMicClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log("Audio recorded:", audioUrl);
          if (onSendAudio) {
            onSendAudio(audioUrl); // Pass to App
          }
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
      } catch (error) {
        console.error('Microphone access error:', error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={handleMicClick}
      style={{ fontSize: '1.5rem', border: 'none', background: 'transparent', marginRight: '0.5rem' }}
      title={isRecording ? 'Stop Recording' : 'Start Recording'}
    >
      <i className={`bi ${isRecording ? 'bi-mic-fill' : 'bi-mic'}`} style={{ color: isRecording ? 'red' : 'black' }}></i>
    </button>
  );
};

export default AudioRecorder;
