<template>
    <div class="container">
        <div class="col-sm-10">
            <h1>Задачи</h1>
            <div class="row">
                <div class="col col-sm-2">
                    <button type="button"
                        id="task-add"
                        class="btn btn-success btn-sm align-left d-block"
                        v-b-modal.task-modal
                        @click="modalReset()">
                        Добавить задачу
                    </button>
                </div>
                <div class="col col-sm-10">
                    <confirmation
                        v-if="confirmationShow" 
                        v-bind:message="confirmationMessage"
                        v-bind:confirmationReset="confirmationReset">
                    </confirmation>
                </div>
            </div>

            <b-modal ref="addTodoModal"
                id="task-modal"
                v-bind:title="modal_props.title"
                hide-footer>
                <b-form @submit="modalSubmit()" @reset="modalReset()" class="w-100">
                    <b-form-group id="form-description-group"
                        label="Описание:"
                        label-for="form-description-input">
                        <b-form-input id="form-description-input"
                            type="text"
                            v-model="task.description"
                            required
                            placeholder="Описание задачи">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="form-complete-group">
                        <b-form-checkbox-group v-model="task.is_complete" id="form-checks">
                            <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-button type="submit" variant="primary"> {{ modal_props.submit_btn_text }} </b-button>
                    <b-button type="reset" variant="danger">Отмена</b-button>
                </b-form>
            </b-modal>

            <table class="table table-dark table-stripped table-hover">
                <thead class="thead-light">
                    <tr>
                        <th>Uid</th>
                        <th>Описание</th>
                        <th>Выполнена?</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" v-bind:key="index">
                        <td>{{ index + 1 }}</td>
                        <td class="task-description">{{ task.description }}</td>
                        <td>
                            <span v-if="task.is_complete">Выполнено</span>
                            <span v-else>Не выполнено</span>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button"
                                    class="btn btn-secondary btn-sm"
                                    v-b-modal.task-modal
                                    @click="modalUpdate(task, index)">
                                    Изменить
                                </button>
                                &nbsp;
                                <button type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteTask(index)">
                                    X
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<style>
button#task-add {
    line-height: 1.4;
    margin-bottom: 20px;
}
.task-description {
    text-align: left;
}
</style>

<script>
import confirmation from "./Confirm.vue"
export default {
    components: {
        confirmation
    },
    data() {
        return {
            task: {
                index: 0,
                description: "",
                is_complete: []
            },
            modal_props: {
                title: "Добавить задачу",
                submit_btn_text: "Добавить"
            }, 
            tasks: [],
            confirmationMessage: "",
            confirmationShow: false
        }
    },
    methods: {
        getTasks() {
            this.tasks = JSON.parse(localStorage.getItem("tasks"))
            if (this.tasks) {
                this.confirmationMessage = "Задачи обновлены"
            }
            this.confirmationShow = true
        },
        modalSubmit() {
            event.preventDefault()
            this.$refs.addTodoModal.hide()
            const reqestData = {
                description: this.task.description,
                is_complete: this.task.is_complete.length > 0
            }
            if (this.modal_props.title == "Изменить задачу") {
                this.tasks[this.task.index] = reqestData
                this.confirmationMessage = "Задача обновлена"
            }else{
                if (this.tasks) {
                    this.tasks.push(reqestData)
                }else{
                    this.tasks = [reqestData]
                }
                this.confirmationMessage = "Задача добавлена"
            }
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
            this.confirmationShow = true
        },
        modalReset() {
            event.preventDefault()
            this.$refs.addTodoModal.hide()
            this.task.description = ""
            this.task.is_complete = []
        },
        modalUpdate(task, index) {
            this.modal_props.title = "Изменить задачу"
            this.modal_props.submit_btn_text = "Обновить"
            this.task.index = index
            this.task.description = task.description
            if (task.is_complete) {
                this.task.is_complete = [true]
            }
        },
        deleteTask(index) {
            this.tasks = this.tasks.filter((item, i) => {
                return i != index
            })
            localStorage.setItem("tasks", JSON.stringify(this.tasks))
            this.confirmationMessage = "Задача удалена"
            this.confirmationShow = true
        },
        confirmationReset() {
            this.confirmationShow = false
        }
    },
    created() {
        this.getTasks()
    }
}
</script>