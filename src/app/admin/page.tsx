import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className="mx-auto max-w-screen-3xl p-4 text-center">
        <h1 className="mb-10 mt-4">Administrador</h1>
        <nav>
          <ul className="cols-1 mx-auto grid max-w-3xl gap-y-5">
            <li>
              <Link
                href={"/admin/content-manager"}
                className="block rounded-full border border-emerald-700  bg-emerald-900/40 p-4 font-medium uppercase hover:bg-emerald-900"
              >
                Administrador de contenido
              </Link>
            </li>

            <li>
              <Link
                href={"/admin/change-password"}
                className="block rounded-full border  border-emerald-700 bg-emerald-900/40 p-4 font-medium uppercase hover:bg-emerald-900"
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
