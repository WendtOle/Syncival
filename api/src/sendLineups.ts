import { artists as fusion2023 } from './data/fusion-artists';
import { artists as tarmac2022 } from './data/tarmac-2022';
import { artists as tomorrowland2023 } from './data/tomorrowland-2023';
import { artists as tarmac2023 } from './data/tarmac-2023';

export const sendLineups = async (req: any, res: any) => {
    res.send([fusion2023, tarmac2022, tomorrowland2023, tarmac2023]);
    return
}