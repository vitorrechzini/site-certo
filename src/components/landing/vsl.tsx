

export default function Vsl() {
  return (
    <section className="w-full bg-black flex justify-center items-center">
      <div className="w-full aspect-video relative max-h-[70vh]">
        <video
          src="https://priveflixoficial.com/wp-content/uploads/2025/03/pvvideos.webm"
          autoPlay
          loop
          muted
          playsInline
          controlsList="nodownload"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
