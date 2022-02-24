<template>
    <h1>About Page</h1>
    <hr>
    <h2>{{ name }}</h2>
    <button @click="onChangeName">
        Change name
    </button>
</template>


<script>
    export default {
        data() {
            return {
                name: 'Carla'
            }
        },

        methods: {
            onChangeName() {
                console.log('Name will change to Maddie')
                this.name = 'Maddie'
            }
        },

        beforeCreate() {
            console.log('beforeCreate')
        },
        created() {
            this.name = 'Sabrina'
            console.log('beforeCreate')
            // HTTP requests
        },
        beforeMount() {
            console.log('beforeMount')
        },
        mounted() {
            console.log('mounted')
        },
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        updated() {
            console.log('updated')
        },
        activated() {
            console.log('activated')
        },
        deactivated() {
            console.log('deactivated')
        },
        beforeUnmount() {
            console.log('beforeUnmount')
        },
        unmounted() {
            console.log('unmounted')
        },
        errorCaptured() {
            console.log('errorCaptured')
        },
        renderTracked() {
            console.log('renderTracked')
        },
        renderTriggered() {
            console.log('renderTriggered')
        }
    }
</script>