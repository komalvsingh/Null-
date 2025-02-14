import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./pages/register";
import HomePage from "./pages/Home";
import Login from "./pages/login";
import Shelter_dash from "./pages/shelter_dash";
import AddItemPage from "./pages/add_iyems";
import OrphanagePostPage from "./pages/add_post";

import StoreHomePage from "./pages/store_home";
import InventoryHome from "./pages/StoreDashboard";
import InventoryHomenew from "./pages/store_viewpage";
import PowerBi from "./pages/powerbi";
import { WalletProvider } from "./context/WalletContext";
function App(){
  return (
    <WalletProvider>

    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signin/>}></Route>
       <Route path="/" element={<HomePage/>}></Route> 
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/shelter" element={<Shelter_dash/>}></Route>
      <Route path="/add_items" element={<AddItemPage/>}></Route>
      <Route path="/add_post" element={<OrphanagePostPage/>}></Route>
      <Route path="/storedashboard" element={<InventoryHome />} />
      <Route path="/storeview" element={<InventoryHomenew/>} />
      <Route path="/store_home" element={<StoreHomePage/>} />
      <Route path="/report" element={<PowerBi/>} />
      
    
    </Routes>
    </BrowserRouter>
    </WalletProvider>
  );
}
export default App;