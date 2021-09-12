<template>
<modal name="edit-agile-modal" class="modal fade show" width="60%" height="auto" id="EditAgileModal" style="display: block;" aria-modal="true" role="dialog">
    <div class="modal--body">
        <h3>Edit agile {{typeName}}</h3>
        <form @submit.prevent="submitForm" class="mt-1">
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input type="text" class="form-control" placeholder="Enter Value Title" v-model="form.title">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea class="form-control" rows="5" placeholder="Enter Value Description" v-model="form.description"></textarea>
            </div>
            <button type="submit" class="btn btn--blue">Save</button>
            <button type="button" class="btn btn--gray ml-1" @click="closeEditModal">Cancel</button>
        </form>
    </div>
</modal>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: "EditAgileComponent",
    props: {
        typeName: String
    },
    data: () => {
        return {
            form: {}
        }
    },
    methods: {
        getAgileInfo(){
            var _this = this;
            axios.get('/agile/' + this.agile_id)
            .then(function (response) {
                _this.form = response.data;
                _this.$modal.show('edit-agile-modal');
			}).catch(error => {
				if (error.response.data && error.response.data.errors) {
					this.errors = error.response.data.errors;
				}
			});
        },       
        submitForm(){
            var _this = this;
            if (this.form.title != "" &&
                this.form.description != "" ){
                Swal.fire({
                    title: 'Confirm',
                    text: 'Do you want to save the changes for the agile information?',
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.showLoading();
                        axios.put("/agile/"+this.form.id, this.form)
                        .then(response => {
                            if (response.status === 200) {
                                _this.$emit('refreshAgileList'); // refresh agile list
                                _this.closeEditModal();
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
        closeEditModal(){
            // Init Data
            this.form = {};
            // Close Modal
            this.$modal.hide("edit-agile-modal");
        }
    }
}
</script>