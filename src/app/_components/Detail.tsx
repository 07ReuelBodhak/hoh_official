import Button from "../../components/ui/Button";

const Detail = () => {
  return (
    <section className="w-full py-12 md:py-24 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-8xl px-4 md:px-10 flex flex-col gap-12 relative z-10">
        {/* Heading + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm">
              Why Choose Us
            </h2>
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
              FORGED IN FIRE. <br /> BUILT FOR VICTORY.
            </h1>
            <p className="text-gray-400 text-lg font-normal leading-relaxed max-w-xl">
              Experience competitive gaming at the highest level with a
              dedicated community that pushes you to your limits.
            </p>
          </div>

          <Button href="https://discord.gg/g3GN62mr" variant="secondary">
            Learn More
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card flex flex-col gap-3 group hover:border-red-500 transition-colors">
            <div className="w-13 h-13 rounded-lg bg-red-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined text-[28px]">
                emoji_events
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-xl font-bold leading-tight">
                Elite Tournaments
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Participate in high-stakes monthly tournaments with verified
                prize pools and live casting.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card flex flex-col gap-3 group hover:border-red-500 transition-colors">
            <div className="w-13 h-13 rounded-lg bg-red-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined text-[28px]">
                groups
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-xl font-bold leading-tight">
                Active Community
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect with thousands of like-minded gamers in our active,
                moderated Discord server.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card flex flex-col gap-3 group hover:border-red-500 transition-colors">
            <div className="w-13 h-13 rounded-lg bg-red-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <span className="material-symbols-outlined text-[28px]">
                school
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-xl font-bold leading-tight">
                Pro Coaching
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get direct feedback and coaching sessions from top-tier players
                to elevate your skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
