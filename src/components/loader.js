export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{text}</p>
    </div>
  );
}