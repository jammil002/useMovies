const containerStyle = {
  display: "flex",
  alignItmes: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

export default function StarRating() {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}> S{i + 1}</span>
        ))}
      </div>
      <p>10</p>
    </div>
  );
}
