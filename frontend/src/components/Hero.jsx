import Button from "./Button";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
          Connecting Excess Food
          <br />
          with Hungry People
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-text-secondary">
          Join our mission to reduce food waste and feed those in need. Together, we can make a difference.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button variant="outline">
            Donate Food
          </Button>
          <Button  variant="outline">
            Find Food
          </Button >
        </div>
      </div>
    </section>
  )
}

