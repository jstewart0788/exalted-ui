import React from "react";
import _ from "lodash";
import { CHARM_ACTIONS } from "../shared/constants";

const CharmStateContext = React.createContext();
const CharmDispatchContext = React.createContext();

const initialState = {
  charms: { byIds: {}, allIds: [] },
  visibleCharms: [],
  allEffects: [],
  allElements: [],
  highestCost: 10,
  chosenCosts: [0, 10],
  chosenElements: [],
  chosenEffects: []
};

function charmReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case CHARM_ACTIONS.UPDATE_CHARMS: {
      const byIds = {};
      const allIds = payload.map(charm => {
        byIds[charm.id] = charm;
        return charm.id;
      });

      let allEffects = [];
      allIds.forEach(id => {
        allEffects = _.union(allEffects, byIds[id].effects);
      });
      let allElements = [];
      allIds.forEach(id => {
        allElements = _.union(allElements, byIds[id].elements);
      });
      return {
        ...state,
        charms: { byIds, allIds },
        visibleCharms: allIds,
        allEffects,
        allElements
      };
    }
    case CHARM_ACTIONS.UPDATE_CHOSEN_COSTS: {
      return { ...state, chosenCosts: payload };
    }
    case CHARM_ACTIONS.UPDATE_CHOSEN_ELEMENTS: {
      return { ...state, chosenElements: payload };
    }
    case CHARM_ACTIONS.UPDATE_CHOSEN_EFFECTS: {
      return { ...state, chosenEffects: payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CharmProvider({ children }) {
  const [state, dispatch] = React.useReducer(charmReducer, initialState);
  return (
    <CharmStateContext.Provider value={state}>
      <CharmDispatchContext.Provider value={dispatch}>
        {children}
      </CharmDispatchContext.Provider>
    </CharmStateContext.Provider>
  );
}
function useCharmState() {
  const context = React.useContext(CharmStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CharmProvider");
  }
  return context;
}
function useCharmDispatch() {
  const context = React.useContext(CharmDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CharmProvider");
  }
  return context;
}

function useCharm() {
  return [useCharmState(), useCharmDispatch()];
}

export { CharmProvider, useCharm, useCharmState, useCharmDispatch };
