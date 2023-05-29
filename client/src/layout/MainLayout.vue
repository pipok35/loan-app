<template>
    <navbar></navbar>
    <div class="container with-nav">
        <app-message/>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue';
    import AppMessage from '../components/AppMessage.vue';
    export default {
        components: {Navbar, AppMessage}
    }
</script>

<style lang="scss" scoped>

</style>