<template>
<modal name="add-agile-modal" class="modal fade show" width="60%" height="auto" id="AddAgileModal" style="display: block;" aria-modal="true" role="dialog">
    <div class="modal--body">
        <h3>Add agile {{typeName}}</h3>
        <form @submit.prevent="submitForm" class="form mt-1">
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input type="text" class="form-control" placeholder="Enter Value Title" v-model="form.title">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea class="form-control" rows="5" placeholder="Enter Value Description" v-model="form.description"></textarea>
            </div>
            <button type="submit" class="btn btn--blue">Save</button>
            <button type="button" class="btn btn--gray ml-1" @click="closeAddModal">Cancel</button>
        </form>
    </div>
</modal>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: "AddAgileComponent",
    props: {
        typeCategory: Number,
        typeName: String
    },
    data: () => {
        return {
            form: {
                title: "",
                description: ""
            }
        }
    },
    methods: {
        submitForm(){
            var _this = this;
            if (this.form.title != "" &&
                this.form.description != "" ){
                Swal.fire({
                    title: 'Confirm',
                    text: 'Do you want to save the new agile information?',
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.showLoading();
                        let formData = {
                            "title": this.form.title,
                            "description": this.form.description,
                            "type": this.typeCategory
                        }
                        axios.post("/agile/", formData)
                        .then(response => {
                            if (response.status === 200) { 
                                _this.$emit('refreshAgileList'); // refresh agile list
                                _this.closeAddModal();
                                Swal.close();

                                _this.displayToast('success',response.data.message);
                            }
                        })
                        .catch(error => {
                            console.log("AXIOS ERROR: " + error);
                        });
                    }
                })
            }else{
                this.displayToast('error','Please fill out the required fields.');
            }
        },
        closeAddModal(){
            // Init Data
            this.form = {
                title: "",
                description: ""
            };
            // Close Modal
            this.$modal.hide("add-agile-modal");
        }
    }
}
</script>