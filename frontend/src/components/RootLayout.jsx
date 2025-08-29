import {Outlet} from "react-router-dom"
import Header from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

function RootLayout(){
    return(
        <div className="position">
            <div>
                <Header/>
                <div style={{minHeight:'75vh'}}>
                <Outlet/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default RootLayout