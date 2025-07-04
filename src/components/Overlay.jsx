import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  const navigate = useNavigate();

  useEffect(() => {
    if (end) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [end, navigate]);

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
      ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />

      {play && (
        <div className="skip-btn-Container">
          <button className="skip-btn" onClick={() => navigate("/dashboard")}>Skip</button>
        </div>
      )}

      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">Hire Genius</h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <p className="slogan">Genius Hires Start Here.</p>

          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Start Now
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Wish you had a great journey with us.</p>
      </div>
    </div>
  );
};