import Vue from 'vue';
const myToastConstructor = Vue.extend(require('./myToast.vue'));                    // 引入模板

const instance = new myToastConstructor({
    el: document.createElement('div')
});

myToastConstructor.prototype.closeAlert = function () {
   // pageScroll.unlock();

    const el = instance.$el;
    el.parentNode && el.parentNode.removeChild(el);

    typeof this.callback == 'function' && this.callback();
};
const myToast = (options = {}) => {
    instance.mes = options.mes;
    instance.callback = options.callback;

    document.body.appendChild(instance.$el);

    //pageScroll.lock();
};

export default myToast;

// var Toast = {}; 
// Toast.install = function (Vue, options) {

//     Vue.prototype.$toast = (tips) => {

//         let toastTpl = Vue.extend({                     // 1、创建构造器，定义好提示信息的模板
//             template: '<div class="vue-toast">' + tips + '</div>'
//         });
        
//         let tpl = new toastTpl().$mount().$el;              // 2、创建实例，挂载到文档以后的地方
//         document.body.appendChild(tpl);                     // 3、把创建的实例添加到body中
//         setTimeout(function () {                            // 4、延迟2.5秒后移除该提示
//             document.body.removeChild(tpl);
//         }, 25000)
    
//     }

// }
// module.exports = Toast;