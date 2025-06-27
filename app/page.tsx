import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left space-y-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Because Done Feels Good.
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Turn everyday chaos into calm. With clean lists, smart reminders, and
          zero clutter, our to-do app helps you stay focused, stress-free, and
          in control—your way.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button className="text-lg px-6 py-3">Get Started</Button>
          {/* <Button variant="outline" className="text-lg px-6 py-3">
            Add Your First Task
          </Button> */}
        </motion.div>
      </div>

      {/* Image Content */}
      <motion.div
        className="mt-12 md:mt-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Image
          src="/images/todo-app-mockup.png" // Replace with your app screenshot
          alt="To-Do App Mockup"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl"
        />
      </motion.div>
    </section>
  );
}
