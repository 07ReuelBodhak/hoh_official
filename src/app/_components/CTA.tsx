import Button from "../../components/ui/Button";
const CTA = () => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqeqNd-CmF8rYq2zN-UeC8YDrMuLXrUaDQnnpPWBHPGTesA21o72odTCu2vwmFhiGBXnRAfOzAKiXWRMidx26uVRFUD_-6A54bwNmi8Oh_JoX2iTbTJaQBmuzGbJymhlv_b6EeoC_edoCPQzdGj36Jd3CUoDTS8wT_13vzY9maftYD39f84khxK4c5AUeuXGmlHMEHYEzhml4ssBT1en0l6ts1FNWMLXshTnBXYj5zV2AAx0bAOC8OlWdUPidzKqY6rG4hJ8K2fm6d")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#230f0f]/90 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-10 py-24">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight uppercase">
              Ready to Compete?
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-normal max-w-2xl mx-auto">
              Join the server today, find your team, and start your journey to
              the top of the leaderboards.
            </p>
          </div>

          <div className="flex w-full justify-center">
            <Button
              href="https://discord.gg/g3GN62mr"
              variant="primary"
              icon={
                <span className="material-symbols-outlined ml-2">
                  arrow_forward
                </span>
              }
            >
              Join Discord Server
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
