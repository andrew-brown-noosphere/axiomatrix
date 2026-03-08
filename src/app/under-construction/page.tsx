import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
        🚧 Under Construction 🚧
      </h1>

      <Image
        src="/img/under-construction.gif"
        alt="Under Construction"
        width={300}
        height={200}
        unoptimized
        className="my-8"
      />

      <p className="text-xl text-cyan-300 mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
        We&apos;re working hard to bring you something amazing!
      </p>

      <p className="text-lg text-white mb-8">
        Check back soon...
      </p>

      <div className="text-6xl animate-bounce">
        👷‍♂️
      </div>

      <p className="text-sm text-gray-500 mt-12">
        Best viewed in Netscape Navigator 4.0
      </p>
    </div>
  );
}
