import mapValues from "lodash/mapValues";

import breakpoints from "../config/breakpoints";

export const mediaQuery = mapValues(breakpoints, (w) => `(min-width: ${w}px)`);
