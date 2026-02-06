"use client";

type NavItemProps = {
  name: string;
  route: string;

  active: boolean;

  onNavigate: (route: string) => void;
};

const NavItem = ({ name, route, active, onNavigate }: NavItemProps) => {
  return (
    <button
      onClick={() => onNavigate(route)}
      className={`text-md font-medium transition-colors ${
        active ? "text-[#b20000]" : "text-[#cccccc] hover:text-[#b20000]"
      }`}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </button>
  );
};

export default NavItem;
