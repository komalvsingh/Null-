import { Link } from "react-router-dom";
function Store_dash(){
  return (
    <>
    <div>store dashboead</div>
    <button><Link to="/add_items" style={{color: "#00d4ff"}}>Add items</Link></button>
    </>

  );
}
export default Store_dash;