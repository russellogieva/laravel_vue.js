<template lang="pug">
  div.w-100
    div.mrgn
      div.dt.w-80.mw6
        el-form(:model="ruleForm", :rules="rules", ref="ruleForm", label-width="100px")
          el-form-item(label="newItem", prop="newItem")
            el-input(v-model="ruleForm.newItem")
          el-form-item
            div.flt
              el-button(type="primary", @click="onSubmitted('ruleForm')") Add
              el-button(@click="resetForm('ruleForm')") Clear
    el-row
      el-col(:span="8", v-for="(o, index) in listItems", :key="o")
        el-card(:body-style="{ padding: '15px' }")
          div(style="padding: 12px;")
            div.brdr
              h2 {{ o.content }}
            el-button(type="primary", class="pdng", icon="el-icon-delete", @click="deleteItem(o.id)")

</template>

<script>

import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export default {
  name: 'MainPage',
  data () {
    return {
      listItems: [],
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
    getItems () {
      HTTP.get('/quotes')
        .then(
          response => {
            this.listItems = response.data.quotes
          }
        )
        .catch(
          error => console.log(error)
        )
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
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
              this.getItems()
              this.$refs[formName].resetFields()
            })
            .catch((err) => {
              console.log(err)
              this.$message({
                message: 'Fail',
                type: 'error'
              })
            })
        } else {
          this.$message.error('Oops, fill text field.')
          return false
        }
      })
    },
    deleteItem (id) {
      console.log(id)
      HTTP.delete('/quote/' + id)
        .then(res => {
          this.$message({
            message: 'Item was deleted.',
            type: 'success'
          })
          this.getItems()
        })
        .catch(error => console.log(error))
    }
  },
  mounted: function () {
    this.getItems()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brdr {
    border: 1px solid bisque;
    background-color: #d3f5d4;
    margin-bottom: 15px;
    text-align: center;
  }
  .flt {
    float: left;
  }
  .pdng {
    margin-top:10px;
  }
  .mrgn {
    margin-top: 10px;
  }
</style>
