const testimonials = [
    {
      quote: "StreamLine has revolutionized how we manage our projects. It's intuitive, powerful, and a joy to use.",
      author: "Jane Doe",
      company: "Tech Innovators Inc.",
    },
    {
      quote: "Since implementing StreamLine, our team's productivity has skyrocketed. It's a game-changer!",
      author: "John Smith",
      company: "Global Solutions Ltd.",
    },
    {
      quote: "The customer support at StreamLine is unparalleled. They're always there when we need them.",
      author: "Emily Brown",
      company: "Creative Minds Agency",
    },
  ]
  
  export default function Testimonials() {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  