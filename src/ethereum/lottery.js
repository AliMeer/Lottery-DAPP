import web3 from './web3';
import Lottery from './build/Lottery.json';

const instance = new web3.eth.Contract(JSON.parse(Lottery.interface), '0xAc589ea7E7f0fD8Bcf5151C107F837271C4a4472');

export default instance;

/* Old Code Below

import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface), '0x91dD932D9B1c149596D25728194E3133BD79CF0A');

export default instance;


*/




