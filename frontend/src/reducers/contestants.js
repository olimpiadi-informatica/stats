import { FETCH_CONTESTANTS, FETCH_CONTESTANT } from "../constants/ActionTypes";
import _ from "lodash";

const initialState = {};

export default function(state = initialState, action) {
  if (action.error) action.type = "ERROR";
  switch (action.type) {
    case FETCH_CONTESTANTS:
      return _.mapKeys(action.payload.data.users, "contestant.id");
    case FETCH_CONTESTANT:
      const contestant = numMedals(action.payload.data);
      return {
        ...state,
        [action.payload.data.contestant.id]: contestant
      };
    case "ERROR":
      return { error: "Connection Error" };
    default:
      return state;
  }
}

function numMedals(contestant) {
  contestant["num_medals"] = { gold: 0, silver: 0, bronze: 0 };
  _.each(contestant.participations, participation => {
    if (participation.medal === "gold") contestant.num_medals.gold += 1;
    else if (participation.medal === "silver")
      contestant.num_medals.silver += 1;
    else if (participation.medal === "bronze")
      contestant.num_medals.bronze += 1;
  });
  return contestant;
}
