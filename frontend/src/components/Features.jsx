import { Utensils, Users, Truck } from "lucide-react"

const features = [
  {
    icon: <Utensils className="h-12 w-12 text-accent" />,
    title: "Donate Excess Food",
    description: "Restaurants and food service providers can easily donate their surplus food.",
  },
  {
    icon: <Users className="h-12 w-12 text-accent" />,
    title: "Connect with Those in Need",
    description: "We connect food donors with local charities and individuals facing food insecurity.",
  },
  {
    icon: <Truck className="h-12 w-12 text-accent" />,
    title: "Efficient Distribution",
    description: "Our network ensures quick and efficient distribution of donated food.",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-display">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

