<template>
    <nav class="navbar">
        <h3>
            <router-link style="color: #2c3e50;" to="/">LOAN APP</router-link>
        </h3>

        <ul class="navbar-menu">
            <li>
               <router-link class="btn primary" to="/create">Создать заявку</router-link> 
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