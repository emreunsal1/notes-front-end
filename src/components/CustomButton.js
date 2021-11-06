export default function CustomButton({ text, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
