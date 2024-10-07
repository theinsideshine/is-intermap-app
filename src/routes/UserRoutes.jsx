import { Navigate, Route, Routes } from "react-router-dom";
//import { useSelector } from "react-redux";
import CheckPage from "../pages/maps/CheckPage";
import ViewKmlPage from "../pages/maps/ViewKmlPage";
import { UsersPage } from "../pages/users/UsersPage";
import { InterferencePage } from "../pages/interfereces/InterferencePage";
import { useAuth } from "../auth/hooks/useAuth";
import { AboutPage } from "../pages/about/AboutPage";

export const UserRoutes = (kmlUrl, pointCoord) => {
    const { login } = useAuth();

    return (
        <>           
                <Routes>
                    
                    <Route path="/intercheck" element={<CheckPage />} />
                    <Route path="/viewkml" element={<ViewKmlPage kmlUrl={kmlUrl} pointCoord={pointCoord} />} />
                    <Route path="/viewkml/view/:id" element={<ViewKmlPage kmlUrl={kmlUrl} pointCoord={pointCoord} />} />
                    {/* Rutas para interferencias */}
                    <Route path="interferences" element={<InterferencePage />} />
                    <Route path="interferences/page/:page" element={<InterferencePage />} />
                    <Route path='/about' element={<AboutPage />} />

                    {login.isAdmin && ( // Corrige la condición para mostrar solo si no es admin
                        <>
                            <Route path="users" element={<UsersPage />} />
                            <Route path="users/page/:page" element={<UsersPage />} />
                        </>
                    )}

                    <Route path="/" element={<Navigate to="/interferences" />} />

                </Routes>            
       </>
      
    )
}