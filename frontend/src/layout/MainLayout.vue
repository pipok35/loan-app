<template>
    <navbar></navbar>
    <div class="container with-nav">
        <router-view/>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue';
    export default {
        components: {Navbar}
    }
</script>

<style lang="scss" scoped>

</style>