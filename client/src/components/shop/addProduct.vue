<template>
  <section>
    <h3 class="tit_page"></h3>
    <div class="cf">
      <b-field class="fl">
        <b-input v-model="productData.title" placeholder="제목"></b-input>
      </b-field>    
    <b-switch is-large v-model="productData.reservation" true-value="가능" false-value="불가능" class="fl">{{ productData.reservation }}
    </b-switch>
    </div>
    <div class="cf">
      <b-field class="fl">
        <b-input v-model="productData.priceData.name" placeholder="상품명"></b-input>
      </b-field>
      <b-field class="fl">
        <b-input v-model="productData.priceData.price" placeholder="가격"></b-input>
      </b-field>      
    </div>
    <button class="btn_add" ref="btn_add">+++++</button>
    <!-- <b-field>
      <b-upload v-model="dropFiles"
          multiple
          drag-drop>
        <section class="section">
            <div class="content has-text-centered">
                <p>
                  <b-icon
                      icon="upload"
                      size="is-large">
                  </b-icon>
                </p>
                <p>썸네일 이미지 등록</p>
          </div>
        </section>
      </b-upload>
    </b-field> -->
        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>
        
        <my-component></my-component>
  </section>  
</template>
<script>
var aaa = {
  template: `<div class="cf">
      <b-field class="fl">
        <b-input v-model="productData.priceData.name" placeholder="상품명"></b-input>
      </b-field>
      <b-field class="fl">
        <b-input v-model="productData.priceData.price" placeholder="가격"></b-input>
      </b-field>      
    </div>`
};

export default {
  data() {
    var Child = {
      template: '<div>사용자 정의 컴포넌트 입니다!</div>'
    };

    return {
      productData: {
        shopId: localStorage.shopId,
        title: '',
        reservation: '불가능',
        priceData: {}
      },
      components: {
        // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
        'my-component': Child
      },
      dropFiles: []
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
};
</script>