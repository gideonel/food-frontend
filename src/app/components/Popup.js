"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Popup = ({ costNaira, closePopup }) => {
  const [convertedValue, setConvertedValue] = useState(costNaira);
  const [isUSD, setIsUSD] = useState(false);
  const [loading, setLoading] = useState(false);

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/NGN");
      if (isUSD) {
        // Convert back to NGN
        setConvertedValue(costNaira);
      } else {
        // Convert to USD
        setConvertedValue((costNaira * response.data.rates.USD).toFixed(2));
      }
      setIsUSD(!isUSD);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-purple-25 bg-opacity-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-lg font-bold text-gray-500">Converted Price</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-gray-500">{isUSD ? `$${convertedValue} USD` : `₦${convertedValue} NGN`}</p>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={convertCurrency}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            {isUSD ? "Convert to NGN" : "Convert to USD"}
          </button>
          <button
            onClick={closePopup}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
