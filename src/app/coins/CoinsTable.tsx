"use client";

import { useInfiniteCoins } from "@/lib/useTopCoins";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { formatNumber, formatPrice } from "@/lib/formatters";
import { Loader2 } from "lucide-react";

export function CoinsTable() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const {
    coins,
    isLoading,
    isError,
    isRateLimit,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteCoins();

  useEffect(() => {
    if (!hasNextPage || isLoading || isFetching) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    const ref = loaderRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [hasNextPage, isLoading, isFetching, fetchNextPage]);

  return (
    <div>
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
            {coins.map((coin) => (
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
                  ${formatPrice(coin.current_price)}
                </td>
                <td
                  className={`px-2 py-1 text-right ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin.price_change_percentage_24h !== undefined
                    ? coin.price_change_percentage_24h.toFixed(2) + "%"
                    : "-"}
                </td>
                <td className="px-2 py-1 text-right">
                  ${formatNumber(coin.market_cap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(isLoading || isFetching) && hasNextPage && (
          <div className="p-2 flex justify-center">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        )}
        {isRateLimit && (
          <div className="text-red-600 font-semibold p-4">
            API rate limit exceeded. Please try again later.
          </div>
        )}
        {isError && !isRateLimit && (
          <div className="text-red-600 font-semibold p-4">
            Error while fetching data.
          </div>
        )}
        <div ref={loaderRef} style={{ height: 1 }} />
      </Card>
    </div>
  );
}
