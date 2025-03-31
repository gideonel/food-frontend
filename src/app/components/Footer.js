const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white p-6 mt-60 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Food Inquiry. All Rights Reserved.</p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <a href="/about" className="hover:text-purple-400">About</a>
            <a href="/contact" className="hover:text-purple-400">Contact</a>
            <a href="/privacy" className="hover:text-purple-400">Privacy Policy</a>
          </nav>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-xl hover:text-purple-400"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-xl hover:text-purple-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-xl hover:text-purple-400"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  