import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./pages/register";
import HomePage from "./pages/Home";
import Login from "./pages/login";
import Shelter_dash from "./pages/shelter_dash";
import AddItemPage from "./pages/add_iyems";
import OrphanagePostPage from "./pages/add_post";
import RequestPage from "./pages/RequestFood_shelter";
import StoreHomePage from "./pages/store_home";
import InventoryHome from "./pages/StoreDashboard";
import InventoryHomenew from "./pages/store_viewpage";
import PowerBi from "./pages/powerbi";
import { WalletProvider } from "./context/WalletContext";
import DeliveryTrackingPage from "./pages/Delivery_track";
import TrackDelivery from "./pages/deliv_track_2";

import ExpiryNotifications from "./pages/expiry_notify";
import OrphanageRequests from "./pages/store_request";
import TrackDeliveryPage from "./pages/trackDelivery";
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
      <Route path="/request" element={<RequestPage/>}></Route>
      <Route path="/delivery-tracking" element={<DeliveryTrackingPage />} />
      <Route path="/expiry_notify" element={<ExpiryNotifications/>} />
      <Route path="/orphan_request" element={<OrphanageRequests/>} />
      <Route path="/request" element={<RequestPage/>} />
      <Route path="/track-delivery" element={<TrackDeliveryPage/>} />

      
    
    </Routes>
    </BrowserRouter>
    </WalletProvider>
  );
}
export default App;