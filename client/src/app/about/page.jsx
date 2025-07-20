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
          Welcome to Fursure
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Upload an image and let our smart classifier tell you whether it's a
          cat or a dog — powered by machine learning, trained with love and fur.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-4"
          onClick={() => router.push("/")}
        >
          Upload an Image
        </Button>
      </section>

      <Separator />

      {/* What We Do Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What We Do</h2>
        <p className="text-muted-foreground leading-relaxed">
          Snap it. Upload it. Let the model decide. <br />
          Trained on thousands of floofy friends, FurSure helps you settle the
          age-old battle — who's that good boy (or girl)?
        </p>
        <p className="text-muted-foreground leading-relaxed">
          FurSure is a lightweight and intelligent web app that distinguishes
          cats from dogs using deep learning. With just one image, it accurately
          classifies the animal using a convolutional neural network (CNN)
          model.
        </p>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">How It Works </h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>You upload an image (JPEG or PNG)</li>
          <li>The image is preprocessed and sent to the server</li>
          <li>The FastAPI backend loads the model and runs inference</li>
          <li>The result — cat or dog — is sent back with confidence</li>
          <li>You see the prediction + the uploaded image preview</li>
        </ol>
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
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          Hi, I'm <strong> Devansh Tyagi </strong>, the brain behind Fursure —
          the app that finally ends the age-old debate: "Is that a cat or a
          dog?" Built with machine learning and too many cups of coffee, Fursure
          is here to judge your furry photos faster than your nani spots a
          rishta. You're welcome, internet.
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
              href="mailto:johndoe@example.com"
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
          Have questions or feedback? Reach out at{" "}
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
