import React from "react";
import InstallPrompt from "./installPrompt";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <nav className="sticky border-b-2 border-dashed border-blue-400 bg-white">
        <div className="flex justify-between px-10 py-4">
          <div>
            <img
              src="https://dpboss777matka.site/images/logo.png"
              alt="Ks Logo"
              height="150"
              width="150"
            />
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="mr-2 h-8 w-8 text-blue-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
            </svg>
          </div>
        </div>
      </nav>
      <main>
        <section className="flex flex-col items-center gap-2 border-b-2 border-dashed border-pink-400 py-2 bg-white">
          <img
            src="https://dpboss777matka.site/images/logo.png"
            alt="Dpboss Logo"
            height="180"
            width="180"
          />
          <h2 className="text-center text-2xl font-bold text-pink-500">
            DpBoss 777 The most trusted matka gaming platform
          </h2>
          <div className="p-2 text-center font-extralight text-slate-500">
            Play Smart, Win Big! Experience the thrill of DpBoss 777 with
            real-time results and secure betting and fast withdrawals.
          </div>
          <div className="flex items-center gap-2">
            <a href="https://wa.me/+919993673521">
              <div className="flex items-center gap-2 rounded-md bg-green-500 p-2 text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
                </svg>{" "}
                Chat on Whatsapp
              </div>
            </a>
          </div>
          <div className="mt-4 flex items-center gap-6">
            <a href="/app/d3boss.apk">
              <img
                src="https://dpboss777matka.site/images/svg/google-play-button.svg"
                alt="google play button"
                height="180"
                width="160"
              />
            </a>
            <InstallPrompt />
          </div>
          <img
            src="/phone.png"
            alt="App phone mockup image"
            width="220"
            className="mt-8"
          ></img>
        </section>
        <section className="border-b-2 border-dashed border-pink-400 py-2 bg-white">
          <div className="mt-5 justify-items-center">
            <div className="inline rounded-full bg-pink-500 p-2 text-center text-xl font-semibold text-white">
              Watch How to Play
            </div>
            <iframe
              width="350"
              className="m-4"
              height="215"
              src="https://www.youtube.com/shorts/rJ-XvpRUa5s"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={false}
            ></iframe>
          </div>
        </section>
        <section className="border-b-2 border-dashed border-pink-400 py-2 bg-white">
          <div className="ml-2 mr-2 mt-4 rounded-full bg-pink-500 p-2  text-center text-xl font-semibold text-white">
            Available Games and Time-table
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              key={item}
              className="m-2 rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between rounded-t-lg bg-pink-500 px-4 py-2 text-white">
                <div className="text-xs font-medium">Open: 10:00 AM</div>
                <div className="text-xs font-medium">Close: 11:00 AM</div>
              </div>
              <div className="py-3 text-center text-lg font-semibold uppercase text-gray-800">
                DPBOSS MORNING
              </div>
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="text-xl font-semibold text-gray-700">580</div>
                <div className="flex items-center text-xl font-semibold text-pink-600">
                  <span className="px-2">-3</span>
                  <span>*</span>
                  <span className="px-2">-</span>
                </div>
                <div className="text-xl font-semibold text-gray-700">488</div>
              </div>
              <div className="flex items-center justify-center gap-4 border-t border-gray-200 py-3">
                <a
                  href=""
                  className="text-sm font-medium text-pink-600 transition-all hover:text-pink-700"
                >
                  Jodi Chart
                </a>
                <div className="h-4 w-px bg-gray-400"></div>
                <a
                  href=""
                  className="text-sm font-medium text-pink-600 transition-all hover:text-pink-700"
                >
                  Pana Chart
                </a>
              </div>
            </div>
          ))}
        </section>
        <section className="border-b-2 border-dashed border-pink-400 py-2 bg-white">
          <div className="ml-2 mr-2 mt-4 rounded-full bg-pink-500 p-2  text-center text-xl font-semibold text-white">
            Game Win Rate
          </div>
          <div className="p-4 text-center text-slate-500">
            We have best game rates for you.
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="m-2 flex items-center justify-between rounded-md border-e-4 border-pink-500 bg-gray-100 p-2 "
            >
              <div className="p-2">Single Digit</div>
              <div className="p-2 font-semibold text-pink-500">100</div>
            </div>
          ))}
        </section>
        <footer className="footer text-base-content bg-gradient-to-r from-pink-600 to-pink-400 p-5">
          <div className="text-md text-center text-white">
            Copyright @ d3boss.net 2025
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
