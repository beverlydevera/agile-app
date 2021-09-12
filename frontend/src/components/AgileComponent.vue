<template>
<div class="mt-1">
    <div class="row mb-1">
        <h2>Agile {{typeName}}</h2>
        <button class="btn btn--blue" @click="openAddModal()">Add</button>
    </div>
    <div class="card" v-show="agileList.length>0" v-for="(item,index) in agileList" :key="'agile'+index">
        <div class="card--header">
            <h3 class="card-title">{{item.title}}</h3>
        </div>
        <div class="card--body">
            <p>{{item.description}}</p>
        </div>
        <div class="card--footer">
            <div class="card--actions">
                <button type="button" class="btn btn--blue btn--sm" @click="editAgileInfo(item.id)">Edit</button>
                <button type="button" class="btn btn--red btn--sm ml-1" @click="deleteAgileRecord(item.id)">Delete</button>
            </div>
        </div>
    </div>
    <div class="card" v-show="!agileList.length>0">
        <div class="card--body">
            <h3 class="text-center">No existing data yet.</h3>
        </div>
    </div>

    <AddAgileComponent :typeCategory=typeCategory :typeName=typeName @refreshAgileList=getListItems />
    <EditAgileComponent :typeName=typeName ref="agile_edit" @refreshAgileList=getListItems />
</div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import AddAgileComponent from './AddAgileComponent.vue';
import EditAgileComponent from './EditAgileComponent.vue';

export default {
    name: "AgileComponent",
    components: {
        AddAgileComponent,
        EditAgileComponent
    },
    data: () => {
        return {
            typeCategory: 0,
            typeName: "",
            agileList: []
        }
    },
    mounted() {
        this.typeCategory = this.$route.params.type=='values' ? 1 : 2;
        this.typeName = this.$route.params.type;
        this.getListItems();
    },
    methods: {
        async getListItems() {
            try {
                axios.get("/agile/"+this.typeCategory+"/type")
                .then((response) => {
                    this.agileList = response.data;
                }).catch(error => {
                    console.log("AXIOS ERROR: " + error);
                });
            } catch (err) {
                // console.log(err);
            }
        },
        openAddModal() {
            this.$modal.show('add-agile-modal');
        },
        editAgileInfo(agile_id) {
            this.$refs.agile_edit.agile_id = agile_id;
            this.$refs.agile_edit.getAgileInfo();
        },
        deleteAgileRecord(agile_id){
            var _this = this;
            Swal.fire({
                title: 'Confirm',
                text: 'Are you sure you want to delete this record?',
                showCancelButton: true,
                confirmButtonText: `Yes`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.showLoading();
                    axios.delete('/agile/' + agile_id).then(function (response) {
                        if (response.status === 200) { 
                            Swal.close();
                            _this.getListItems();
                            _this.displayToast('success',response.data.message);
                        }
                    }).catch(error => {
                        console.log(error);
                        if (error.response.data && error.response.data.errors) {
                            _this.errors = error.response.data.errors;
                        }
                        this.displayToast('error','Server responded with error.');
                    });
                }
            })
        },
    }
}
</script>

<style lang="scss">
// 
</style>