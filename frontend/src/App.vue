<template>
  <div id="app">
    <div class="content-wrapper">
      <HeaderComponent />
      <div class="content-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>