<template>
    <div>
        <NavMenu></NavMenu>
        <router-view/>
    </div>
</template>

<script>
    import NavMenu from "./NavMenu";

    export default {
        name: "home",
        components: { NavMenu }
    }
</script>

<style scoped>

</style>
