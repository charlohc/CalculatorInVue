import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  state: () => ({
    names: []
  }),
      actions : {
    addName(name) {
      this.names.push(item,id: this.id++, completed : false))}
  }
})