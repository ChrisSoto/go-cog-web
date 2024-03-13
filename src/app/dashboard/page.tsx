import Link from "next/link";
import Modal from "../ui/components/Modal";

import { db } from "@/lib/db/db";
import { users, workingMemoryTrials } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
}

export default function Page({ searchParams }: SearchParamProps) {

  const show = searchParams?.show;

  return (
    <> 
      <div className="h-full">
        {/* <h1 className="text-2xl font-bold">Page Title</h1> */}
        <div className="flex flex-col gap-5 h-full">

          <section className="flex">
            <h1 className="text-5xl">Dashboard</h1>
          </section>

          <div className="flex flex-row gap-5 h-full">
            <div className="flex flex-col basis-1/2 gap-5">
              <section className="bg-green-200 h-1/4">Activity Chart</section>
              <section className="bg-green-400 h-3/4">Comments</section>
            </div>
            
            <section className="bg-green-600 basis-1/2">List of Experiments</section>
          </div>

        </div>
      </div>

      {/* <Link href={"dashboard/?show=true"}>
        Summon Modal
      </Link>

      { show && <Modal returnRoute={"dashboard"}/> } */}
    </>
  );
}