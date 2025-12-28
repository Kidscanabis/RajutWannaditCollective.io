import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Filter, Search, ChevronLeft, ChevronRight, Instagram, Facebook, MoveLeft } from "lucide-react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Shop() {
  const [open, setOpen] = useState(false);

  // sliders
  const totalHalaman = 8;
  const [halaman, setPage] = useState(2);

  const halamanUntukDitampilkan = [1, 2, 3, 4, 5, "...", totalHalaman];

  const halamanPerubahan = (halamanBaru: number) => {
    if (halamanBaru > 0 && halamanBaru <= totalHalaman) {
      setPage(halamanBaru);
    }
  };

  // BUTTON
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Masukan Email terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "subscribers"), {
        email: email,
        createAt: new Date(),
      });
      alert("Terima kasih sudah berlangganan");
      setEmail("");
    } catch (error) {
      console.error("Gagal Menyimpan email:", error);
      alert("Terjadi kesalahan, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen w-full bg-white text-black font-sans">
        <div className="bg-black text-white text-sm py-2 text-center">
          Selamat Datang di WannaditCollection
        </div>

        {/* NAVBAR */}
        <header className="bg-white text-black shadow-md fixed-top top-0 left-0 w-full z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/img/logo.png" alt="logo" className="h-14" />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
              <Link to="/" className="hover:text-red-500">Home</Link>
              <a href="#" className="hover:text-red-500">About</a>
              <a href="#" className="hover:text-red-500">Blog</a>
              <a href="#" className="hover:text-red-500">Contact</a>
              <Link to="/shop" className="hover:text-red-500">Shop</Link>
            </nav>

            {/* SHOP ALL Button */}
            <Link
              to="/shop"
              className="hidden md:flex items-center bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              🛒 SHOP ALL
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition" onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
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
        </header>

        {/* HERO SECTION */}
        <section className="text-center py-10 bg-gray-100">
          <h2 className="font-semibold text-xl text-red-500">
            Rajutan Penuh Makna <span>Belanja dengan hati</span>
          </h2>
        </section>

        {/* FILTER & SEARCH */}
        <section className="max-w-6xl mx-auto w-full px-4 py-4 flex justify-between items-center gap-4 flex-wrap">
          <button className="flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700 transition">
            <Filter size={16} />
            Filter
          </button>
          <div className="relative w-full md:w-60">
            <input type="text"
              placeholder="Pencarian..."
              className="w-full bg-white rounded-lg border-gray-300 px-10 py-2 focus:ring-2 focus:ring-red-400 placeholder-gray-500 text-black" />
            <Search size={18} className="absolute left-3 top-2.5 text-black" />
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="max-w-6xl mx-auto w-full  px-4 pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-xl h-40 animate-pulse" />
            ))}
        </section>
        {/*NEXT KE PREV*/}
        <div className="w-full flex items-center justify-center bg-[#FAF7F2] py-3">
          <div className="flex items-center gap-2 text-[#4A1F47] font-medium text-xs" id="pagination">

            {/* PREV BUTTON */}
            <button
              onClick={() => halamanPerubahan(halaman - 1)}
              disabled={halaman === 1}
              className="p-2 border rounded-md transition disabled:opacity-40 hover:bg-gray-200 flex items-center"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {halamanUntukDitampilkan.map((item, idx) => (
                <button
                  key={idx}
                  disabled={item === "..."}
                  onClick={() => typeof item === "number" && halamanPerubahan(item)}
                  className={`px-2 py-1 rounded-md text-xs ${item === halaman
                    ? "bg-[#F8E3B5] text-[#4A1F47]"
                    : "hover:text-red-700"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={() => halamanPerubahan(halaman + 1)}
              disabled={halaman === totalHalaman}
              className="p-2 border rounded-md transition disabled:opacity-40 hover:bg-gray-200 flex items-center"
            >
              <ChevronRight size={16} />
            </button>

          </div>
        </div>

        {/* Pembatas */}
        <hr className="flex border-t border-gray-300 my-10 mx-auto w-3/4" />
        <div className="w-full container mx-auto align-start mb-6">
          <h2 className="text-left text-2xl font-bold px-10 ml-20 text-sm text-red-300 font-mono">Home  <span>  / Shop</span></h2>
        </div>
        {/* TENTANG RAJUT */}
        <section className="mx-auto ">
          <div className="container mx-auto px-4 lg:p-10 ">
            <div className="lg:h-90 grid grid-cols-1 lg:grid-cols-3 p-10  gap-15">
              <div className="max-w-md border-red-400 border-l-4 p-4 rounded-lg shadow shadow-lg">
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
              <div className="border-red-400 border-l-4 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24" >
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-red-500"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0V12m-6-6.5v-2a1.5 1.5 0 1 1 3 0V12" /></svg></svg>
                  <span className="font-bold font-mono">Fleksibel dan Kreatif</span>
                </div>
                <p className="text-base  text-gray-600 leading-relaxed mt-2">
                  Rajut bisa jadi apa saja: tas, sepatu, dompet, mukena pouch, bahkan boneka. Kreativitasmu bisa berkembang tanpa batas
                </p>
              </div>

              {/* CARD 3 */}
              <div className="border-red-400 border-l-4 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-red-500"><path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" /></svg></svg>
                  <span className="font-bold font-mono">Tahan lama dan ramah lingkungan</span>
                </div>
                <p className="text-base  text-gray-600 leading-relaxed mt-2">Terbuat dari bahan polyester sehingga aman jika menempel pada kulit, tidak menimbulkan iritasi pada kulit</p>
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
        <hr className="flex border-t border-gray-100 my-10 mx-auto w-3/4" />

        {/* FOOTER PREMIUM */}
        <footer className="bg-[#FAF7F2] text-[#333] mt-20 m-2">
          {/* TENTANG WANNADITCOLLECTIVE */}
          <div className="text-center mt-20 mb-10">
            <h2 className="text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-[.25em]">
              Baca Tentang Kisah
            </h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
              WannaditCollective
            </h3>
            <div className="flex justify-center mt-2">
              <span className="w-16 h-1 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full"></span>
            </div>
          </div>

          {/* CONTENT*/}
          <div className="relative max-w-6xl mx-auto px-8 py-16 bg-gradient-to-br from-[#1a0000] via-[#330000] to-black rounded-2xl shadow-lg overflow-hidden text-white">
            <h2 className="text-lg semi-bold">Dapatakan Barangnya</h2>
            <p className="text-sm text-gray-400 mt-1 max-w-lg ">
              Pelajari tentang keberlanjutan dan cara merawat rajutan agar tetap awet.
              <br />Masukan email anda untuk mendapatkan tips, cerita dan insipirasi terbaru
            </p>

            {/* EMAIL input */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-sm relative z-10 ">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukan email anda"
                className="flex-1 bg-black/40 border border-gray-700 px-4 py-3 rounded-lg text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none w-full"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                  } text-white px-5 py-2 rounded-lg font-semibold text-sm transition`}
              >
                {loading ? "Mengirim..." : "Sign up"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1 lg:ml-1">Tidak melakukan spam</p>

            {/* DECORATION SPAM */}
            <div className="absolute right-6 top-6 flex gap-3 opacity-90 hidden md:flex justify-end z-0">
              <div className="w-20 h-28 bg-gradient-to-tr from-red-400 to-pink-500 rotate-12 rounded-xl overflow-hidden shadow-lg">
                <img src="/img/sepatuboots.jpg" alt="dekorasi 1" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="w-20 h-28 bg-gradient-to-tr from-blue-400 to-cyan-500 rotate-12 rounded-xl overflow-hidden shadow-lg"></div>
              <div className="w-24 h-40 bg-gradient-to-tr from-red-500 to-orange-400 rotate-12 rounded-xl overflow-hidden shadow-lg"></div>
            </div>
          </div>
          <hr className="flex border-t border-gray-200 my-10 mx-auto w-3/4 mt-20" />
          {/* Menu Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 px-10 py-12 text-sm mt-22">
            {/* 1 */}
            <div>
              <h3 className="font-semibold mb-3">Kategori</h3>
              <ul className="space-y-1 text-gray-700">
                <li>Cardign</li>
                <li>Dompet Rajut</li>
                <li>Tas</li>
                <li>Best Seller</li>
                <li>Souvenir</li>
              </ul>
              <div className="mt-10">
                <h3 className="font-semibold mb-3">Bahan</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Polyester</li>
                  <li>Phylon</li>
                  <li>Kulsin</li>
                  <li>Katun</li>
                  <li>Wool</li>
                  <li>Nylon</li>
                  <li>Bambu</li>
                  <li>Campuran</li>
                </ul>
              </div>
            </div>
            {/* 2 */}
            <div>
              <h3 className="font-semibold mb-3">Keberlanjutan</h3>
              <ul className="space-y-1 text-gray-700">
                <li>Pelestarian Lokal</li>
                <li>Ramah lingkungan</li>
                <li>Etika produksi</li>
              </ul>
              <div className="mt-22">
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>FAQ</li>
                  <li>Hubungi Kami</li>
                  <li>Pengiriman & Retur</li>
                  <li>Pusat Bantuan</li>
                </ul>
              </div>
            </div>
            {/* 3 */}
            <div>
              <h3 className="font-semibold mb-3">Jelajahi</h3>
              <ul className="space-y-1 text-gray-700">
                <li>Artikel</li>
                <li>Look Book</li>
                <li>Custom Order</li>
              </ul>
              <div className="lg:mt-22">
                <h3 className="font-semibold mb-3">Menu</h3>
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
            {/* 4 */}
            <div>
              <h3 className="font-semibold mb-3">Jenis Kelamin</h3>
              <ul className="space-y-1 text-gray-700">
                <li>Pria</li>
                <li>Wanita</li>
                <li>Unisex</li>
              </ul>
              <h3 className="font-semibold lg:mt-22">Sosial</h3>
              <div className="flex items-center gap-4 mt-2 text-gray-700">
                <Instagram size={20} />
                <Facebook size={20} />
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          {/* Footer Bottom */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center py-4 px-6 mt-4 rounded-b-lg ">
            <div className="px-10 justify-center py-1 lg:ml-40">
              <p className="text-sm  text-gray-500">
                Made By : Himawan - Hal - hal Lepas
              </p>
            </div>
            <div className="w-full flex justify-center items-center gap-4 py-4 px-10 rounded-b-lg ">
              <img src="/img/logo.png" alt="logo" className="h-18 lg:ml-10" />
              <p className="lg:-ml-10">WannaditCollective</p>
              <MoveLeft size={20} />
            </div>
          </div>

        </footer>

        {/* BACK BUTTON */}
        <div className="text-center pb-10">
          <Link to="/" className="text-blue-500 underline">
            kembali Ke home
          </Link>
        </div>
      </section>
    </>
  );
}
