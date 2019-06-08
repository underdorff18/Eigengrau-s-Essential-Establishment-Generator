import { createBuilding } from "../../Buildings/createBuilding"
import { defineRollDataGetter } from "../../Tools/defineRollDataGetter"
import { createNPC } from "../../NPCGeneration/SetupNPC"

export function createGeneralStore (town, opts = {}) {
  const GeneralStore = (opts.newBuilding || createBuilding)(town, `GeneralStore`)
  console.groupCollapsed(`General Store loading...`)
  GeneralStore.shopkeep = (opts[`newShopkeep`] || createNPC)(town, {
    profession: `merchant`,
    mundane: [`pliers`, `tins`, `twine`, `cups`, `spoons`, `pans`, `chairs`, `cushions`],
    greeting: [`nods at you`, `welcomes you warmly`, `smiles and greets you`, `raises a hand with a wave`, `checks you out for just a moment before smiling at you`],
    owner: [`owner`, `caretaker`, `proud owner`, `proprietor`, `current owner`, `manager`, `assistant manager`, `acting manager`].seededrandom()
  })
  Object.assign(GeneralStore, {
    note: setup.GeneralStore.get.note(GeneralStore),
    wordNoun: [`general store`, `shop`].seededrandom(),
    crud: setup.GeneralStore.crud,
    notableFeature: `wide range of goods on sale`,
    passageName: `GeneralStoreOutput`,
    initPassage: `InitGeneralStore`,
    buildingType: `GeneralStore`
  })

  setup.createGeneralStoreName(town, GeneralStore)
  GeneralStore.wealth = ``
  GeneralStore.size = ``
  GeneralStore.cleanliness = ``
  GeneralStore.expertise = ``
  setup.GeneralStoreModifiers(town, GeneralStore)

  const rollDataVariables = [`wealth`, `size`, `cleanliness`, `expertise`]
  rollDataVariables.forEach(function (propName) {
    defineRollDataGetter(GeneralStore, setup.GeneralStore.rollData, propName)
  })
  // setup.GeneralStoreRenders(GeneralStore)
  console.log(GeneralStore)
  // setup.townBinder(town, GeneralStore, 'GeneralStore')
  console.groupEnd()
  return GeneralStore
}
