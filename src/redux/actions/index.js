import axios from "axios";

import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_DETAIL,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  SET_FILTER,
  SET_SORT,
  SET_ORDER,
  CLEAN_FILTER,
  CLEAN_SORT,
  CLEAN_ORDER,
  CLEAN_DETAIL,
  CLEAN_SELECTED_FILTER,
} from "../action-types";

export function getPokemons() {
  return async (dispatch) => {
    try {
      var json = await axios("https://pokemon-server-dev.fl0.io/pokemons");
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokemonByName(name) {
  return async (dispatch) => {
    try {
      var json = await axios(`https://pokemon-server-dev.fl0.io/?name=${name}`);
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokemonDetail(id) {
  return async (dispatch) => {
    try {
      var json = await axios(
        `https://pokemon-server-dev.fl0.io/pokemons/${id}`
      );
      return dispatch({
        type: GET_POKEMON_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async (dispatch) => {
    try {
      var json = await axios(`https://pokemon-server-dev.fl0.io/types`);
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://pokemon-server-dev.fl0.io/pokemons",
        payload
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePokemon(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `https://pokemon-server-dev.fl0.io/pokemons/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function setFilter(payload) {
  return {
    type: SET_FILTER,
    payload,
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function setSort(payload) {
  return {
    type: SET_SORT,
    payload,
  };
}

export function setSortOrder(payload) {
  return {
    type: SET_ORDER,
    payload,
  };
}

export function cleanFilter() {
  return {
    type: CLEAN_FILTER,
  };
}

export function cleanSelectedFilter() {
  return {
    type: CLEAN_SELECTED_FILTER,
  };
}
export function cleanSort() {
  return {
    type: CLEAN_SORT,
  };
}

export function cleanOrder() {
  return {
    type: CLEAN_ORDER,
  };
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
  };
}
