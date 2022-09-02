import * as infoGetters from "./lib/InfoGetter";
import { formatURL, getLinkType, validateURL } from "./lib/utils/urlUtils";

const Rj = {
    ...infoGetters,
    formatURL,
    getLinkType,
    validateURL,
};

export { Rj };
