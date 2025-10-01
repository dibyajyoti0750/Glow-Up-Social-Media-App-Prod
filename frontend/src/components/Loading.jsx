export default function Loading({
  height = "100vh",
  text = "Almost there...",
}) {
  return (
    <div
      style={{ height }}
      className="flex flex-col gap-4 items-center justify-center h-screen"
    >
      <div className="w-20 h-20 rounded-full border-6 border-gray-200 border-t-blue-400 animate-spin"></div>
      <p className="font-medium">{text}</p>
    </div>
  );
}
