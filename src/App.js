import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Gallery from './Components/About/Gallery/Gallery'
import Testimonial from './Components/About/Testimonial/Testimonial'
import Blog from './Components/Blog/Blog'
import Shop from './Components/Shop/Shop'
import Contact from './Components/Contact/Contact'
import Navbar from './Components/Navbar/Navbar';
import QuotationReq from './Components/QuoationReq/QuotationReq';
import Footer from './Components/Footer/Footer';
import GalleryPhotos from './Components/About/Gallery/GalleryPhotos/GalleryPhotos';
import Login from './Components/Users/Login/Login'
import Signup from './Components/Users/SignUp/SignUp'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import Profile from './Components/Users/Profile/Profile';
import BlogView from './Components/Blog/BlogView/BlogView';
import ProductPage from './Components/Shop/ProductPage/ProductPage';
import Cartstate from './Contexts/Cartstate';
import Checkout from './Components/Checkout/Checkout';
import Videos from './Components/Videos/Videos';
import SingleVideo from './Components/Videos/Single/SingleVideo';
function App() {
  return (
    <div>
      <Cartstate>
      <Navbar/>
      <Routes>
        <Route exact path="/"  element={<Home/>}/>
        <Route exact path="/about"  element={<About/>}/>
        <Route exact path="/gallery"  element={<Gallery/>}/>
        <Route exact path="/testimonial"  element={<Testimonial/>}/>
        <Route exact path="/blog"  element={<Blog/>}/>
        <Route exact path="/shop"  element={<Shop/>}/>
        <Route exact path="/contact"  element={<Contact/>}/>
        <Route exact path='/periodic-checks' element={<QuotationReq/>} />
        <Route exact path='/gallery/album/:id' element={<GalleryPhotos/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/blogs/:id' element={<BlogView/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
        <Route exact path='/shop/product/:id' element={<ProductPage/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/checkout' element={<Checkout/>}/>
        <Route exact path='/videos' element={<Videos/>}/>
        <Route exact path='/videos/:id' element={<SingleVideo/>}/>
        <Route exact path='/privacy-policy' element={<PrivacyPolicy/>}/>
      </Routes>
      <Footer/>
      </Cartstate>
    </div>
  );
}

export default App;
