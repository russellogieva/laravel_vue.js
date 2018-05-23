<template lang="pug">
  div.w-100
    div.dt.w-80.mw6
      el-form(:model="ruleForm", :rules="rules", ref="ruleForm", label-width="100px")
        el-form-item(label="newItem", prop="newItem")
            el-input(v-model="ruleForm.newItem")
        el-form-item
          div.flt
            el-button(type="primary", @click="onSubmitted('ruleForm')") Add
            el-button(@click="resetForm('ruleForm')") Clear
</template>

<script>
import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export default {
  name: 'ListItems',
  data () {
    return {
      ruleForm: {
        newItem: ''
      },
      rules: {
        newItem: [
          {required: true, message: 'Please input Text', trigger: 'blur'},
          { min: 1, max: 10, message: 'Length should be 1 to 10', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    onSubmitted (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.newItem)
          HTTP.post('/quote', {content: this.ruleForm.newItem})
            .then((response) => {
              this.$message({
                message: 'Item added',
                type: 'success'
              })
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.error('Oops, fill text field.')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flt {
    float: left;
  }
</style>
