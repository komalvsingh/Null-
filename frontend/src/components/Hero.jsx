import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-secondary">
      <div className="container  text-center ">
        {/* Video Background */}
        <div className="w-full absolute -z-10 -top-40 rounded-lg shadow-lg">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source 
              src="https://wastenofood.org/wp-content/uploads/2021/05/WasteNoFood.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Heading */}
        <div className="flex w-max flex-col items-start mx-10">

        <h1 className="mt-8 text-4xl  md:text-5xl font-bold font-display text-start leading-tight text-[#e0FFCC] " >
          Connecting Excess Food
          <br />
          with Hungry People
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mt-4 mb-8 max-w-2xl text-start mx-auto text-[#F9F6EE] " >

          Join our mission to reduce food waste and feed those in need. <br></br>
          Together, we can make a difference.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col w-full -ml-10 md:flex-row justify-center gap-4">
          <Button 
            onClick={() => {}}
            className="bg-[#52B2CF] hover:bg-[#355761] transition-all duration-300 text-white font-bold px-6 py-3 rounded-lg shadow-md cursor-pointer"
            aria-label="Donate Food"
            >
            Donate Food
          </Button>
          <Button 
            className="bg-[#255d49] hover:bg-[#1b2e27] transition-all duration-300 text-white font-bold px-6 py-3 rounded-lg shadow-md cursor-pointer"
            aria-label="Find Food"
            >
            Find Food
          </Button>
              </div>
        </div>
      </div>

      {/* Wavy Bottom Background */}
      <div className="absolute -bottom-11 w-full">
  <svg className="w-full h-40 " viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path 
      fill="#e0FFCC"
      d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,202.7C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    ></path>
  </svg>
</div>


    </section>
  );
}
