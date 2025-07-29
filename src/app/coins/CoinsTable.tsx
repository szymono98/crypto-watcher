"use client";
import { useTopCoins } from "@/lib/useTopCoins";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function CoinsTable({ page = 1 }: { page?: number }) {
  const { coins, isLoading, isError } = useTopCoins({ page, perPage: 20 });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Wystąpił błąd podczas pobierania danych.</div>;

  return (
    <Card className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-2 py-1 text-left">#</th>
            <th className="px-2 py-1 text-left">Coin</th>
            <th className="px-2 py-1 text-right">Price</th>
            <th className="px-2 py-1 text-right">24h %</th>
            <th className="px-2 py-1 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins?.map((coin) => (
            <tr key={coin.id} className="border-b hover:bg-muted/50">
              <td className="px-2 py-1">{coin.market_cap_rank}</td>
              <td className="px-2 py-1 flex items-center gap-2">
                <Image
                  src={coin.image}
                  alt={coin.symbol}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="font-medium">{coin.name}</span>
                <span className="text-xs text-muted-foreground uppercase">
                  {coin.symbol}
                </span>
              </td>
              <td className="px-2 py-1 text-right">
                ${coin.current_price.toLocaleString()}
              </td>
              <td
                className={`px-2 py-1 text-right ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="px-2 py-1 text-right">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
