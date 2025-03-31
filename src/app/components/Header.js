"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiBell, FiMessageSquare, FiHome, FiBookOpen, FiMapPin, FiLogIn } from "react-icons/fi";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "John Doe", avatar: "/user-avatar.png" }); // Replace with actual user data from API
    }
  }, []);

  return (
    <header className="bg-purple-500 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-lg font-bold flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <FiHome className="text-xl" /> Food Inquiry
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/recipes" className="flex items-center gap-1"><FiBookOpen /> Recipes</Link>
          <Link href="/restaurants" className="flex items-center gap-1"><FiMapPin /> Restaurants</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <FiBell className="text-xl cursor-pointer" />
              <FiMessageSquare className="text-xl cursor-pointer" />
              <Link href="/user/profile" className="flex items-center gap-2">
                <Image src={user.avatar} alt="User" width={40} height={40} className="rounded-full cursor-pointer" />
                <span className="cursor-pointer">Welcome, {user.name}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-1"><FiLogIn /> Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-600 p-4 flex flex-col space-y-4 text-center">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
          <Link href="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <FiBell className="text-xl" />
              <FiMessageSquare className="text-xl" />
              <Link href="/user/profile" onClick={() => setMenuOpen(false)} className="flex flex-col items-center">
                <Image src={user.avatar} alt="User" width={40} height={40} className="rounded-full" />
                <span className="cursor-pointer">Welcome, {user.name}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


// // import Link from 'next/link';

// // const Header = () => {
// //   return (
// //     <header className="bg-purple-500 text-white p-4">
// //       <nav className="flex justify-between items-center">
// //         <div className="text-lg font-bold">
// //         <Link href="/">Food Inquiry</Link>
// //         </div>
// //         <div>
// //           <Link href="/">Home</Link>
// //           <Link href="/recipes" className="ml-4">Recipes</Link>
// //           <Link href="/restaurants" className="ml-4">Restaurants</Link>
// //           <Link href="/login" className="ml-4">Login</Link>
// //         </div>
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FiMenu, FiX, FiBell, FiMessageSquare, FiHome, FiBookOpen, FiMapPin, FiLogIn } from "react-icons/fi";
// import Image from "next/image";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ name: "John Doe", avatar: "/user-avatar.png" }); // Replace with actual user data from API
//     }
//   }, []);

//   return (
//     <header className="bg-purple-500 text-white p-4 shadow-md">
//       <nav className="flex justify-between items-center max-w-6xl mx-auto">
//         {/* Logo */}
//         <div className="text-lg font-bold flex items-center">
//           <Link href="/" className="flex items-center gap-2">
//             <FiHome className="text-xl" /> Food Inquiry
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link href="/recipes" className="flex items-center gap-1"><FiBookOpen /> Recipes</Link>
//           <Link href="/restaurants" className="flex items-center gap-1"><FiMapPin /> Restaurants</Link>
//           {user ? (
//             <div className="flex items-center gap-4">
//               <FiBell className="text-xl cursor-pointer" />
//               <FiMessageSquare className="text-xl cursor-pointer" />
//               <div className="flex items-center gap-2">
//                 <Image src={user.avatar} alt="User" width={40} height={40} className="rounded-full" />
//                 <span>Welcome, {user.name}</span>
//               </div>
//             </div>
//           ) : (
//             <Link href="/login" className="flex items-center gap-1"><FiLogIn /> Login</Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-purple-600 p-4 flex flex-col space-y-4 text-center">
//           <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link href="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
//           <Link href="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
//           {user ? (
//             <div className="flex flex-col items-center gap-2">
//               <FiBell className="text-xl" />
//               <FiMessageSquare className="text-xl" />
//               <Image src={user.avatar} alt="User" width={40} height={40} className="rounded-full" />
//               <span>Welcome, {user.name}</span>
//             </div>
//           ) : (
//             <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
//           )}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
