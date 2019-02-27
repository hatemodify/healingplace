<template></template>

<script>
export default {
    data() {
        return {
            pageSize: this.dataLength.length / 5,
        }
    },
    props: {
        dataLength: {
            type: Array,
        },
    },
}
</script>
