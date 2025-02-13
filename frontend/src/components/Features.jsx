import { Utensils, Users, Truck } from "lucide-react"

const features = [
  {
    icon: <Utensils className="h-12 w-12 text-accent" />,
    title: "Donate Excess Food",
    description: "Restaurants and food service providers can easily donate their surplus food.",
    color:"text-green-500"
  },
  {
    icon: <Users className="h-12 w-12 text-accent" />,
    title: "Connect with Those in Need",
    description: "We connect food donors with local charities and individuals facing food insecurity.",
    color:"text-red-500"
  },
  {
    icon: <Truck className="h-12 w-12 text-accent" />,
    title: "Efficient Distribution",
    description: "Our network ensures quick and efficient distribution of donated food.",
    color:"text-blue-500"
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-[#e0FFCC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 font-display">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`text-center hover:scale-115 transition-all hover:bg-${feature.color.slice(5)} rounded-2xl p-5 shadow-2xl bg-stone-200 `}>
              <div className={`mb-4 flex justify-center ${feature.color}`}>{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-display">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

