import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchCoins } from "../useTopCoins";
import { RateLimitError } from "../errors";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("API Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchCoins", () => {
    it("should fetch coins with default parameters", async () => {
      const mockData = [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          current_price: 45000,
          market_cap: 850000000000,
          market_cap_rank: 1,
          total_volume: 25000000000,
          price_change_percentage_24h: 2.5,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchCoins({});

      expect(fetch).toHaveBeenCalledWith(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h%2C30d"
      );
      expect(result).toEqual(mockData);
    });

    it("should fetch coins with custom parameters", async () => {
      const mockData: [] = [];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await fetchCoins({
        page: 2,
        perPage: 50,
        vsCurrency: "eur",
      });

      expect(fetch).toHaveBeenCalledWith(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=2&sparkline=false&price_change_percentage=24h%2C30d"
      );
    });

    it("should throw RateLimitError on 429 status", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
      });

      await expect(fetchCoins({})).rejects.toThrow(RateLimitError);
    });

    it("should throw error on other HTTP errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(fetchCoins({})).rejects.toThrow(
        "Failed to fetch coins: 500 Internal Server Error"
      );
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetchCoins({})).rejects.toThrow("Network error");
    });
  });
});
