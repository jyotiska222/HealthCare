import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from "react-router-dom"
import Navbar from "./Home_components/Navbar"
import Hero from "./Home_components/HeroSection/Hero"
import Feature from "./Home_components/Feature"
import How_it_works from "./Home_components/How_it_works"
import Our_impacts from "./Home_components/Our_impacts"
import Blog from "./Home_components/Blog"
import Footer from "./Home_components/Footer"
import About_us from "./Home_components/About_us"
import Find_Doctors from "./FindDoctors/Find_Doctors"
// import Search_Medicines from "./Home_components/Search_Medicines"
import SearchPage from "./medicine/pages/SearchPage.jsx"
import Winter from "./Blog_article_components/Winter"
import { Five } from "./Blog_article_components/Five"
import Insurance from "./Blog_article_components/Insurance"
import Mental_health from "./Blog_article_components/Mental_health"
import AuthPage from "./AuthPage/AuthPage"
import ClinicListPage from "./Clinic/ClinicListPage"
import ClinicPage from "./Clinic/ClinicPage"
import RateClinicPage from "./Clinic/RateClinicPage.jsx"
import UserProfile from "./Profile/UserProfile"
import Contact_us from "./Home_components/Contact_us"
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "./AuthPage/AuthContext";
import Edit from "./Profile/Edit"
import { useSelector ,useDispatch} from "react-redux";
// import store from "../redux/store";
// import { setUser } from "./redux/authslice"
import clinicData from "./Clinic/ClinicData"
import MedicineSalesForecasting from "./Home_components/MedicineSalesForecasting.jsx"


const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!isAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  // const navigate = useNavigate()
  // const [isAuth,setIsAuth] = useState(false)
  // const dispatch = useDispatch();
  // const { user } = useSelector((store) => store.auth);
  const { isAuth, user ,setUser,setIsAuth,bookings,setBookings,clinics,setClinics} = useContext(AuthContext)
  const token = localStorage.getItem("token")
  // if (!token) {
  //       setIsAuth(false);
  //       // navigate("/login"); // Redirect to login if no token
  //       return;

  //     }
  const client = axios.create({
    baseURL: "/api",
  })
  // const [user,setUser] = useState(null)

  const getUser = async () => {
    try {
      const headers = {
        "Authorization": token,
      };
      const response = await client.post('/api/v1/getUser', null, { headers })

      console.log(response.data)
      setUser(response.data)
      setIsAuth(true)
    } catch (error) {
      console.log("fetching error :", error)
      setIsAuth(false)
    }

  }

    const getClinics = async () => {
    try {
      const headers = {
        "Authorization": token,
      };
      const response = await client.post('/api/v1/clinics/getAllClinics', null, { headers })

      console.log(response.data)
      setClinics(response.data)
      setIsAuth(true)
    } catch (error) {
      console.log("fetching error :", error)
      setIsAuth(false)
    }

  }
   const getBookings = async () => {
    try {
      var response
      if(user){
         response = await client.post(`/api/v1/book/getBookings/${user.name}`)
      } 
       setBookings(Array.isArray(response.data.bookings) ? response.data.bookings : [])
      console.log("bookings: ",bookings)
    } catch (error) {
      console.log("fetching  bookings error :", error)
    }

  }
  
  useEffect(() => {
    getUser(); // Fetch user data
    getClinics()
    
  }, [token]); // Runs once when the component mounts

  useEffect(() => {
    if (user) {  // Ensure user is set before logging
     getBookings();
      const timeout = setTimeout(() => {
       
        console.log("User:", user);
      }, 2000); // Delay console log by 2 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [user]); // Runs every time `user` state updates
  

  

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Hero />
          <Feature />
          <How_it_works />
          <Our_impacts />
          <Blog />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          {localStorage.getItem("token") ? <UserProfile /> : <AuthPage />}
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <AuthPage />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <ProtectedRoute>
          <Navbar />
          {isAuth ? <About_us /> : <AuthPage />}
        </ProtectedRoute>
      ),
    },
    {
      path: "/contact_us",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Contact_us />
        </ProtectedRoute>
      ),
    },
    {
      path: "/med_sale_ForeCasting",
      element: (
        <ProtectedRoute>
          <Navbar />
          <MedicineSalesForecasting />
          </ProtectedRoute>
      ),
    },
    {
      path: "/userProfile",
      element: (
        <ProtectedRoute>
          <Navbar />
          <UserProfile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/find-doctors",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Find_Doctors />
        </ProtectedRoute>
      ),
    },
    {
      path: "/search-medicines",
      element: (
        <ProtectedRoute>
          <Navbar />
          <SearchPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/discover-clinics",
      element: (
        <ProtectedRoute>
          <Navbar />
          <ClinicListPage />
          </ProtectedRoute>
      ),
    },
    {
      path: "/clinic-page",
      element: (
        <ProtectedRoute>
          <Navbar />
          <ClinicPage />
        </ProtectedRoute>
      ),
    },
       {
      path: "/winter",
      element: (
        <>
          <Navbar />
          <Winter />
        </>
      ),
    },
    {
      path: "/five",
      element: (
        <>
          <Navbar />
          <Five />
        </>
      ),
    },
    {
      path: "/insurance",
      element: (
        <>
          <Navbar />
          <Insurance />
        </>
      ),
    },
    {
      path: "/mental_health",
      element: (
        <>
          <Navbar />
          <Mental_health />
        </>
      ),
    },
    
    {
      path: "/clinic/:id",
      element: (
        <>
          <Navbar />
          <ClinicPage clinic={clinics||[]}/>
        </>
      ),
    },
      {
      path: "/rate-clinic/:id",
      element: (
        <>
          <Navbar />
          <RateClinicPage clinic={clinics||[]}/>
        </>
      ),
    },
    {
      path: "/five",
      element: (
        <>
          <Navbar />
          <Five />
        </>
      ),
    },

    {
      path: "/UserProfile/Edit",
      element: (
        <>
          <Navbar />
          <Edit />
        </>
      ),
    },
    {
      path:"/medirecom",
      element:(
        <ProtectedRoute>
        <Navbar/>
        <MedicinePrediction/>
        </ProtectedRoute>
      )
    },
    {
      path:"/drrecom",
      element:(
        <ProtectedRoute>
        <Navbar/>
        <DoctorPrediction/>
        </ProtectedRoute>
      )
    },
    
    
    //Admin Panels
    //Clinic Admin Panel
    // {
    //   path: "/ClinicAdminDashboard",
    //   element: (
    //     <>
    //       <Navbar />
    //       <ClinicAdminDashboard />
    //     </>
    //   ),
    // },
  ])

  return <RouterProvider router={router} />
}