import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className="max-w-screen-3xl p-4 mx-auto text-center">
        <h1 className="mt-4 mb-10">Administrador</h1>
        <nav>
          <ul className="grid max-w-3xl mx-auto cols-1 gap-y-5">
            <li>
              <Link
                href={"/admin/content-manager"}
                className="block p-4 bg-emerald-900/40 rounded-full border border-emerald-700 hover:bg-emerald-900"
              >
                Administrador de contenido
              </Link>
            </li>

            <li>
              <Link
                href={"/admin/change-password"}
                className="block p-4 bg-emerald-900/40 rounded-full border border-emerald-700 hover:bg-emerald-900"
              >
                Cambiar contraseña
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default Home;
