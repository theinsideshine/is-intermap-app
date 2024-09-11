import { Navigate, Route, Routes } from "react-router-dom";
//import { useSelector } from "react-redux";
import CheckPage from "../pages/maps/CheckPage";
import ViewKmlPage from "../pages/maps/ViewKmlPage";

export const UserRoutes = (kmlUrl, pointCoord) => {
    //const { isAdmin } = useSelector(state => state.auth);

    return (
        <>           
                <Routes>
                <Route path="/intercheck" element={<CheckPage />} />
                <Route path="/viewkml" element={<ViewKmlPage kmlUrl={kmlUrl} pointCoord={pointCoord} />} />

                    {/* {!isAdmin || <>                        
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                    }  */}                   
                    <Route path="/" element={<Navigate to="/intercheck" />} />
                </Routes>            
       </>
      
    )
}