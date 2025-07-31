import { useInfiniteQuery } from "@tanstack/react-query";
import { RateLimitError } from "@/lib/errors";

const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

interface UseTopCoinsOptions {
  page?: number;
  perPage?: number;
  vsCurrency?: string;
}

const fetchCoins = async ({
  page = 1,
  perPage = 20,
  vsCurrency = "usd",
}: UseTopCoinsOptions) => {
  const params = new URLSearchParams({
    vs_currency: vsCurrency,
    order: "market_cap_desc",
    per_page: perPage.toString(),
    page: page.toString(),
    sparkline: "false",
    price_change_percentage: "24h",
  });
  const res = await fetch(`${BASE_URL}?${params}`);
  if (res.status === 429) {
    throw new RateLimitError(
      "API rate limit exceeded. Please try again later."
    );
  }
  if (!res.ok) {
    const msg = `Failed to fetch coins: ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return res.json();
};

export function useInfiniteCoins({
  perPage = 20,
  vsCurrency = "usd",
}: UseTopCoinsOptions = {}) {
  const query = useInfiniteQuery<Coin[], Error>({
    queryKey: ["topCoins", perPage, vsCurrency],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      fetchCoins({ page: pageParam as number, perPage, vsCurrency }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (lastPage.length < perPage || nextPage > 5) return undefined;
      return nextPage;
    },
    refetchInterval: 60000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof RateLimitError) return false;
      return failureCount < 2;
    },
  });
  return {
    coins: query.data?.pages.flat() ?? [],
    ...query,
    isRateLimit: query.error instanceof RateLimitError,
  };
}
