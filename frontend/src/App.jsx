import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./pages/register";
import Store_dash from "./pages/store_dash";
import Login from "./pages/login";
import Shelter_dash from "./pages/shelter_dash";
import AddItemPage from "./pages/add_iyems";
import OrphanagePostPage from "./pages/add_post";
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signin/>}></Route>
       <Route path="/" element={<Store_dash/>}></Route> 
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/shelter" element={<Shelter_dash/>}></Route>
      <Route path="/add_items" element={<AddItemPage/>}></Route>
      <Route path="/add_post" element={<OrphanagePostPage/>}></Route>
      
    
    </Routes>
    </BrowserRouter>
  );
}
export default App;