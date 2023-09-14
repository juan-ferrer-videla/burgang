import { Form } from "@/components/admin/change-password/Form";
import Link from "next/link";

const Home = async () => {
  return (
    <>
      <header className="bg-emerald-900 px-4 py-2 sticky top-0 shadow-md shadow-zinc-950 z-10">
        <nav className="max-w-screen-3xl mx-auto">
          <ul>
            <li>
              <Link href={"/admin"} className="text-xl">
                burgang administrador
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <h1 className="text-center my-10 lg:text-6xl">Cambia tu contraseña </h1>
        <Form />
      </main>
    </>
  );
};

export default Home;
