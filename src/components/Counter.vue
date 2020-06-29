<template>
    <div>
        Выполнено {{ performedTasks }} из {{ countTasks }}
    </div>
</template>

<script>
export default {
    props: ["performedTasks","countTasks"],
}
</script>