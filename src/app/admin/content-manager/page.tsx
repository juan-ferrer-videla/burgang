import React, { Fragment } from "react";
import { CreateSection } from "@/components/admin/content-manager/CreateSection";
import Link from "next/link";
import { getSectionsAction } from "@/actions/content-manager";
import { Section } from "@/components/admin/content-manager/Section";

const Home = async () => {
  const sections = await getSectionsAction();
  const max =
    sections.length === 0 ? null : sections[sections.length - 1].order;

  return (
    <>
      <header className="bg-emerald-900 px-4 py-2 sticky top-0 shadow-md shadow-zinc-950 z-10">
        <nav className="max-w-screen-3xl mx-auto">
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
        <h1 className="text-center my-10 lg:text-6xl">
          Administrador de contenido
        </h1>
        <CreateSection max={max} />
        {sections.map(
          (
            { id: sectionId, title, description, products, order },
            index,
            arr
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
              />
              {arr.length - 1 !== index && <hr />}
            </Fragment>
          )
        )}
      </main>
    </>
  );
};

export default Home;
