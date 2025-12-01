"use client";
import ClientListItem from "./ClientListItem";
import { ClientCategory } from "@/types/clients";

interface ClientsListProps {
  categories: ClientCategory[];
}

export default function ClientsList({ categories }: ClientsListProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
      {categories.map((category) => (
        <div key={category.id} className="break-inside-avoid mb-8">
          <h2 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">
            {category.name}
          </h2>

          <div className="flex flex-col space-y-1">
            {category.clients.map((client) => (
              <ClientListItem key={client.id} client={client} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
