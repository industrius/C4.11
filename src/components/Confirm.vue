<template>
    <b-alert
        show=3
        dismissible
        variant="info"
        @dismissed="dismissed">

        {{ message }}
    </b-alert>
</template>

<script>
export default {
    props: ["message","confirmationReset"],
    methods: {
        dismissed() {
            this.confirmationReset()
        }
    }
};
</script>