<template>
    <nav class="navbar">
        <h3>
            <router-link to="/">Credit App</router-link>
        </h3>

        <ul class="navbar-menu">
            <li>
               <router-link to="/create">Создать заявку</router-link> 
            </li>
            <li>
               <router-link to="/analytics">Аналитика</router-link> 
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>