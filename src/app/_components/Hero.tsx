import Button from "../../components/ui/Button";

const Hero = () => (
  <section className="relative w-full h-screen">
    <div className="mx-auto max-w-8xl px-4 md:px-10 py-15">
      <div className="relative flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                  linear-gradient(rgba(13,13,13,0.7), rgba(35,15,15,0.9)),
                  url("https://lh3.googleusercontent.com/aida-public/AB6AXuCf5UjwQRiZrnmgGL1f2GuMRlXig9G9Maza1ektzOJKFqFlNbOz5GNQnB1jii2ITFgf_6kmjm-4oDZg7Jvu-hJlhAABeDBDIxhnBjv0WrrTNRqSTALygLK_nH_LRmcNSnxaGzsZq1JHl9pDmAxtgTq5O_jwmknTb-JxMy7nNjVcWh_KTOSXCT86USiSqs1pK7nWOAYQzGybx-p5_njvoUp7S66oUBlQSVEE1T5wElYLvr0XYjyHF_Tt7QXyDJethCPtPF_CHnG4AGw1")
                `,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4 text-center max-w-3xl">
          <div className="inline-flex status-badge items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider mb-2 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#b20000] animate-pulseSlow"></span>
            Recruiting Now
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em] uppercase drop-shadow-xl">
            Helm of Hades
          </h1>

          <h2 className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
            Dominate the arena. Join the elite Discord-based gaming community
            where champions are forged and legends are born.
          </h2>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-4">
          <Button
            href="https://discord.gg/g3GN62mr"
            variant="primary"
            icon={<span className="material-symbols-outlined">group_add</span>}
          >
            Join Discord
          </Button>

          <Button
            variant="secondary"
            href="/team"
            icon={
              <span className="material-symbols-outlined">shield_person</span>
            }
          >
            View Roster
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
