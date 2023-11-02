<template>
    <div class="d-flex flex-column" :class="colorClass">
        <h4 v-if="name && !label" class="font-weight-medium mb-2">{{ name }}</h4>
        <v-text-field :type="type" :label="label ? name : null" :rules="rules" :loading="loading" :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" style="width: 100%;" />
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
            default: 'text-grey-darken-1'
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
</style>