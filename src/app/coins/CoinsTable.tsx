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
      <Card className="overflow-x-auto bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/30 shadow-xl rounded-2xl p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                #
              </th>
              <th className="px-3 py-2 text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Coin
              </th>
              <th className="px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Price
              </th>
              <th className="px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                24h %
              </th>
              <th className="px-3 py-2 text-right font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-black/5 dark:hover:bg-black/40 transition-colors duration-200 animate-fade-in"
              >
                <td className="px-3 py-2 font-semibold text-center">
                  {coin.market_cap_rank}
                </td>
                <td className="px-3 py-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full overflow-hidden shadow-md bg-white/60 dark:bg-black/60 flex items-center justify-center">
                    <Image
                      src={coin.image}
                      alt={coin.symbol}
                      width={28}
                      height={28}
                    />
                  </span>
                  <span className="font-semibold">{coin.name}</span>
                  <span className="text-xs text-muted-foreground uppercase opacity-60">
                    {coin.symbol}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <span className="bg-white/20 dark:bg-black/20 px-2 py-1 rounded-md">
                    ${formatPrice(coin.current_price)}
                  </span>
                </td>
                <td
                  className={`px-3 py-2 text-right ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h !== undefined
                    ? coin.price_change_percentage_24h.toFixed(2) + "%"
                    : "-"}
                </td>
                <td className="px-3 py-2 text-right">
                  <span className="bg-white/20 dark:bg-black/20 px-2 py-1 rounded-md">
                    ${formatNumber(coin.market_cap)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(isLoading || isFetching) && hasNextPage && (
          <div className="flex justify-center p-4">
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-full p-2 animate-fade-in">
              <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
            </div>
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
