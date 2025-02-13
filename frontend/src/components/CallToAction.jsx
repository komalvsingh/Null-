import Button from "./Button";

export default function CallToAction() {
  return (
    <section className="py-20 bg-accent text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 font-display">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of food donors and recipients. Together, we can reduce food waste and fight hunger.
        </p>
        <Button variant="outline"  >
          Get Started Now
        </Button >
      </div>
    </section>
  )
}

