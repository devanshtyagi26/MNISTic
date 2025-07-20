"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Welcome to MNISTic
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Draw a digit, and our deep learning model will tell you what number it
          is — trained on thousands of handwritten digits using the MNIST
          dataset.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-4"
          onClick={() => router.push("/")}
        >
          Try the Digit Classifier
        </Button>
      </section>

      <Separator />

      {/* What We Do Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What We Do</h2>
        <p className="text-muted-foreground leading-relaxed">
          MNISTic is a simple, interactive digit recognition app powered by a
          neural network trained on the classic MNIST dataset.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          It's an educational tool built to demonstrate the power of deep
          learning in understanding human handwriting. Whether you're a student,
          a teacher, or just curious — try drawing a digit and watch AI make a
          prediction in real-time.
        </p>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>You draw a digit (0–9) on the canvas</li>
          <li>The image is downscaled to 28×28 pixels (just like MNIST)</li>
          <li>The processed data is sent to a FastAPI backend</li>
          <li>The backend loads a trained model and performs inference</li>
          <li>
            The predicted digit and confidence score are returned instantly
          </li>
        </ol>
      </section>
      <Separator />

      {/* Limitations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Limitations</h2>
        <p className="text-muted-foreground leading-relaxed">
          While MNISTic works well for most clear handwritten digits, it's not
          perfect. The model may struggle with digits that are messy, ambiguous,
          or very <strong> different from the MNIST training dataset. </strong>{" "}
          Think of it more as a fun and educational tool, not a handwriting
          judge.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Try different writing styles — it's a great way to learn how machine
          learning interprets visual input.
        </p>
      </section>

      <Separator />

      {/* Creator Section */}
      <section className="space-y-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold">Meet the Creator</h2>
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage
            src="https://media.licdn.com/dms/image/v2/D5603AQFzurmeOEjQEA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1733141188155?e=2147483647&v=beta&t=VkayHsyNA50kx-Xpmq8lnYAS_3eoZ4K9WEZLl53PrWs"
            alt="Creator's Avatar"
          />
          <AvatarFallback>DT</AvatarFallback>
        </Avatar>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          I'm <strong>Devansh Tyagi</strong>, a developer passionate about
          making machine learning approachable and interactive. MNISTic was
          created to bring AI to your fingertips — literally.
        </p>
        <div className="flex space-x-4">
          <Button asChild variant="outline" size="sm">
            <a
              href="https://github.com/devanshtyagi26"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href="https://www.linkedin.com/in/tyagi-devansh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href="mailto:tyagidevansh3@gmail.com"
              className="flex items-center space-x-2"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p className="text-muted-foreground mb-4">
          Have questions, ideas, or feedback? Email me at{" "}
          <a
            href="mailto:tyagidevansh3@gmail.com"
            className="text-blue-600 underline"
          >
            tyagidevansh3@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
