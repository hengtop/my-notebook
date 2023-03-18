import { computed } from "vue";
import { mapState, mapGetters, useStore } from "vuex";

export function useMapper(mapper, mapFn) {
  const store = useStore();
  const storeState = mapFn(mapper);
  Object.keys(storeState).forEach((fnKey) => {
    //绑定this
    const fn = storeState[fnKey].bind({$store:store});
    storeState[fnKey] = computed(fn);
  }) 
  return storeState;
}