import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="">
      <main className="p-4 bg-[#333] h-screen w-full ">
        <article className="flex flex-col items-center justify-center h-full px-2">
          <h1 className="text-[#3FA3FF] text-5xl uppercase font-monoton py-4 mb-8">
            tasque <span className="text-white">app</span>
          </h1>
          <p className="text-white text-3xl font-geist-sans max-w-2xl text-center py-4 px-8 my-4">
            Lorem ipsum <br /> dolor sit amet consectetur adipisicing elit.
            Vero, eaque!
          </p>

          <Button variant="default" className="mt-8 w-full bg-white p-4 h-16">
            <Link
              href="/register/signup"
              className="text-[#3FA3FF] text-[1.2rem]"
            >
              Get Started
            </Link>
          </Button>
        </article>
      </main>
      <footer>
        <div className="text-center p-4 ">
          <div className="flex flex-col items-center justify-center max-w-[70%] mx-auto">
            <h3 className="text-[#3FA3FF] font-bold text-2xl uppercase py-4">
              About
            </h3>

            <p className="text-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum at
              possimus magni ullam accusantium, nemo unde soluta laborum quos
              nisi quas ipsa, neque, voluptate voluptas perferendis adipisci
              perspiciatis vel accusamus.
            </p>
            <hr className=" my-8 w-[75%] h-[3px] bg-[#000]" />
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Tasque App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
