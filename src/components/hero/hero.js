import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="flex lg:pt-10 flex-row items-center overflow-y-auto h-[calc(100vh-100px)] lg:h-[calc(100vh-200px)]">
      <div className="grid lg:grid-cols-5 gap-4 items-center">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <h1 className="text-[38px] lg:text-[56px] font-extrabold leading-tight">
            Create Documents like a Ninja!
          </h1>
          <p className="text-[18px] lg:text-[22px] font-extralight lg:font-light mb-10">
            Upload your template, add your variables, and generate your
            documents, all in <strong>60 Seconds or Less!!</strong>
          </p>
          <Link
            href="/register"
            className="transform bg-yellow-400 px-12 py-3 rounded-lg font-bold hover:scale-110 duration-200 hover:bg-yellow-500"
          >
            Try for Free
          </Link>
        </div>
        <div className="lg:col-span-3 order-1 lg:order-2">
          <Image src="/assets/hero1.jpg" alt="Hero" width={2200} height={400} />
        </div>
      </div>
    </section>
  );
};
