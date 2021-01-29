import {makeObservable, observable, action, computed, reaction, autorun, toJS } from 'mobx'

const observableDefinition = {
  items: observable,
  title: observable,
  count: observable,
  shownItems: computed,
  errors: computed,
  increment: action,
  decrement: action,
  modifyList: action,
  setTitle: action
}

export class Main {
  count = 0
  title = ''
  items = ['one', 'two', 'three', 'four', 'five']


  constructor(title = '') {
    makeObservable(this, observableDefinition)
    this.title = title
  }

  get shownItems() {
    return this.items.slice(0, this.count);
  }

  get errors() {
    return {
      title: !!((this.title || '').match(/stupid/i))
    };
  }

  modifyList(item) {
    const index = this.items.indexOf(item)
    if (index === -1) this.items.push(item)
    else this.items = this.items.filter(v => v !== item)
  }

  increment() {
    if (this.count < this.items.length) this.count += 1;
  }

  decrement() {
    if (this.count > 0) this.count -= 1;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  serialize() {
    return toJS(this)
  }
}

const instance = new Main()

reaction(() => instance.count === instance.items.length, (reachedLimit) => {
  if (reachedLimit) console.log("Enough!")
})

reaction(() => instance.count === 0, (reachedFloor) => {
  if (reachedFloor) console.log("Nope!")
})

autorun(() => {
  if (instance.errors.title) console.log("Don't care bro!")
})

// autorun(() => {
//   if (instance.title) console.log("Really don't care bro!")
// })

export default instance;
