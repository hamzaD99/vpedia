<template>
    <div class="d-flex flex-column" :class="colorClass">
        <h4 v-if="name && !label" class="font-weight-medium mb-2">{{ name }} <span style="color: red;">{{star ? ' *' : ''}}</span></h4>
        <v-text-field  dense :type="type" :label="label ? name : null" :rules="rules" :loading="loading" :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" style="width: 100%;" :style="direction == 'ltr' ? 'direction: ltr !important;' : ''" />
    </div>
</template>

<script>

export default {
    name: 'InputField',
    props:{
        name:{
           type: String, 
        },
        label:{
           type: Boolean, 
        },
        type:{
            type: String
        },
        loading:{
            type: Boolean,
            default: false
        },
        rules: {
            type: Array,
            default: () => []
        },
        colorClass:{
            type: String,
        },
        star:{
            type: Boolean,
            default: false
        },
        direction:{
            type: String,
            default: ''
        }
    },
    data: () => ({
        modelValue: null
    }),
    methods: {
    },
}
</script>

<style scoped lang="scss">
::v-deep .v-text-field input.v-field__input {
    max-height: 40px !important;
    min-height: 40px !important;
    display: flex !important;
    align-items: center !important;
}
</style>