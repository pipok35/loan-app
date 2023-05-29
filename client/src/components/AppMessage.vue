<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{title}}</p>
    <p>{{message.value}}</p>
    <span class="alert-close">&times;</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const titles = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
    }

    const message = computed(() => store.state.message)
    const title = computed(() =>
      message.value ? titles[message.value.type] : null
    )

    return {
      message,
      title,
      close: () => store.commit('clearMessage'),
    }
  },
}
</script>

<style lang="scss" scoped></style>
