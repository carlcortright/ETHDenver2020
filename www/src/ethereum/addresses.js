import { config } from '../config'

export const getUSDCAddress = async (web3) => {
    return web3.eth.net.getNetworkType().then( (type) => {
        switch (type) {
            case "main":
                return config.mainnetUSDCAddress;
            case "private":
                return config.ganacheUSDCAddress;
        }
    });
}