import React, { Fragment } from "react";
import { CreateSection } from "@/components/admin/content-manager/CreateSection";
import Link from "next/link";
import { getSectionsAction } from "@/actions/content-manager";
import { Section } from "@/components/admin/content-manager/Section";
import { getPhonesAction } from "@/actions/phones";
import { CreatePhone } from "@/components/admin/content-manager/CreatePhone";
import { Phone } from "@/components/admin/content-manager/Phone";

const Home = async () => {
  const [sections, phones] = await Promise.all([
    getSectionsAction(),
    getPhonesAction(),
  ]);
  const max =
    sections.length === 0 ? null : sections[sections.length - 1].order;

  return (
    <>
      <header className="sticky top-0 z-10 bg-emerald-900 px-4 py-2 shadow-md shadow-zinc-950">
        <nav className="mx-auto max-w-screen-3xl">
          <ul className="flex gap-x-4">
            <li>
              <Link href={"/admin"} className="text-xl">
                Admin
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-xl">
                Carta
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <h1 className="my-10 text-center lg:text-6xl">
          Administrador de contenido
        </h1>
        <section>
          <h2 className="mb-4 text-center sm:mb-6 md:mb-8">Telefonos</h2>
          <CreatePhone />
          <div className="mb-4 overflow-auto sm:mb-6 md:mb-8">
            {phones.length > 0 ? (
              <table className="mx-auto">
                <thead className="bg-emerald-950">
                  <tr>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {phones.map((phone) => (
                    <Phone key={phone.id} {...phone} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tienes telefonos añadidos</p>
            )}
          </div>
        </section>
        <hr />
        <h2 className="mb-4 text-center sm:mb-6 md:mb-8">
          Secciones de la carta
        </h2>
        <CreateSection max={max} />
        {sections.map(
          (
            { id: sectionId, title, description, products, order, extras },
            index,
            arr,
          ) => (
            <Fragment key={sectionId}>
              <Section
                sectionId={sectionId}
                title={title}
                description={description}
                products={products}
                order={order}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
                sections={sections}
                index={index}
                extras={extras}
              />
              {arr.length - 1 !== index && <hr />}
            </Fragment>
          ),
        )}
      </main>
    </>
  );
};

export default Home;
