const Footer = () => {
  return (
    <footer className="w-full bg-[#150909] border-t border-[#361717] py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 text-white">
          <div className="w-6 h-6 text-[#b20000]">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-bold text-lg">HELM OF HADES</span>
        </div>

        {/* Copyright */}
        <div className="text-[#999999] text-sm text-center md:text-right">
          © 2026 Helm of Hades. All rights reserved.
          <br />
          Designed for Champions.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
