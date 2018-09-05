import {
  FETCH_REGIONS,
  FETCH_REGION,
  FETCH_REGION_RESULTS
} from "../constants/ActionTypes";
import _ from "lodash";

const initialState = {};

export default function(state = initialState, action) {
  if (action.error) action.type = "ERROR";
  switch (action.type) {
    case FETCH_REGIONS:
      return _.mapKeys(action.payload.data.regions, "id");
    case FETCH_REGION:
      return {
        ...state,
        [action.payload.data.navigation.current]: action.payload.data
      };
    case FETCH_REGION_RESULTS:
      console.log(state);
      const newRegions = JSON.parse(JSON.stringify(state));
      console.log(newRegions[action.payload.data.navigation.current]);
      if (action.payload.data && action.payload.data.navigation.current)
        newRegions[action.payload.data.navigation.current]["results"] =
          action.payload.data;
      return newRegions;
    case "ERROR":
      return { error: "Connection Error" };
    default:
      return state;
  }
}
