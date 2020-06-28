<template>
    <div class="container">
        <div class="col-sm-10">
            <h1>Задачи</h1>
            <button type="button"
                id="task-add"
                class="btn btn-success btn-sm align-left d-block"
                v-b-modal.todo-modal>
                Добавить задачу
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updateTodoForm: {
                uid: 0,
                description: "",
                is_complete: false
            }
        }
    },
    methods: {

        // getLocalStorage() {
        //     localStorage.forEach(element => {
        //         let key = element;
        //     })
        //     for (let i=0; i<localStorage.length; i++) {
        //         let key = localStorage.key(i);
        //     }
        // }
    }
}
</script>