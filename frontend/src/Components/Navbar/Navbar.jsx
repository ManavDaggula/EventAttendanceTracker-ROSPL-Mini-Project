import styles from "./Navbar.module.css"
function Navbar() {
  return (
    <div>
    <div>
      <svg
        // width="50"
        // height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <rect width="50" height="50" fill="white"/> */}
        <rect x="3" y="7" width="44" height="8" rx="4" fill="var(--primary)" />
        <rect x="3" y="21" width="44" height="8" rx="4" fill="var(--primary)" />
        <rect x="3" y="35" width="44" height="8" rx="4" fill="var(--primary)" />
      </svg>
    </div>
    <div className=""></div>
    </div>
  );
}

export default Navbar;
