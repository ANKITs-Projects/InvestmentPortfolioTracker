import React from 'react'
import { useLiveTicker } from '../../hooks/useLiveTicker'

// const getCryptoInfo = (symbol) => ({
//   BTC: {
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     decimals: 2
//   },
//   ETH: {
//     name: 'Ethereum',
//     symbol: 'ETH',
//     decimals: 2
//   }
// }[symbol] || { name: symbol, symbol, decimals: 2 })

export const CryptoCard = ({ symbol }) => {
    // const cryptoInfo = getCryptoInfo(symbol)
    const { 
      livePrice, 
      error: wsError, 
      isConnected 
    } = useLiveTicker(symbol);
    
    return (
        <div className="p-6 min-w-[250px] bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                    <h2 className="font-bold text-xl text-white">
                        {symbol}
                    </h2>
                    {/* <span className="px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-400 rounded-full">
                        {cryptoInfo.symbol}
                    </span> */}
                </div>

                {livePrice ? (
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                            ${livePrice?.toFixed(2)}
                        </p>
                        {!isConnected && (
                          <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-500 rounded">
                            Reconnecting...
                          </span>
                        )}
                    </div>
                ) : (
                    <div className="animate-pulse flex space-x-4">
                        <div className="h-6 w-24 bg-gray-800 rounded">Loding...</div>
                    </div>
                )}
            </div>

            {wsError && (
              <p className="mt-2 text-sm text-red-400">{wsError}</p>
            )}
        </div>
    )
}