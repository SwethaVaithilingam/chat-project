// import React, { useState, useRef } from 'react';
// import './VoiceRecorder.css';

// export default function VoiceRecorder({ onSendAudio }) {
//   const [recording, setRecording] = useState(false);
//   const [locked, setLocked] = useState(false);
//   const [startY, setStartY] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
//         const audioURL = URL.createObjectURL(blob);
//         onSendAudio(audioURL); // Send blob URL to parent
//         chunksRef.current = [];
//       };

//       mediaRecorderRef.current.start();
//       console.log('🎙️ Started recording');
//     } catch (err) {
//       console.error('Microphone access denied or error:', err);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
//     setRecording(false);
//     setLocked(false);
//     setStartY(null);
//   };

//   const handleMouseDown = (e) => {
//     setStartY(e.clientY || e.touches?.[0]?.clientY);
//     setRecording(true);
//     startRecording();
//   };

//   const handleMouseMove = (e) => {
//     if (!recording || locked) return;
//     const currentY = e.clientY || e.touches?.[0]?.clientY;
//     if (startY && startY - currentY > 50) {
//       setLocked(true);
//       console.log('🔒 Mic locked');
//     }
//   };

//   const handleMouseUp = () => {
//     if (!recording) return;
//     if (!locked) {
//       stopRecording(); // auto-send
//     } else {
//       console.log('🔒 Locked: will stop manually');
//     }
//   };

//   return (
//     <div
//       className="voice-recorder"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onTouchStart={handleMouseDown}
//       onTouchMove={handleMouseMove}
//       onTouchEnd={handleMouseUp}
//     >
//       <i className={`bi bi-mic-fill ${recording ? 'text-danger' : ''}`}></i>
//       {recording && !locked && <div className="swipe-hint">⬆ Swipe to lock</div>}
//       {locked && <div className="locked-hint">🔒 Locked</div>}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import './VoiceRecorder.css';

export default function VoiceRecorder({ onSendAudio }) {
  const [recording, setRecording] = useState(false);
  const [locked, setLocked] = useState(false);
  const [startY, setStartY] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(blob);
        onSendAudio(audioURL);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Microphone error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach(track => track.stop());
    setRecording(false);
    setLocked(false);
    setStartY(null);
  };

  const handleMouseDown = (e) => {
    setStartY(e.clientY || e.touches?.[0]?.clientY);
    startRecording();
  };

  const handleMouseMove = (e) => {
    if (!recording || locked) return;
    const currentY = e.clientY || e.touches?.[0]?.clientY;
    if (startY && startY - currentY > 50) {
      setLocked(true);
    }
  };

  const handleMouseUp = () => {
    if (recording && !locked) {
      stopRecording();
    }
  };

  const handleMicClick = () => {
    if (locked) {
      stopRecording();
    }
  };

  return (
    <div
      className="voice-recorder position-relative me-2"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onClick={handleMicClick}
      style={{ cursor: 'pointer' }}
    >
      {recording && (
        <div className="dot-animation"></div>
      )}
      <i className={`bi bi-mic-fill fs-4 ${recording ? 'text-danger' : ''}`}></i>
    </div>
  );
}
