import {useDispatch} from "react-redux"
import { useState } from "react" 
import { logout } from "../../app/authSlice"
import { toast } from "react-toastify"
import { flushPosts } from "../../app/postSlice";
import authservice from "../../appwrite/auth"
const currentTheme = localStorage.getItem("theme") ?? "light";
const toastTheme =
  currentTheme == "light" ||
  currentTheme == "cupcake" ||
  currentTheme == "aqua" ||
  currentTheme == "cyberpunk" ||
  currentTheme == "wireframe"
    ? "light"
    : "dark";
const notify = () =>
  toast.success("Logged out!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: `${toastTheme}`,
  });

const LogoutBtn=()=>{
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const handlelogout=()=>{
        setLoading(true);
        authservice.logout().then(()=>{
            notify();
            dispatch(logout())
            dispatch(flushPosts());
        }).finally(()=>setLoading(false));
    };
    return(
        <>
        <button
        onClick={handlelogout}
        className={`flex items-center justify-between px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition duration-300 ease-in-out`}
        disabled={loading}
        >
        {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
        ) : (
            <>
            <span className="mr-2">Logout</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                fill="currentColor"
                viewBox="0 0 512 512"
            >
                <path d="M 479 254 Q 480 255 480 256 Q 480 257 479 258 L 347 382 L 347 382 Q 345 384 343 384 Q 337 383 336 377 L 336 320 L 336 320 Q 335 305 320 304 L 200 304 L 200 304 Q 193 303 192 296 L 192 216 L 192 216 Q 193 209 200 208 L 320 208 L 320 208 Q 335 207 336 192 L 336 135 L 336 135 Q 337 129 343 128 Q 345 128 347 130 L 479 254 L 479 254 Z M 512 256 Q 512 241 501 231 L 369 107 L 369 107 Q 358 96 343 96 Q 326 96 315 107 Q 304 118 304 135 L 304 176 L 304 176 L 200 176 L 200 176 Q 183 176 172 188 Q 160 199 160 216 L 160 296 L 160 296 Q 160 313 172 324 Q 183 336 200 336 L 304 336 L 304 336 L 304 377 L 304 377 Q 304 394 315 405 Q 326 416 343 416 Q 358 416 369 406 L 501 281 L 501 281 Q 512 271 512 256 L 512 256 Z M 176 64 Q 191 63 192 48 Q 191 33 176 32 L 80 32 L 80 32 Q 46 33 23 55 Q 1 78 0 112 L 0 400 L 0 400 Q 1 434 23 457 Q 46 479 80 480 L 176 480 L 176 480 Q 191 479 192 464 Q 191 449 176 448 L 80 448 L 80 448 Q 60 447 46 434 Q 33 420 32 400 L 32 112 L 32 112 Q 33 92 46 78 Q 60 65 80 64 L 176 64 L 176 64 Z" />
            </svg>
            </>
        )}
        </button>

        </>
    )
}
export default LogoutBtn