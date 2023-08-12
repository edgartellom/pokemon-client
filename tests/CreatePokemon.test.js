import * as actions from "../client/src/actions";
import * as data from "../../db.json";

import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import PokemonCreate from '../src/components/PokemonCreate/PokemonCreate'
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import isReact from "is-react";
import thunk from "redux-thunk";
import { POST_POKEMON } from "../client/src/action-types";

configure({ adapter: new Adapter() });

jest.mock("../client/src/actions", () => ({
  POST_POKEMON: POST_POKEMON,
  postPokemon: (payload) => ({
    type: POST_POKEMON,
    payload: {
      ...payload,
      id: 4
    }
  })
}))

describe("<PokemonCreate/>", () => {
  const state = { pokemons: data.pokemons };
  const mockStore = configureStore([thunk]);
  const { POST_POKEMON } = actions;

  // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
  beforeAll(() => expect(isReact.classComponent(PokemonCreate)).toBeFalsy());

  describe("Formulario de Creación de Pokemon", () => {
    let postPokemon;
    let store = mockStore(state);
    beforeEach(() => {
      postPokemon = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/pokemon"]}>
            <PokemonCreate />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debe renderizar un formulario", () => {
      expect(postPokemon.find("form").length).toBe(1);
    });

    it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
      expect(postPokemon.find("label").at(0).text()).toEqual("Name: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "name"', () => {
      expect(postPokemon.find('input[name="name"]').length).toBe(1);
    });

    it('Debe renderizar un label para los puntos de vida con el texto "HP: "', () => {
      expect(postPokemon.find("label").at(1).text()).toBe("HP: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "hp"', () => {
      expect(postPokemon.find('input[name="hp"]').length).toBe(1);
    });

    it('Debe renderizar un label para el ataque del pokemon con el texto "Attack: "', () => {
      expect(postPokemon.find("label").at(2).text()).toBe("Attack: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad name igual a "attack"', () => {
      expect(postPokemon.find('input[name="attack"]').length).toBe(1);
    });

    it('Debe renderizar in label para la defensa del pokemon con el texto "Defense: "', () => {
      expect(postPokemon.find("label").at(3).text()).toEqual("Defense: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "defense', () => {
      expect(postPokemon.find('input[name="defense"]').length).toBe(1);
    });

    it('Debe renderizar in label para la velocidad del pokemon con el texto "Speed: "', () => {
      expect(postPokemon.find("label").at(4).text()).toEqual("Speed: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "speed', () => {
      expect(postPokemon.find('input[name="speed"]').length).toBe(1);
    });
    
    it('Debe renderizar in label para la altura del pokemon con el texto "Height: "', () => {
      expect(postPokemon.find("label").at(5).text()).toEqual("Height: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "height', () => {
      expect(postPokemon.find('input[name="height"]').length).toBe(1);
    });

    it('Debe renderizar in label para el peso del pokemon con el texto "Weight: "', () => {
      expect(postPokemon.find("label").at(6).text()).toEqual("Weight: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "weight', () => {
      expect(postPokemon.find('input[name="weight"]').length).toBe(1);
    });
    
    it('Debe renderizar in label para la imagen del pokemon con el texto "Image URL: "', () => {
      expect(postPokemon.find("label").at(7).text()).toEqual("Image URL: ");
    });
    it('Debe renderizar un input de tipo text con la propiedad "name" igual a "img', () => {
      expect(postPokemon.find('input[name="img"]').length).toBe(1);
    });

    it('Debe renderizar un label para asignar el tipo del pokemon con el texto "Type: "', () => {
      expect(postPokemon.find('label').at(8).text()).toEqual('Type: ');
    });

    it('Debería renderizar un input de tipo submit y con texto "Create Pokemon"', () => {
      expect(postPokemon.find('input[type="submit"]').length).toBe(1);
      expect(postPokemon.find('input[type="submit"]').text()).toBe(
        "Create Pokemon"
      );
    });
  });

  describe("Manejo de estados locales", () => {
    let useState, useStateSpy, postPokemon;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);

      postPokemon = mount(
        <Provider store={store}>
          <PokemonCreate />
        </Provider>
      );
    });

    // Revisen bien que tipo de dato utilizamos en cada propiedad.
    xit("Deberia inicializar de forma correcta los valores del useState", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: []
      });
    });

    describe("Name input", () => {
      xit('Debe reconocer cuando hay un cambio en el valor del input "name"', () => {
        postPokemon.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Squirtle" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Squirtle",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          image: "",
          types: []
        });

        postPokemon.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Mew" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Mew",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          image: "",
          types: []
        });
      });
    });

    describe("Race input", () => {
      xit('Debe reconocer cuando hay un cambio en el valor del input "Race"', () => {
        postPokemon.find('input[name="race"]').simulate("change", {
          target: { name: "race", value: "Wookie" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "Wookie",
          role: "",
          faction: "",
          ship: {
            name: ""
          }
        });

        postPokemon.find('input[name="race"]').simulate("change", {
          target: { name: "race", value: "Ewok" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "Ewok",
          role: "",
          faction: "",
          ship: {
            name: ""
          }
        });
      });
    });

    describe("Role input", () => {
      xit('Debe reconocer cuando hay un cambio en el valor del input "role"', () => {
        postPokemon.find('input[name="role"]').simulate("change", {
          target: { name: "role", value: "Sith" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "Sith",
          faction: "",
          ship: {
            name: ""
          }
        });

        postPokemon.find('input[name="role"]').simulate("change", {
          target: { name: "role", value: "Padawan" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "Padawan",
          faction: "",
          ship: {
            name: ""
          }
        });
      });
    });

    describe("Faction input", () => {
      xit('Debe reconocer cuando hay un cambio en el valor del input "faction"', () => {
        postPokemon.find('input[name="faction"]').simulate("change", {
          target: { name: "faction", value: "The Empire" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "",
          faction: "The Empire",
          ship: {
            name: ""
          }
        });

        postPokemon.find('input[name="faction"]').simulate("change", {
          target: { name: "faction", value: "Hutt Clan" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "",
          faction: "Hutt Clan",
          ship: {
            name: ""
          }
        });
      });
    });
    describe("Ship input", () => {
      xit("Debe reconocer cuando hay un cambio en el valor del input 'ship'", () => {
        postPokemon.find('input[name="ship"]').simulate("change", {
          target: { name: "ship", value: "Y-Wing" }
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "",
          faction: "",
          ship: {
            name: "Y-Wing"
          }
        });
        postPokemon.find('input[name="ship"]').simulate("change", {
          target: { name: "ship", value: "Tie Interceptor" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          race: "",
          role: "",
          faction: "",
          ship: {
            name: "Tie Interceptor"
          }
        });
      });
    });
  });

  describe("Dispatch al store", () => {
    // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
    // import * as actions from "./../../redux/actions/index";

    let postPokemon, useState, useStateSpy;
    let store = mockStore(state);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);
      store = mockStore(state, actions.postPokemon);
      store.clearActions();
      postPokemon = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <PokemonCreate />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    xit("Debe disparar la acción createCharacter con los datos del state cuando se haga submit del form.", () => {
      const postPokemonSpy = jest.spyOn(actions, "createCharacter");
      postPokemon.find("form").simulate("submit");
      expect(store.getActions()).toEqual([
        {
          type: POST_POKEMON,
          payload: {
            name: "",
            race: "",
            role: "",
            faction: "",
            ship: {
              name: ""
            },
            id: 4,
          },
        },
      ]);
      expect(PokemonCreate.toString().includes("useDispatch")).toBe(true);
      // Para que este test funcione, recordar importar las actions como object modules!
      expect(postPokemonSpy).toHaveBeenCalled();
    });

    xit('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      postPokemon.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});