import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import './Camera.scss';

const Camera = () => {
  const appRef = useRef(null);
  const [size, setSize] = useState({
    width: 640,
    height: 440
  })
  useEffect(() => {
    if (appRef.current) {
      setSize({
        width: appRef.current.scrollWidth || 640,
        height: appRef.current.scrollHeight || 440
      })
    }
  }, [appRef.current])
  return (
    <div className="Camera" ref={appRef}>
      <Webcam
        width={size.width}
        height={size.height}
      />
    </div>
  );
};

export default Camera;
