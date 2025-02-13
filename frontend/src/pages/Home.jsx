import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Impact from "../components/Impact"
import CallToAction from "../components/CallToAction"
import Footer from "../components/Footer"


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Impact />
        <CallToAction />
      </main>
      
      <Footer />
    </>
  )
}