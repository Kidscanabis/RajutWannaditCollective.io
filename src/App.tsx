// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, } from "lucide-react";


import "./index.css";


export default function App() {
  const letters = "Mengapa, Rajut sebagai buatan tangan?".split("");

  // Wave Text Animation
  useEffect(() => {
    const text = document.querySelectorAll("#wave-text span");
    text.forEach((letter, index) => {
      (letter as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  // navbar scroll effect
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const menanganiScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", menanganiScroll);
  }, [])

  // parallax effect
  const [offSetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.5);
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  const [open, setOpen] = useState(false);
  // Hlaman Next - prev

  // sajan halaman shop
  // const [page, setPage] = useState<"home" | "shop">("home");

  // Jika page = shop render halaman shop

  return (
    <section className="relative h-screen">
      <div className="bg-white text-gray-800">
        {/* Announcement Bar */}
        <div className="bg-black text-white text-sm py-2 text-center">
          Selamat Datang di WannaditCollection
        </div>

        {/* Navbar */}
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white /95 backdrop-blur shadow-md "
          : "bg-transparent py-4"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center ">
            <div className="flex items-center gap-4">
              {/* LOGO DAN HAMBURGER */}
              <img src="/img/logo.png" alt="logo" className="h-18 " />
            </div>
            {/* desktop menu */}
            <nav className="hidden md:flex gap-6 text-sm font-medium ">
              <a href="#" className="hover:text-red-600 transition-colors">Home</a>
              <a href="#" className="hover:text-red-600">About</a>
              <a href="#" className="hover:text-red-600">Blog</a>
              <a href="#" className="hover:text-red-600">Contact</a>
              <a href="#" className="hover:text-red-600">Shop</a>
            </nav>
            {/* shop all BUTTON */}
            <button className="hidden md:flex bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-500 transition">
              <Link to="/shop">SHOP ALL 🛒</Link>
            </button>

            {/* BUTTON HAMBURGER */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
          {/* mobile menu */}
          <div className={`md:hidden bg-red-600 text-white text-center overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 py-4" : "max-h-0 py-0"
            }`}>
            {open && (
              <nav className="flex flex-col gap-4 text-sm">
                <a href="#">HOME</a>
                <a href="#">ABOUT</a>
                <a href="#">BLOG</a>
                <a href="#">CONTACT</a>
                <Link to="/shop">SHOP ALL 🛒</Link>
              </nav>
            )}

          </div>
        </header >

        {/* Hero Section */}
        <section className="relative overflow-hidden" >
          <div
            className="relative  h-[900px] bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
            style={{
              backgroundImage: "url('/img/backgroundrajut.jpg')",
              transform: `translateY(${offSetY * 0.3}px)`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-bold leading-tight ">
                  Rajut Berkualitas, <em className="italic">Handmade</em> penuh rasa.
                </h1>
                <p className="mt-4 text-lg text-white/90">
                  Ini bukan sekedar produk - ini karya, ini cerita kecil dari tangan yang tak pernah menyerah.
                </p>
                <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                  BELANJA SEKARANG
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Produk */}
        <section className="py-12" >
          <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl font-bold font-mono">Dipilih sendiri</h2>
            <h2 className="text-2xl font-bold font-mono">Berkelanjutan Dan Hal-hal penting</h2>
            <p className="text-base">Temukan kebutuhan sehari - hari yang berkelanjutan tanpa perlu riset berjam-jam. kami mengutamakan produk terbaik lihat dibawahnya foto produk saya</p>
            <h2 className="text-1xl font-bold text-white bg-red-500  p-2 inline rounded-lg shadow-lg hover:bg-red-400 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">PRODUK KAMI</h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 bg-black-600">
              <div className="border border-red-200 rounded-lg p-4  hover:bg-red-400 hover:shadow-lg hover:scale-105 cursor-pointer shadow-lg">
                <img src="/img/spaatu.png" alt="sepatu rajut" className="mx-auto h-72 object-contain" />
                <h3 className="mt-4 font-semibold">Sepatu Rajut</h3>
              </div>
              <div className="border border-red-200 rounded-lg p-4 hover:bg-red-400 hover:shadow-lg hover:scale-105 cursor-pointer shadow-lg">
                <img src="/img/tas.png" alt="tas rajut" className="mx-auto h-78 object-contain" />
                <h3 className="mt-4 font-semibold">Tas Rajut</h3>
              </div>
              <div className="border border-red-200 rounded-lg p-4 hover:bg-red-400 hover:shadow-lg hover:scale-105 cursor-pointer shadow-lg">
                <img src="/img/korek.png" alt="aksesori rajut" className="mx-auto h-78 object-contain" />
                <h3 className="mt-4 font-semibold">Aksesori Rajut</h3>
              </div>
              <h2 className="col-span-full mx-auto text-center text-white text-xl font-bold mt-8 bg-red-500 p-2 rounded-lg flex items-center justify-center space-x-2 w-fit shadow-lg shadow-red-300 hover:bg-red-400 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer">
                <span>BELANJA SEKARANG</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  className="inline-block"
                >
                  <path
                    fill="currentColor"
                    d="M.719 0A1.004 1.004 0 0 0 1 2h3.469c.574 0 .757.115.906.25s.335.407.5.969l4.688 15.937a1 1 0 0 0 .03.094S11.704 22 14.5 22h7.844a1 1 0 1 0 0-2H14.5c-1.475 0-2.063-1.5-2.063-1.5l-.156-.5h8.125c1.03 0 1.496-.864 1.594-1.188l3.594-7.718C26.15 7.76 25.859 6 23.812 6h-14.5c-.166 0-.351.042-.53.094c-.36-1.223-.928-3.19-1-3.438c-.21-.713-.49-1.387-1.063-1.906S5.349 0 4.469 0H1a1 1 0 0 0-.094 0a1 1 0 0 0-.094 0A1 1 0 0 0 .72 0zm8.906 8.063h4.219v1.78h-3.656l-.47-1.5c-.032-.11-.08-.204-.093-.28m5.531 0h2.688v1.78h-2.688zm4 0h4.625a1 1 0 0 1-.062.218L23 9.844h-3.844zm-8.562 3.093h3.25v1.688h-2.719zm4.562 0h2.688v1.688h-2.688zm4 0h3.219l-.781 1.688h-2.438zm-7.625 3h2.313v1.781h-1.656c-.04 0-.062-.013-.094-.03l-.563-1.75zm3.625 0h2.688v1.781h-2.688v-1.78zm4 0H21l-.844 1.781h-1v-1.78zM14 22.187a1.812 1.812 0 1 0 0 3.625a1.812 1.812 0 0 0 0-3.625m6 0a1.812 1.812 0 1 0 0 3.625a1.812 1.812 0 0 0 0-3.625"
                  />
                </svg>
              </h2>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-10">
              <div className="grid gap-4">
                <div>
                  {/* FOTO 1 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/rajute.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 2 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src="/img/bebek.png"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 3 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/alas.jpg"
                    alt="gallery-photo"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  {/* FOTO 4 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/backgroundrajut.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 5 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/tashobo.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/*FOTO 6*/}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src="img/rajute.jpg"
                    alt="gallery-photo"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  {/* FOTO 7 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/bunga.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 8 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center "
                    src="/img/rajute.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 9 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/tashobopolos.jpg"
                    alt="gallery-photo"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  {/* FOTO 10 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/sepatuboots.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 11 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/slayer.jpg"
                    alt="gallery-photo"
                  />
                </div>
                <div>
                  {/* FOTO 11 */}
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src="/img/rajute.jpg"
                    alt="gallery-photo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div className="container mx-auto">
            <div className="p-10 card flex flex-col md:flex-row items-center gap-10 ">
              <video src="/videos/vidiorajut.mp4" className="w-auto h-[500px] ml-10 rounded-lg"
                controls></video>
              <div className="w-full  md:w-full  md:text-left ">
                <h2 className="text-1xl font-bold mb-4 lg:text-2xl" id="wave-text">
                  {letters.map((char, i) =>
                    <span key={i} className="wave-letter inline-block">
                      {char === "" ? "\u00A0" : char}
                    </span>)}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Produk rajut buatan tangan memiliki nilai unik, detail yang tidak bisa
                  ditiru mesin, dan membawa cerita dari setiap simpul benang. Tapi juga kisah tangan yang sabar
                  budaya yang hiduo, dan kepedulian terhadap lingkungan. Tidak ada dua karya yang sama - setiap
                  simpul adalah tanda tangan yang unik dari sang pengrajin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TENTANG RAJUT */}
        <section className="mx-auto ">
          <div className="container mx-auto px-4 lg:p-10 ">
            <div className="lg:h-90 grid grid-cols-1 lg:grid-cols-3  p-10 gap-15">
              <div className="max-w-md  border-red-400 border-l-4 p-4 rounded-lg shadow shadow-lg">
                {/* Baris icon + judul */}
                {/* CARD 1 */}
                <div className="flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-red-500"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"

                    >
                      <path d="m7.5 12l-2.004 2.672a2 2 0 0 0 .126 2.552l3.784 4.128c.378.413.912.648 1.473.648H15.5c2.4 0 4-2 4-4q0 0 0 0V9.429m-3 .571v-.571c0-2.286 3-2.286 3 0" />
                      <path d="M13.5 10V8.286c0-2.286 3-2.286 3 0V10m-6 0V7.5c0-2.286 3-2.286 3 0q0 0 0 0V10m-3 0V3.499A1.5 1.5 0 0 0 9 2v0a1.5 1.5 0 0 0-1.5 1.5V15" />
                    </g>
                  </svg>
                  <span className="font-bold font-mono">Penuh Makna Dan Cerita</span>
                </div>

                {/* Paragraf di bawah */}
                <p className="text-base text-gray-600 leading-relaxed mt-2">
                  Rajutan bukan sekadar teknik, tapi ekspresi dari ketekunan, kesabaran, dan rasa
                </p>
              </div>

              {/* CARD 2 */}
              <div className="max-w-md  border-red-400 border-l-4 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24" >
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-red-500"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0V12m-6-6.5v-2a1.5 1.5 0 1 1 3 0V12" /></svg></svg>
                  <span className="font-bold font-mono">Fleksibel dan Kreatif</span>
                </div>
                <p className="text-base text-gray-600 leading-relaxed mt-2">
                  Rajut bisa jadi apa saja: tas, sepatu, dompet, mukena pouch, bahkan boneka. Kreativitasmu bisa berkembang tanpa batas
                </p>
              </div>

              {/* CARD 3 */}
              <div className="border-red-400 border-l-4 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-red-500"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" /></svg></svg>
                  <span className="font-bold font-mono">Tahan lama dan ramah lingkungan</span>
                </div>
                <p className="text-base text-gray-600 leading-relaxed mt-2">Terbuat dari bahan polyester sehingga aman jika menempel pada kulit, tidak menimbulkan iritasi pada kulit</p>
              </div>
              <p className="inline-flex items-center space-x-2 mx-auto bg-red-500 text-white text-md font-mono px-3 py-2 ml-2 rounded-lg shadow cursor-pointer w-fit ">
                <span>Baca Selengkapnya</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10z"
                  />
                </svg>
              </p>
            </div>
          </div>
        </section>
        {/* AKHIR */}
        <section className="bg-gray-900 text-white-550">
          {/* Footer Content */}
          <div className="container mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Logo + Brand + Sosmed */}
            <div className="text-white">
              <div className="flex items-center space-x-3 mt-10  ">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="h-12 w-auto bg-white p-2 rounded-lg shadow-lg shadow-red-300"
                />
                <h2 className="text-lg font-bold font-mono tracking-widest text-white">
                  WANNADITCOLLECTIVE
                </h2>
              </div>

              <div className="flex space-x-4 mt-10">
                {/* Facebook */}
                <a href="#" className="hover:text-red-500 transition">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-red-500 transition">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z" />
                  </svg>
                </a>
                {/* Shop / Bag */}
                <a href="#" className="hover:text-red-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.941 17.963c.23-1.879-.98-3.077-4.175-4.097c-1.548-.528-2.277-1.22-2.26-2.171c.065-1.056 1.048-1.825 2.352-1.85a5.3 5.3 0 0 1 2.883.89c.116.072.197.06.263-.04c.09-.144.315-.493.39-.62c.051-.08.061-.186-.068-.28c-.185-.137-.704-.415-.983-.532a6.5 6.5 0 0 0-2.511-.514c-1.91.008-3.413 1.215-3.54 2.826q-.122 1.746 1.73 2.827c.263.152 1.68.716 2.244.892c1.774.552 2.695 1.542 2.478 2.697c-.197 1.047-1.299 1.724-2.818 1.744c-1.203-.046-2.287-.537-3.127-1.19l-.141-.11c-.104-.08-.218-.075-.287.03c-.05.077-.376.547-.458.67c-.077.108-.035.168.045.234c.35.293.817.613 1.134.775a6.7 6.7 0 0 0 2.829.727a4.9 4.9 0 0 0 2.075-.354c1.095-.465 1.803-1.394 1.945-2.554M12 1.401c-2.068 0-3.754 1.95-3.833 4.39h7.665C15.751 3.35 14.066 1.4 12 1.4m7.851 22.598l-.08.001l-15.784-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195l-.707-15.526a.46.46 0 0 1 .45-.494h4.975C6.845 2.568 9.16 0 12 0s5.153 2.569 5.275 5.79h4.968a.46.46 0 0 1 .458.483l-.773 15.588l-.007.131c-.094 1.094-.979 1.977-2.07 2.006" /></svg>
                </a>
              </div>
            </div>

            {/* Right: Navigation */}
            <div className="flex justify-center md:justify-end space-x-6 text-sm font-medium font-mono mr-10">
              <a href="#" className="text-white hover:text-red-500 transition duration-300">Home</a>
              <a href="#" className="text-white hover:text-red-500 transition duration-300">About</a>
              <a href="#" className="text-white hover:text-red-500 transition duration-300">Contact</a>
              <a href="#" className="text-white hover:text-red-500 transition duration-300">Blog</a>
              <a href="#" className="text-white hover:text-red-500 transition duration-300">Shop</a>

            </div>
          </div>
          <section className="w-full ">
            <div className="max-w-7xl mx-auto flex justify-end space-x-6 text-sm font-medium font-mono mr-30  p-5  overlow-visible">
              <a href="https://www.w3schools.com/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44" viewBox="0 2 24 24">
                  <path fill="green" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                    className="animate-updown  " />
                </svg>
              </a>

            </div>
          </section>
          <footer className="border-t border-white-50 mt-12 py-2 text-center text-sm text-white-100">
            © 2025 WanneditCollection
          </footer>
        </section>

        {/* Footer */}
      </div >
    </section >
  );
}

// function App() {
//   const [count, setCount] = useState(0)