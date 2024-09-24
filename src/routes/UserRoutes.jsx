import { Navigate, Route, Routes } from "react-router-dom";
//import { useSelector } from "react-redux";
import CheckPage from "../pages/maps/CheckPage";
import ViewKmlPage from "../pages/maps/ViewKmlPage";
import { UsersPage } from "../pages/users/UsersPage";
import { InterferencePage } from "../pages/interfereces/InterferencePage";

export const UserRoutes = (kmlUrl, pointCoord) => {
    //const { isAdmin } = useSelector(state => state.auth);

    return (
        <>           
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/page/:page" element={<UsersPage />} />
                    <Route path="/intercheck" element={<CheckPage />} />
                    <Route path="/viewkml" element={<ViewKmlPage kmlUrl={kmlUrl} pointCoord={pointCoord} />} />
                     {/* Rutas para interferencias */}
                    <Route path="interferences" element={<InterferencePage />} />
                    <Route path="interferences/page/:page" element={<InterferencePage />} />

                    {/* {!isAdmin || <>                        
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                    }  */}                   
                    <Route path="/" element={<Navigate to="/intercheck" />} />
                </Routes>            
       </>
      
    )
}