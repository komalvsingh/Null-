export default function Impact() {
    return (
      <section className="py-20 bg-[#e0FFCC]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-display">Current Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-stone-200 shadow-2xl rounded-xl p-5 hover:scale-115 transition-all">
              <p className="text-5xl font-bold text-accent mb-2">1M+</p>
              <p className="text-xl text-text-secondary">Meals Donated</p>
            </div>
            <div className="text-center bg-stone-200 shadow-2xl rounded-xl p-5 hover:scale-115 transition-all">
              <p className="text-5xl font-bold text-accent mb-2">500+</p>
              <p className="text-xl text-text-secondary">Partner Organizations</p>
            </div>
            <div className="text-center bg-stone-200 shadow-2xl rounded-xl p-5 hover:scale-115 transition-all">
              <p className="text-5xl font-bold text-accent mb-2">50K+</p>
              <p className="text-xl text-text-secondary">People Fed</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  