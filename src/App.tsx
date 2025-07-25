import { Routes, Route } from 'react-router-dom';

// Make sure 'globals.css' exists in the 'src' folder, or update the path below if it's located elsewhere.
import './globals.css'; 
import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"
const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            {/*Public Routes*/}
            <Route element={<AuthLayout/>}>
                <Route path="/sign-in" element ={<SigninForm/>}/>
                <Route path="/sign-up" element ={<SignupForm/>}/>
            </Route>
            
            {/*Private Routes*/}
            <Route element={<RootLayout/>}>
                <Route index element={<Home />} />
            </Route>
            
        </Routes>
        <Toaster />
    </main>
  )
};

export default App;