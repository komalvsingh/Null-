import { Link } from "react-router-dom";

function Shelter_dash() {
  return (
    <button>
      <Link to="/add_post" style={{ color: "#00d4ff" }}>Add a post</Link>
    </button>
  );
}

export default Shelter_dash;
