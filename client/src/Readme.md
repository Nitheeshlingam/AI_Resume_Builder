Steps to build 
npm create vite@latest
React
Javascript
delete App.css
clear App.jsx
rafce -> create base template React.jsx
clear index.css
go to index.html change vite.svg with favicon.ico use public folder
packages
lucide-react react-router-dom
npm install tailwindcss @tailwindcss/vite
then do the process by visiting tailwindcss website
Use Outfit google font and add import it in the index.css at top
*{
    font-family: "Outfit", sans-serif;
} use this to apply font to all pages

 to use router
 import { BrowserRouter } from 'react-router-dom' add this in main.jsx
 replace StrictMode tag with this   
 <BrowserRouter>
    <App />
  </BrowserRouter>,

sample for import a component
import Dashboard from './pages/Dashboard';



 